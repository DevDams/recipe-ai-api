import { UtilisateursController } from './Utilisateurs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FileServerService } from 'src/files/files-server.service';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { UtilisateursService } from './utilisateurs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UtilisateursController],
  providers: [UtilisateursService, FileServerService],
  exports: [UtilisateursService],
})
export class UtilisateursModule {}
