import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async createProducts() {
    return 'create products';
  }

  @Get()
  async getProducts() {
    return 'Product';
  }
}
