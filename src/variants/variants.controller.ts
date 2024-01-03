import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VariantsService } from './variants.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ValueDto, VariantsDto } from './dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('variants')
export class VariantsController {
  constructor(private variantsService: VariantsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getVariants() {
    return this.variantsService.getVariants();
  }

  @Post()
  @UseGuards(AuthGuard)
  createVariants(@Body() variantsDto: VariantsDto) {
    return this.variantsService.createVariants(variantsDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateVariants(
    @Param('id', ParseIntPipe) id: number,
    @Body() VariantsDto: VariantsDto,
  ) {
    return this.variantsService.updateVariants(id, VariantsDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  deleteVariants(@Param('id', ParseIntPipe) id: number) {
    return this.variantsService.deleteVariants(id);
  }

  // create new variant values
  @Post(':vid/value')
  @UseGuards(AuthGuard)
  createVariantValue(
    @Param('vid', ParseIntPipe) vid: number,
    @Body() value: ValueDto,
  ) {
    return this.variantsService.createVariantValue(vid, value);
  }
}
