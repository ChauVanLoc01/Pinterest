import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Get } from '@nestjs/common';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes/file';
import {
  FileUploadDto,
  ImageDTO,
  ImageQueryDTO,
  SavedDTO,
} from './dto/image.dto';
import { AuthPayload } from 'src/types/AuthPayload';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RequestWithAuthPayload } from 'src/types/RequestWithAuthPayload';
import { ResponseApi } from 'src/types/ApiResponse';
import { image, saved } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Image')
@Controller('images')
export class ImageController {
  constructor(private readonly imgService: ImageService) {}

  // Home: get all image
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllImage(
    @Req() req: RequestWithAuthPayload,
    @Query() { image_name }: ImageQueryDTO,
  ) {
    return req
    // return this.imgService.getAllImage(image_name);
  }

  // User: get all image is created
  @Get('created')
  async getAllImageCreated(
    @Req() req: RequestWithAuthPayload,
  ): Promise<ResponseApi<image[]>> {
    return this.imgService.getAllImageCreated(req.user.user_id);
  }

  // User: get all image is saved
  @UseGuards(AuthGuard('jwt'))
  @Get('saved')
  async getAllImageSaved(
    @Req() req: RequestWithAuthPayload,
  ) {
    return req
    // return this.imgService.getAllImageSaved(req.user.user_id);
  }

  // Get image deltail and check image saved?
  // json response {...image, saved: saved????? ( true or false )}
  @Get(':image_id')
  async getImageById(
    @Req() req: RequestWithAuthPayload,
    @Param('image_id') param: number,
  ) {
    return this.imgService.getImageDetailAndSaved(req.user.user_id, param);
  }

  // Delete image by image_id
  @Delete(':image_id')
  async deleteImageById(
    @Req() req: RequestWithAuthPayload,
    @Param('image_id') param: number,
  ) {
    return this.imgService.deleteImageById(req.user.user_id, param);
  }

  // Unsave image by image_id
  @Delete('saved/:image_id')
  async unsaveImageById(
    @Req() req: RequestWithAuthPayload,
    @Param('image_id') param: number,
  ) {
    return this.imgService.unsaveImageById(req.user.user_id, param);
  }

  // create post by file image
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @Post('file')
  async createIdeaByFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20000 * 1000 }), // maximum 20MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: RequestWithAuthPayload,
    @Body() body: ImageDTO,
  ) {
    return this.imgService.createIdea({
      ...body,
      path: `localhost:1234/imgs/${file.filename}`,
      user_id: req.user.user_id,
    });
  }

  // Không check kiểu link base64
  // create post by url
  @Post('url')
  async createIdeaByUrl(
    @Req() req: RequestWithAuthPayload,
    @Body() body: ImageDTO,
  ) {
    if (!body.path) {
      throw new BadRequestException('Url is required!');
    }
    if (!(await this.imgService.isImageAndExist(body.path))) {
      throw new BadRequestException('Invalid Url!');
    }
    return this.imgService.createIdea({
      ...body,
      user_id: req.user.user_id,
    });
  }

  @Post('saved')
  async createUnsaved(
    @Req() req: RequestWithAuthPayload,
    @Body() { image_id }: SavedDTO,
  ) {
    return this.imgService.createSaved(req.user.user_id, image_id);
  }
}
