import { IsEmpty, IsString } from 'class-validator';
// import { User } from '../../auth/schemas/user.schema';

export class IngredientDto {
  @IsString()
  readonly libelle: string;
  
  readonly description: string;

  readonly categorie: string;

  // @IsEmpty({ message: 'Vous ne pouvez pas ajouter d\'id utilisateur' })
  // readonly user: User
}