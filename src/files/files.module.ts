import { Module } from '@nestjs/common';
import { FileServerService } from './files-server.service';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FileServerService],
  exports: [FileServerService],
})
export class FilesModule {}