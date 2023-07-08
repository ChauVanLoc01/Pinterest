import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ImageEmotionDto {
  @ApiProperty()
  @IsNumber()
  image_id: number;

  @ApiProperty()
  @IsEnum(['like', 'love', 'wow', 'angry', 'sad', 'haha', 'heart'])
  status: 'like' | 'love' | 'wow' | 'angry' | 'sad' | 'haha' | 'heart';
}

export class CommentEmotionDto {
  @ApiProperty()
  @IsNumber()
  comment_id: number;

  @ApiProperty()
  @IsEnum(['like', 'love', 'wow', 'angry', 'sad', 'haha', 'heart'])
  status: 'like' | 'love' | 'wow' | 'angry' | 'sad' | 'haha' | 'heart';
}
