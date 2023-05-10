import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-upload.utils';
import { User } from 'src/auth/schemas/user.schema';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursDto } from './utilisateurs.dto';

@Controller('utilisateur')
export class UtilisateursController {
  constructor(private utilisateursService: UtilisateursService) {}

  @Get()
  @UseGuards(AuthGuard())
  async find(): Promise<User[]> {
    return this.utilisateursService.findAll();
  }

  @Get('query')
  @UseGuards(AuthGuard())
  async findByQuery(@Query() query: ExpressQuery): Promise<User[]> {
    return this.utilisateursService.query(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findById(@Param('id') id: string): Promise<User> {
    return this.utilisateursService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateById(
    @Param('id') id: string,
    @Body() user: UtilisateursDto,
  ): Promise<User> {
    return this.utilisateursService.updateById(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteById(@Param('id') id: string): Promise<any> {
    return this.utilisateursService.deleteById(id);
  }
}
