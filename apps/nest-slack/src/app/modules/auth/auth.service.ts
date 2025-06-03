import {
  BadRequestException,
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

type SignInData = { userId: number; email: string };
type AuthInput = { email: string; password: string };

type AuthResult = {
  email: string;
  userId: number;
  accessToken: string;
  name: string;
};

export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = "undefined";
      return createdUser;
    } catch (error) {
      console.log(error);
      if (error) {
        throw new BadRequestException("Try another Email ");
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getAuthenticatedUser(
    auth_inp: AuthInput
  ): Promise<AuthResult | null> {
    try {
      // console.log(auth_inp.email);

      const user = await this.userService.findOneByEmail(auth_inp.email);
      if (user) {
        await this.verifyPassword(auth_inp.password, user.password);
        user.password = "";
        return this.signInToken({
          userId: user.id,
          email: user.email,
          name: user.username,
        });
      } else {
        throw new HttpException(
          "Wrong credentials provided",
          HttpStatus.BAD_REQUEST
        );
      }
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    console.log(hashedPassword.length);
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      console.log("pass wro", plainTextPassword);

      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }
  async signInToken(user: {
    email: string;
    userId: number;
    name: string;
  }): Promise<AuthResult | null> {
    const tokenPayload = { sub: user.userId, username: user.email };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return {
      accessToken,
      email: user.email,
      userId: user.userId,
      name: user.name,
    };
  }

  public async getUserFromAuthenticationToken(token: string) {
    const tokenPayload = await this.jwtService.verifyAsync(token);

    if (tokenPayload.username) {
      console.log(tokenPayload.username);
      return this.userService.findOneByEmail(tokenPayload.username);
    }
  }

  public getCookieWithJwtToken(inp: AuthInput) {
    // const payload: { userId: number } = { userId };
    // const token = this.jwtService.sign(payload);
    // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }
}
