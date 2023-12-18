import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    return await this.userService.createUser(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { refresh_token, ...result } = await this.authService.login(loginDto);
    response.cookie('refresh-token', refresh_token);
    return {
      ...result,
      refresh_token,
    };
  }

  @Post('logout')
  async Logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh-token');
    return {
      msg: 'Logout successfully',
    };
  }

  @Post('refreshToken')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const payload = request?.['user'];
    const token = await this.authService.refreshToken(payload);
    response.cookie('refresh-token', token.refresh_token);
    return token;
  }

  @Post('forgot_password')
  async forgotPassword() {
    return 'Done';
  }

  @Post('reset_password')
  async resetPassword() {
    return 'Done';
  }

  @Post('admin')
  async loginAdmin() {
    return 'Done';
  }
}
