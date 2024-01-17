import { Injectable } from '@nestjs/common';

export interface GenerateQuestionResult {
  title: string;
  image: string;
  option: {
    [key: string]: string;
  };
  correct: string;
}

export interface Extraction {
  output_path: string;
  text: string;
  symbol: string;
}

export interface Option {
  symbol?: string;
  text: string;
  isTrue: boolean;
}

@Injectable()
export class GenerateQuestionService {
  generate(extractions: Extraction[]): GenerateQuestionResult {
    const title = 'Hãy chọn đáp án đúng để điền vào chỗ trống';
    const image = extractions[0].output_path;

    // sanitize extractions
    extractions.map((extraction) => {
      // replace all new line with empty string
      extraction.text = extraction.text.replace(/\n/g, '').trim();
    });

    const trueOption: Record<string, string> = {};
    // {
    //   A: 'abc',
    //   B: 'def',
    //   C: 'ghi',
    // }

    extractions.forEach((extraction) => {
      trueOption[extraction.symbol] = extraction.text;
    });

    const options: Option[] = [this.pickARandomTrueOption(trueOption)];

    const maxFakeOption = 3;
    const fakeOptions = this.generateFakeOption(trueOption, maxFakeOption);
    options.push(...fakeOptions);

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // add symbol to option
    options.forEach((option, index) => {
      option.symbol = String.fromCharCode(65 + index);
    });

    const finalOptions = {};
    options.map((option) => {
      finalOptions[option.symbol] = option.text;
    });

    const correctSymbol = options.find((option) => option.isTrue).symbol;
    return {
      title,
      image,
      option: finalOptions,
      correct: correctSymbol,
    };
  }

  private generateFakeOption(
    trueOption: Record<string, string>,
    max: number,
  ): Option[] {
    const result: Option[] = [];
    const symbols = Object.keys(trueOption);
    const texts = Object.values(trueOption);

    const numberCaseFakeOption = symbols.length * (symbols.length - 1); // max possible fake option
    const numberFakeOption = Math.min(numberCaseFakeOption, max);

    // Generate all possible fake option
    const fakeOptions = [];
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      for (let j = 0; j < texts.length; j++) {
        const text = texts[j];
        const isTrueOption = trueOption[symbol] === text;
        if (isTrueOption) {
          continue;
        }
        fakeOptions.push({
          text: this.generateOptionText(symbol, text),
          isTrue: false,
        });
      }
    }

    // Shuffle fake options and pick random fake options
    fakeOptions.sort(() => Math.random() - 0.5);
    for (let i = 0; i < numberFakeOption; i++) {
      result.push(fakeOptions[i]);
    }
    return result;
  }

  private pickARandomTrueOption(trueOption: Record<string, string>): Option {
    const randomTrueOption = Math.floor(
      Math.random() * Object.keys(trueOption).length,
    );
    const symbol = Object.keys(trueOption)[randomTrueOption];
    const text = trueOption[symbol];
    return {
      text: this.generateOptionText(symbol, text),
      isTrue: true,
    };
  }

  private generateOptionText(symbol, text) {
    return `${symbol} = ${text}`;
  }
}
