import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);

  console.log(`await get(AppService).getHello()`);
}
bootstrap();
