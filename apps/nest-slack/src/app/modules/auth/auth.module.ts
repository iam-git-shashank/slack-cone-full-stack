import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthenticationController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UsersModule),

    JwtModule.register({
      global: true,
      secret: "IAMTHANOS",
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [AuthService],
})
export class AuthenticationModule {}
