import { IngredientController } from './ingredient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientService } from './ingredient.service';
import { Module } from '@nestjs/common';
import { IngredientSchema } from './ingredient.schema';
import { AuthModule } from 'src/auth/auth.module';
import { FileServerService } from 'src/files/files-server.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ingredient', schema: IngredientSchema }]),
    AuthModule,
  ],
  controllers: [IngredientController],
  providers: [IngredientService, FileServerService],
  exports: [IngredientService],
})
export class IngredientModule {}
