import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as FormData from 'form-data';
import * as axios from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GenerateQuestionService } from './generate-question.service';

@Controller('converter')
export class ConverterController {
  constructor(
    private readonly httpService: HttpService,
    private readonly generateQuestionService: GenerateQuestionService,
  ) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // TODO: change to env
          const directoryPath = '../factory/input';
          const files = fs.readdirSync(directoryPath);
          let directories = files.filter((file) => {
            return fs.statSync(`${directoryPath}/${file}`).isDirectory();
          });
          directories = directories.filter((dir) => {
            return !isNaN(dir as any);
          });

          const maxOrder = Math.max(
            ...directories.map((directory) => {
              return parseInt(directory);
            }),
          );
          const orderId = isNaN(maxOrder) ? 1 : maxOrder + 1;

          // create new folder
          const newDirectoryPath = `${directoryPath}/${orderId}`;
          fs.mkdirSync(newDirectoryPath);
          cb(null, newDirectoryPath);
        },
        filename: (req, file, cb) => {
          const filename: string = file.originalname;
          const extension: string = filename.split('.').pop();
          const randomName = uuidv4();
          cb(null, `${randomName}.${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const fileExtension = file.originalname
      .split('.')
      .pop()
      ?.toLocaleLowerCase();
    console.log(fileExtension);

    const filePath = file.path;
    const outputDir = file.destination.replace('input', 'output');

    // Save input to order folder
    let imagePath = filePath;
    // replace character \ to /
    imagePath = imagePath.replace(/\\/g, '/');

    // if not image, convert to image
    if (!['jpg', 'png', 'jpeg'].includes(fileExtension)) {
      const allowedExtensions = [
        'doc',
        'docx',
        'pdf',
        'ppt',
        'pptx',
        'xls',
        'xlsx',
      ];
      if (!allowedExtensions.includes(fileExtension)) {
        throw new BadRequestException(`Extension ${fileExtension} not allow`);
      }

      fs.mkdirSync(outputDir);

      const outputImageName = file.filename.replace(fileExtension, 'jpg');

      imagePath = `${outputDir}/${outputImageName}`;
      const { isSuccess } = await this.convertToImage(filePath, imagePath);

      if (!isSuccess) {
        throw new BadRequestException(`Convert file failed`);
      }
    }

    // extract text from image
    const imageName = imagePath.split('/').pop();
    const outputExtractPath = imagePath.replace(
      imageName,
      `result_${imageName}`,
    );

    // TODO: save image to google drive

    const extraction = await this.extractTextFromImage(
      imagePath,
      outputExtractPath,
    );
    return this.generateQuestionService.generate(extraction);
  }

  private async extractTextFromImage(imagePath: string, outputPath: string) {
    const formData = new FormData();
    formData.append('image_path', imagePath);
    formData.append('output_path', outputPath);

    const BASE_URL_SERVICE_EXTRACT = 'http://localhost:4000/extract';

    const { data } = await firstValueFrom(
      this.httpService
        .post(BASE_URL_SERVICE_EXTRACT, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        })
        .pipe(
          catchError((error: axios.AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  private async convertToImage(
    inputPath: string,
    outputPath: string,
  ): Promise<{
    isSuccess: boolean;
  }> {
    console.log(`start convertToImage ${inputPath} to ${outputPath}`);
    const BASE_URL_SERVICE_CONVERT = 'http://192.168.1.8:100/unoconv/jpg';

    const file = fs.readFileSync(inputPath) as any;
    const filename = inputPath.split('/').pop();

    const bodyFormData = new FormData();
    bodyFormData.append('file', file, filename);

    const { data } = await firstValueFrom(
      this.httpService
        .post(BASE_URL_SERVICE_CONVERT, bodyFormData, {
          headers: {
            ...bodyFormData.getHeaders(),
          },
          responseType: 'stream',
        })
        .pipe(
          catchError((error: axios.AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    const res = await this.saveFile(data, outputPath);
    if (res === 'ok') {
      return {
        isSuccess: true,
      };
    }
    return {
      isSuccess: false,
    };
  }

  private async saveFile(data, outputPath) {
    try {
      const writer = fs.createWriteStream(outputPath);
      data.pipe(writer); // Pipe the response stream to a file

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          resolve('ok');
        });
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
