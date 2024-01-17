import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { HttpModule } from '@nestjs/axios';
import { GenerateQuestionService } from './generate-question.service';
import { DriveService } from './drive.service';

@Module({
  imports: [HttpModule],
  controllers: [ConverterController],
  providers: [GenerateQuestionService, DriveService],
})
export class ConverterModule {}
