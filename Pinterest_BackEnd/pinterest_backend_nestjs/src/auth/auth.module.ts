import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/auth/strategy/localStrategy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwtStrategy.service';
import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Cyber-soft',
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  exports: [AuthService],
})
export class AuthModule {}
