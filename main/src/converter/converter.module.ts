import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ConverterController],
})
export class ConverterModule {}
