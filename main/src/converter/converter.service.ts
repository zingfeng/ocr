import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as unoconv from 'unoconv2';
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

  async convertPptToImage() {
    // await get(ConverterService).convertPptToImage()

    const res = await unoconv.detectSupportedFormats(  function (err, result) {
      if (err) {
        console.log('error');
        console.log(err);
      } else {
        console.log('success');
        console.log(result);
      }
    });
console.log(res);

    // pdf, png, jpg is available

    await unoconv.convert('../sample/ppt/example.ppt','png', function (err, result) {
      // result is returned as a Buffer
      console.log('tick');
      fs.writeFile('converted.png', result, function (err) {
        //fs.writeFile('converted.pdf', result, function(err) {
        if (err) {
          console.log('error');
          console.log(err);
        } else {
          console.log('success');

        }
      });
    });
  }
}
