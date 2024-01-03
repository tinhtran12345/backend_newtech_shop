import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { ValueDto, VariantsDto } from './dto';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async getVariants() {
    const variants = await this.prisma.variants.findMany();
    return variants;
  }

  async createVariants(dto: VariantsDto): Promise<any> {
    const newVariants = await this.prisma.variants.create({
      data: {
        ...dto,
      },
    });
    return newVariants;
  }

  async updateVariants(id: number, dto: VariantsDto): Promise<any> {
    const update = await this.prisma.variants.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return update;
  }

  async deleteVariants(id: number): Promise<any> {
    const deleteItems = await this.prisma.variants.delete({
      where: {
        id: id,
      },
    });
    if (!deleteItems) {
      throw new ConflictException('Something went wrong!');
    }
    return {
      msg: 'Delete successfully!',
    };
  }

  async createVariantValue(vid: number, dto: ValueDto): Promise<any> {
    const payload = {
      variants_id: vid,
      ...dto,
    };
    const newVariantValue = await this.prisma.variant_values.create({
      data: {
        ...payload,
      },
    });
    return newVariantValue;
  }
}
