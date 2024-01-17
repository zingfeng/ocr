import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { HttpModule } from '@nestjs/axios';
import { GenerateQuestionService } from './generate-question.service';

@Module({
  imports: [HttpModule],
  controllers: [ConverterController],
  providers: [GenerateQuestionService],
})
export class ConverterModule {}
