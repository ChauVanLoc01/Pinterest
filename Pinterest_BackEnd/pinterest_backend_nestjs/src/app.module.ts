import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './image/image.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/strategy/jwtStrategy.service';
// import { AuthGuard } from './auth/guards/auth.guard';
import { CommentModule } from './comment/comment.module';
import { EmotionModule } from './emotion/emotion.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CommentModule,
    EmotionModule,
  ],
})
export class AppModule {}
