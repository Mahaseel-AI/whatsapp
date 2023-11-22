import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallbackModule } from './callback/callback.module';
import { MessageModule } from './message/message.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [CallbackModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
