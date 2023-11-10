import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as unoconv from 'unoconv2';
import * as pdf from 'pdf-poppler';
import * as path from 'path';

export enum ImageType {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
}

export enum DocumentType {
  PDF = 'pdf',
}

@Injectable()
export class ConverterService {
  /**
   *
   * @param inputPath './test/input/example.pdf'
   * @param outputPath
   */
  async convertPdfToImage(
    inputPath: string,
    outputPath?: string,
  ): Promise<{
    isSuccess: boolean;
    outputPath?: string;
  }> {
    // console.log(pptx2pdf);
    // pptx2pdf.run('./test/example.pptx');

    inputPath = inputPath || './test/input/example.pdf';
    outputPath = outputPath || path.dirname(inputPath);

    const opts = {
      format: 'png',
      out_dir: outputPath || path.dirname(inputPath),
      out_prefix: path.basename(inputPath, path.extname(inputPath)),
      page: null,
    };

    const res = await pdf
      .convert(inputPath, opts)
      .then((res) => {
        return {
          isSuccess: true,
          outputPath,
        };
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      isSuccess: !!res?.isSuccess,
      outputPath,
    };
    // await get(ConverterService).convertPdfToImage('../sample/pdf/sample1.pdf')
  }

  // await get(ConverterService).convertPptOrPptxToImage()
  async convertPptOrPptxToImage(
    inputPath: string,
    outputPath?: string,
    imageType?: ImageType,
  ): Promise<{
    isSuccess: boolean;
    outputPath?: string;
  }> {
    imageType = imageType || ImageType.PNG;
    outputPath = outputPath || path.dirname(inputPath);

    const output = `${outputPath}.${imageType}`;
    const isSuccess = await unoconv.convert(
      inputPath,
      imageType,
      async function (err, result) {
        return await fs.writeFile(output, result, function (err) {
          if (err) {
            console.log('convertPptOrPptxToImage error');
            console.log(err);
            return false;
          }
          return true;
        });
      },
    );

    return {
      isSuccess,
      outputPath: output,
    };
  }

  // await get(ConverterService).convertPptOrPptxToPdf()
  async convertPptOrPptxToPdf(
    inputPath: string,
    outputPath?: string,
  ): Promise<{
    isSuccess: boolean;
    outputPath?: string;
  }> {
    outputPath = outputPath || path.dirname(inputPath);

    const output = `${outputPath}.${DocumentType.PDF}`;
    const isSuccess = await unoconv.convert(
      inputPath,
      'pdf',
      async function (err, result) {
        return await fs.writeFile(output, result, function (err) {
          if (err) {
            console.log('convertPptOrPptxToPdf error');
            console.log(err);
            return false;
          }
          return true;
        });
      },
    );

    return {
      isSuccess,
      outputPath: output,
    };
  }
}
