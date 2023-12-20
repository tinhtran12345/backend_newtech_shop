import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto, updateCurrentDto } from './dto';
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
    // su dung transaction de xu li tao 3 bang user, address, role
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
        Address: {
          create: {},
        },
        Role: {
          create: {
            role_type: 'user',
          },
        },
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

  async updateProfileCurrentUser(id: number, dto: updateCurrentDto) {
    const currentUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = currentUser;
    return result;
  }
}
