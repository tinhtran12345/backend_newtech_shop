import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // create product => create Product_category,Variants, Variant_values table
  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  createProducts(@Body() productDto: ProductDto) {
    return this.productsService.createProduct(productDto);
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getProducts();
  }
}
