import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  HttpStatus,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import type { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  // // @HttpCode(200)
  // @UseGuards(authGuard)
  // @Get('me')
  // getUserInfo(@Request() request) {
  //   return request.user;
  // }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() user: {email:string;password:string}, @Res() response: Response) {
    console.log(user)
    const auth_user = await this.authenticationService.getAuthenticatedUser(
      user
    );
    // const cookie = this.authenticationService.getCookieWithJwtToken(user);
    // response.setHeader('Set-Cookie', cookie);
    // user.password = "";
    if (auth_user) {
      return response.send({ auth_user });
    }

    return response.send({ msg: 'not authenticated' });
  }
}
