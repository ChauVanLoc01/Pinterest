import { Controller, Post, Body, Delete, Req, Param } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { CommentEmotionDto, ImageEmotionDto } from './types/emotion.dto';
import { AuthPayload } from 'src/types/AuthPayload';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithAuthPayload } from 'src/types/RequestWithAuthPayload';

@ApiBearerAuth()
@ApiTags('Emotion')
@Controller()
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  // Create and Update emotion for comment
  @Post('cmt-emotion')
  createAndUpdateCmtEmotion(
    @Req() req: RequestWithAuthPayload,
    @Body() body: CommentEmotionDto,
  ) {
    return this.emotionService.createAndUpdateCmtEmotion({
      ...body,
      user_id: req.user.user_id,
    });
  }

  @Delete('cmt-emotion/:id')
  deleteCmtEmotion(
    @Req() req: RequestWithAuthPayload,
    @Param('id') comment_id: number,
  ) {
    return this.emotionService.deleteCmtEmotion(req.user.user_id, comment_id);
  }

  // Create emotion for image
  @Post('img-emotion')
  createAndUpdateImgEmotion(
    @Req() req: RequestWithAuthPayload,
    @Body() body: ImageEmotionDto,
  ) {
    return this.emotionService.createAndUpdateImgEmotion({
      ...body,
      user_id: req.user.user_id,
    });
  }

  @Delete('img-emotion/:id')
  deleteImgEmotion(
    @Req() req: RequestWithAuthPayload,
    @Param('id') image_id: number,
  ) {
    return this.emotionService.deleteImgEmotion(req.user.user_id, image_id);
  }
}
