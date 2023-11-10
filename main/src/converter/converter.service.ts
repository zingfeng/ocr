import { Injectable } from '@nestjs/common';
import * as pdf from 'pdf-poppler';
import * as path from 'path';

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
    // await get(ConverterService).convertPdfToImage()
    // await get(ConverterService).convertPdfToImage('../sample/pdf/sample1.pdf')
  }
}
