import { Module, ParseFilePipe } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, process.cwd() + '/public/imgs');
        },
        filename(req, file, callback) {
          callback(null, `${Date.now()}${uuidv4()}-${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
