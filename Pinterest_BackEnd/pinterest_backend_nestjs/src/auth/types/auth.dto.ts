import { OmitType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { NotMatch } from 'src/utils/NotMatch';

export class UserDTO {
  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => {
    if (new Date(value) > new Date()) {
      return new Date().toISOString();
    }
    return value;
  })
  birth_day: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email Incorrect!' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  password: string;
}

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email Incorrect!' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  password: string;
}

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email Incorrect!' })
  email: string;

  @ApiProperty()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  password: string;
}

export class UpdateInfoDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => {
    if (new Date(value) > new Date()) {
      return new Date().toISOString();
    }
    return value;
  })
  birth_day: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;
}

export class ChangePasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  new_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum 8 character, at least 1 letter, 1 number and 1 special character',
  })
  @NotMatch('new_password')
  current_password: string;
}
