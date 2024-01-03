import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { ProductDto } from './dto';
import { slug } from 'src/common/utils/slug';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: ProductDto): Promise<any> {
    const newProduct = await this.prisma.product.create({
      data: {
        product_name: dto.product_name,
        product_code: slug(dto.product_name),
        description: dto.description,
        price: dto.price,
        quantity: dto.quantity,
        category_id: dto.category_id,
        thumb: dto.thumb,
      },
    });
    return newProduct;
  }

  async getProducts(): Promise<any> {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        product_name: true,
        product_code: true,
        description: true,
        price: true,
        quantity: true,
        category_id: true,
        thumb: true,
        Variant_values: true,
      },
    });
    return products;
  }
}
