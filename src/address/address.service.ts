import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { AddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async updateAddressUserById(user_id: number, dto: AddressDto) {
    const address = await this.prisma.address.findFirst({
      where: {
        user_id: user_id,
      },
    });
    if (!address) {
      throw new ConflictException();
    }
    const result = await this.prisma.address.update({
      where: {
        id: address.id,
      },
      data: {
        ...dto,
      },
    });
    return result;
  }
}
