import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from './dto';
import { PrismaService } from 'src/providers/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { password, ...result } = await this.validatorUser(dto);
    const payload = {
      id: result.id,
      role: result.Role[0].role_type,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY as string,
      expiresIn: '3h',
    });
    const refresh_token = await this.jwtService.signAsync(
      { id: result.id, role: result.Role[0].role_type },
      {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY as string,
        expiresIn: '7d',
      },
    );

    return {
      result,
      access_token,
      refresh_token,
    };
  }

  async refreshToken(payload: { id: number; role: string }) {
    const new_access_token = await this.jwtService.signAsync(
      { id: payload.id, role: payload.role },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: '3h',
      },
    );
    const new_refresh_token = await this.jwtService.signAsync(
      { id: payload.id, role: payload.role },
      {
        secret: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: '7d',
      },
    );
    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token,
    };
  }

  async validatorUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        password: true,
        Role: {
          select: {
            role_type: true,
          },
        },
      },
    });

    if (!user || !(await compare(dto.password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
