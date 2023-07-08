import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CommentDTO {
  @ApiProperty()
  @IsString({ message: 'Content of comment is require' })
  @Length(1, 1000, { message: 'Lenght 1 - 1000 lenght' })
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  parent_id: number;

  @ApiProperty()
  @IsNumber()
  image_id: number;
}

export class UpdateCommentDTO {
  @ApiProperty()
  @IsString({ message: 'Content of comment is require' })
  @Length(1, 1000, { message: 'Lenght 1 - 1000 lenght' })
  content: string;

  @ApiProperty()
  @IsNumber()
  comment_id: number;
}
