import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AddressDto } from './dto';
import { Request } from 'express';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Put()
  @UseGuards(AuthGuard)
  async updateAddressCurrentUser(
    @Body() addressDto: AddressDto,
    @Req() req: Request,
  ) {
    const { id } = req['user'];
    return this.addressService.updateAddressUserById(id, addressDto);
  }

  @Put(':uid')
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async updateAddressUserById(
    @Body() addressDto: AddressDto,
    @Param('uid', ParseIntPipe) uid: number,
  ) {
    return this.addressService.updateAddressUserById(uid, addressDto);
  }
}
