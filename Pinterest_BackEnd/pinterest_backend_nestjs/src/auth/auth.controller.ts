import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  HttpCode,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ChangePasswordDTO,
  LoginDTO,
  RegisterDTO,
  UpdateInfoDTO,
  UserDTO,
} from './types/auth.dto';
import { LoginResponse, UserResponse } from './types/auth.interface';
import { Public } from './guards/public.metadata';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithAuthPayload } from 'src/types/RequestWithAuthPayload';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(
    @Req() req: RequestWithAuthPayload,
    @Body() body: LoginDTO,
  ): Promise<LoginResponse> {
    const { user_id, full_name, email } = req.user;
    return this.authService.generateJWT({ email, full_name, user_id });
  }

  @ApiBearerAuth()
  @Post('logout')
  logout(@Req() req: RequestWithAuthPayload) {
    return this.authService.logout(req.user.user_id);
  }

  @ApiBearerAuth()
  @Public()
  @Post('register')
  @HttpCode(201)
  register(@Body() body: RegisterDTO): Promise<UserResponse> {
    return this.authService.generateUser(body);
  }

  @ApiBearerAuth()
  @Put('profile')
  update(
    @Req() req: RequestWithAuthPayload,
    @Body() body: UpdateInfoDTO,
  ): Promise<UserResponse> {
    return this.authService.updateProfileUser(req.user.user_id, body);
  }

  @ApiBearerAuth()
  @Put('change-password')
  resetPassword(
    @Req() req: RequestWithAuthPayload,
    @Body() body: ChangePasswordDTO,
  ) {
    return this.authService.changePassword(req.user.user_id, body);
  }
}
