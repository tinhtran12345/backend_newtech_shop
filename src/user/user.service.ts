import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new ConflictException('Email duplicate!');
    }
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async getAllUser() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        Address: true,
        Role: {
          select: {
            role_type: true,
          },
        },
      },
    });
  }

  async getProfileUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        password: false,
        Role: {
          select: {
            role_type: true,
          },
        },
        Address: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }
}
