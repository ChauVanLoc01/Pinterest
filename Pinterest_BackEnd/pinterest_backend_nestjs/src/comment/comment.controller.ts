import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDTO, CommentDTO } from './types/comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithAuthPayload } from 'src/types/RequestWithAuthPayload';

@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':image_id')
  findAllComment(@Param('image_id') param: number) {
    return this.commentService.findAll(param);
  }

  @Post()
  createComment(@Req() req: RequestWithAuthPayload, @Body() body: CommentDTO) {
    return this.commentService.createComment({
      ...body,
      user_id: req.user.user_id,
    });
  }

  @Put()
  updateComment(@Body() { comment_id, content }: UpdateCommentDTO) {
    return this.commentService.updateComment(comment_id, content);
  }

  @Delete(':comment_id')
  deleteComment(
    @Req() req: RequestWithAuthPayload,
    @Param('comment_id') param: number,
  ) {
    return this.commentService.deleteComment(req.user.user_id, param);
  }
}
