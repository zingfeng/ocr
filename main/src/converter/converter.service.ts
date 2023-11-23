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

  async convertPdfToPng(
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
            console.log('convertPdfToPng error');
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

  // await get(ConverterService).demoConvertPptToImage()
  async demoConvertPptToImage() {
    console.log('1. Convert ppt to png');
    await this.convertPptOrPptxToImage('../sample/ppt/example.ppt', '../output/ppt_to_png');
  }

  // await get(ConverterService).demoConvertPptToImage()
  async demoConvertPptxToImage() {
    console.log('2. Convert pptx to png');
    await this.convertPptOrPptxToImage('../sample/ppt/example.pptx', '../output/pptx_to_png');
  }


  // await get(ConverterService).demoConvertPptToPdf()
  async demoConvertPptToPdf() {
    console.log('3. Convert ppt to pdf');
    await this.convertPptOrPptxToPdf('../sample/ppt/example.pptx', '../output/ppt_to_pdf');
  }


  // await get(ConverterService).demoConvertPdfToPng()
  async demoConvertPdfToPng() {
    console.log('4. Convert pdf to png');
    await this.convertPdfToPng('../sample/pdf/sample1.pdf', '../output/pdf_to_png');
  }

}
