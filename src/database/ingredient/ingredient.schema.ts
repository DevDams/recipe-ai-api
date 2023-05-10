import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';
// import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Ingredient {
  @Prop({ required: true })
  libelle: string;

  @Prop({ required: true })
  categorie: string;
  
  @Prop()
  description: string;

  /**
   * A utiliser pour faire les relations entre les objets
   */
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user: User;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
