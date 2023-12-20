import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { updateCurrentDto } from './dto';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async getProfileUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.userService.getProfileUser(id);
  }

  @Get('profile/all')
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async getAllUser(): Promise<any> {
    return this.userService.getAllUser();
  }

  @Get('profile/current')
  @Roles(['admin', 'user'])
  @UseGuards(AuthGuard, RolesGuard)
  async getProfile(@Req() req: Request): Promise<any> {
    const { id } = req['user'];
    return this.userService.getProfileUser(id);
  }

  @Put('profile/current')
  @Roles(['admin', 'user'])
  @UseGuards(AuthGuard, RolesGuard)
  async updateProfileCurrentUser(
    @Req() req: Request,
    @Body() updateCurrentDto: updateCurrentDto,
  ): Promise<User> {
    const { id } = req['user'];
    return this.userService.updateProfileCurrentUser(id, updateCurrentDto);
  }
}
