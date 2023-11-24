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

@Controller('converter')
export class ConverterController {
  constructor(private readonly httpService: HttpService) {}
  // API updoad file
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
    //
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

      console.log(outputDir);
      fs.mkdirSync(outputDir);

      const outputFileName = file.filename.replace(fileExtension, 'jpg');
      const outputPath = `${outputDir}/${outputFileName}`;

      const imagePath = await this.convertToImage(filePath, outputPath);
      return imagePath;
    }
  }

  private async extractTextFromImage(image_path: string, output_path: string) {
    const data = new FormData();
    // data.append('image_path', '../../factory/input/1/input.jpg');
    // data.append('output_path', '../../factory/output/1/output2222.jpg');

    data.append('image_path', image_path);
    data.append('output_path', output_path);

    const BASE_URL_SERVICE_EXTRACT = 'http://localhost:3000/extract';

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: BASE_URL_SERVICE_EXTRACT,
      data: data,
    };

    this.httpService.axiosRef
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private async convertToImage(inputPath: string, outputPath: string) {
    console.log(`start convertToImage ${inputPath} to ${outputPath}`);
    const BASE_URL_SERVICE_EXTRACT = 'http://192.168.1.8:100/unoconv/jpg';

    const file = fs.readFileSync(inputPath) as any;
    const filename = inputPath.split('/').pop();

    const bodyFormData = new FormData();
    bodyFormData.append('file', file, filename);

    const { data } = await firstValueFrom(
      this.httpService
        .post(BASE_URL_SERVICE_EXTRACT, bodyFormData, {
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

    const writer = fs.createWriteStream(outputPath);
    data.pipe(writer); // Pipe the response stream to a file

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
}
