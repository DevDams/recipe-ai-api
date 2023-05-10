import { Module } from '@nestjs/common';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [IngredientModule, UtilisateursModule],
  providers: [],
  controllers: [],
  exports: [IngredientModule, UtilisateursModule],
})
export class DatabaseModule {}
