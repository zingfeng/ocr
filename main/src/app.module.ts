import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConverterModule } from './converter/converter.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';

@Module({
  imports: [
    ConverterModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'factory'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
