import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { user as User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { LoginDTO } from 'src/auth/types/auth.dto';
import { validate } from 'class-validator';
import { ResponseApi } from 'src/types/ApiResponse';
import { ErrorValidate } from 'src/types/ErrorValidate';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    // validate user's input
    const login = plainToClass(LoginDTO, { email, password });
    const errors = await validate(login);
    if (errors.length > 0) {
      const data_err = errors.map((err) => {
        return { key: err.property, errors: err.constraints } as ErrorValidate;
      });
      const result = {
        message: "User's input invalid!",
        data: data_err,
      } as ResponseApi<ErrorValidate[]>;
      throw new BadRequestException(result);
    }

    // validate user
    const user = await this.authService.validateUser({ email, password });
    if (typeof user === 'string') {
      throw new BadRequestException(user);
    }
    return user;
  }
}
