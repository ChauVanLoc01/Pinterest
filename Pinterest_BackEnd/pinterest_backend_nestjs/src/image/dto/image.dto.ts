import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class ImageDTO {
  @ApiProperty()
  @Length(1, 500, { message: 'Min lenght 1 - Max lenght 500' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(2800, { message: 'url max lenght 2800' })
  path: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(500, { message: 'Max lenght 500' })
  description: string;
}

export class SavedDTO {
  @ApiProperty()
  @IsNumber()
  image_id: number;
}

export class ImageQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  image_name: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty()
  @Length(1, 500, { message: 'Min lenght 1 - Max lenght 500' })
  name: string;

  // @ApiPropertyOptional()
  // // @IsOptional()
  // @MaxLength(500, { message: 'Max lenght 500' })
  // description: string;
}
