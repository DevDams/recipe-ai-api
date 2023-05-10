import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { FileServerService } from './files-server.service';

@Controller('files')
export class FilesController {
  constructor(private fileServerService: FileServerService) {}

  // upload single file on local database
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    if (file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return {
        status: HttpStatus.OK,
        message: 'Image uploaded successfully!',
        data: response,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de charger le fichier!',
        data: null,
      };
    }
  }

  // upload multiple file on local database
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  // get file by filename from local database
  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // upload file to AWS S3
  @Post('server')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
    }),
  )
  async uploadeFileToS3(@UploadedFile() file: Express.Multer.File) {
    if (file) {
      const uploadedFile = await this.fileServerService.uploadFile(file);
      console.log('FILE IN CLOUD', uploadedFile);

      return {
        status: HttpStatus.OK,
        data: uploadedFile,
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Impossible de charger le fichier !',
        data: null,
      };
    }
  }
}
