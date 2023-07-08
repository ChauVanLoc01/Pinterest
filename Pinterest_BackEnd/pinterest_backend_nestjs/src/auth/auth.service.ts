import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChangePasswordDTO, LoginDTO, UserDTO } from './types/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, UserResponse } from './types/auth.interface';
import { filterObject, sliceObject } from 'src/utils/utils';
import { JwtStrategy } from './strategy/jwtStrategy.service';
import { omit, omitBy } from 'lodash';
import { ResponseApi } from 'src/types/ApiResponse';
import { AuthPayload } from 'src/types/AuthPayload';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async findUser(body: Partial<user>) {
    const user = await this.prisma.user.findFirst({
      where: body,
    });
    return user;
  }
  async findUserUnique(user_id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    return user;
  }
  async updateUser(
    user_id: number,
    data: Partial<Omit<user, 'user_id' | 'email'>>,
  ) {
    const update_user = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: filterObject(data),
    });
    return update_user;
  }
  async createUser(data: Pick<user, 'full_name' | 'email' | 'password'>) {
    const user = await this.prisma.user.create({ data });
    return user;
  }
  async updateProfileUser(
    user_id: number,
    data: Partial<Omit<user, 'user_id' | 'password' | 'email'>>,
  ): Promise<UserResponse> {
    const user = await this.findUserUnique(user_id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    if (
      data.birth_day !== user.birth_day ||
      data.description !== user.description ||
      data.description !== user.description
    ) {
      const user_updated = await this.updateUser(user_id, data);
      return {
        message: 'Update profile successfull!',
        data: omit(user_updated, ['password', 'user_id', 'token']),
      };
    }
    return {
      message: 'Update profile successfull!',
      data: omit(user, ['password', 'user_id', 'token']),
    };
  }
  async hashPassword(plainText: string, saltOrRound = 10) {
    try {
      const encodeText = await bcrypt.hash(plainText, saltOrRound);
      return encodeText;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  comparePassword(plainPassword: string, encodePassword: string) {
    try {
      const isMatch = bcrypt.compareSync(plainPassword, encodePassword);
      return isMatch;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async validateUser({ email, password }: LoginDTO) {
    const user = await this.findUser({ email });
    if (!user) {
      return 'Email does not exist!';
    }
    if (!this.comparePassword(password, user.password)) {
      return 'Password incorrect!';
    }
    return user;
  }
  async generateJWT(data: AuthPayload): Promise<LoginResponse> {
    const token = await this.jwt.signAsync(data, { expiresIn: '8h' });
    const insert_token_into_user = await this.prisma.user.update({
      where: {
        user_id: data.user_id,
      },
      data: {
        token,
      },
    });
    return {
      message: 'Login successfull!',
      data: {
        access_token: `Bearer ${token}`,
      },
    };
  }
  async generateUser({
    email,
    full_name,
    password,
  }: Pick<user, 'full_name' | 'email' | 'password'>): Promise<UserResponse> {
    const user = await this.findUser({ email });
    if (user) {
      throw new ConflictException('Email already exist!');
    }
    const hash_password = await this.hashPassword(password);
    const new_user = await this.createUser({
      full_name,
      email,
      password: hash_password,
    });
    if (new_user) {
      return {
        message: 'Initial user succesfull',
        data: omit(new_user, ['password', 'user_id']),
      };
    }
  }
  async changePassword(
    user_id: number,
    { new_password, current_password }: InstanceType<typeof ChangePasswordDTO>,
  ): Promise<ResponseApi<{}>> {
    const user = await this.findUserUnique(user_id);
    if (!user) {
      throw new BadRequestException('User does not exist!');
    }
    if (!(await this.comparePassword(current_password, user.password))) {
      throw new BadRequestException('Incorrect old password!');
    }
    const encode_password = await this.hashPassword(new_password);
    const update_user = await this.updateUser(user_id, {
      password: encode_password,
    });
    return {
      message: 'Change password successfull!',
      data: {},
    };
  }

  async logout(user_id: number): Promise<ResponseApi<{}>> {
    const delete_token = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        token: '',
      },
    });
    return {
      message: 'Logout successfull!',
      data: {},
    };
  }
}
