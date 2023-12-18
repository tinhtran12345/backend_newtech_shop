import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  async getProfileUserById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    return this.userService.getProfileUser(id);
  }
}
