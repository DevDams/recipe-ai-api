import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Ingredient } from './ingredient.schema';
import { Query } from 'express-serve-static-core';
import { FileServerService } from 'src/files/files-server.service';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private IngredientModel: mongoose.Model<Ingredient>,
    private fileServerService: FileServerService
  ) {}

  // find all element in database
  async findAll(): Promise<Ingredient[]> {
    const ingredientNumber = await this.IngredientModel.find();
    return ingredientNumber;
  }

  // find all element - search query - pagination
  async query(query: Query): Promise<Ingredient[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          numero: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const ingredientNumber = await this.IngredientModel.find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return ingredientNumber;
  }

  // save element in database
  async create(ingredient: Ingredient): Promise<Ingredient> {
    const result = await this.IngredientModel.create(ingredient);
    return result;
  }

  async createTesting(data: any, file: Express.Multer.File): Promise<any> {
    const awsUploadFile = await this.fileServerService.uploadFile(file)
    const newData = {
      file: awsUploadFile,
      ...data
    }

    const result = await this.IngredientModel.create(newData);
  }

  // find element by id
  async findById(id: string): Promise<Ingredient> {
    const isValidId = mongoose.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException('Cet élément n\'existe pas');
    }
    const ingredient = await this.IngredientModel.findById(id);
    
    if (!ingredient) {
      throw new NotFoundException('Aucun élément trouvé.');
    }
    return ingredient;
  }

  // update element by id
  async updateById(id: string, ingredient: Ingredient): Promise<Ingredient> {
    return await this.IngredientModel.findByIdAndUpdate(id, ingredient, {
      new: true,
      runValidators: true,
    });
  }

  // delete element by id
  async deleteById(id: string): Promise<Ingredient> {
    return await this.IngredientModel.findByIdAndDelete(id);
  }
}
