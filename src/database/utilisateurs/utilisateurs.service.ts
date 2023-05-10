import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { FileServerService } from 'src/files/files-server.service';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    private fileServerService: FileServerService,
  ) {}

  // find all element in database
  async findAll(): Promise<User[]> {
    const utilisateurNumber = await this.userModel.find();
    return utilisateurNumber;
  }

  // find all element - search query - pagination
  async query(query: Query): Promise<User[]> {
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
    const utilisateurNumber = await this.userModel.find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);

    return utilisateurNumber;
  }

  // find element by id
  async findById(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException('Cet élément n\'existe pas');
    }
    const utilisateur = await this.userModel.findById(id);
    
    if (!utilisateur) {
      throw new NotFoundException('Aucun élément trouvé.');
    }
    return utilisateur;
  }

  // update element by id
  async updateById(id: string, utilisateur: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, utilisateur, {
      new: true,
      runValidators: true,
    });
  }

  // delete element by id
  async deleteById(id: string): Promise<any> {
    const isValidId = mongoose.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException('Cet élément n\'existe pas');
    }
    const utilisateur = await this.userModel.findById(id);
    
    if (!utilisateur) {
      throw new NotFoundException('Aucun élément trouvé.');
    }

    const result = await this.userModel.findByIdAndDelete(id).exec();

    return {
      message: "Utilisateur supprimé avec succès",
      donnee: result
    }
  }
}
