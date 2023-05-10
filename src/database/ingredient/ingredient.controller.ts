import { IngredientDto } from './ingredient.dto';
import { Ingredient } from './ingredient.schema';
import { IngredientService } from './ingredient.service';
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
  UseInterceptors
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/file-upload.utils';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Post()
  async save(@Body() ingredient: IngredientDto): Promise<Ingredient> {
    return this.ingredientService.create(ingredient);
  }

  @Post('obj-file')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
    }),
  )
  async saveTesting(@Body() data: any, @UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.ingredientService.createTesting(data, file);
  }

  @Get()
  @UseGuards(AuthGuard())
  async find(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  @Get('query')
  @UseGuards(AuthGuard())
  async findByQuery(@Query() query: ExpressQuery): Promise<Ingredient[]> {
    return this.ingredientService.query(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findById(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateById(
    @Param('id') id: string,
    @Body() ingredient: IngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientService.updateById(id, ingredient);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteById(
    @Param('id') id: string,
    @Body() ingredient: IngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientService.updateById(id, ingredient);
  }
}
