import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileServerService {
  constructor() {}

  async uploadFile(file: Express.Multer.File) {
    const AWS_S3_BUCKET = process.env.AWS_BUCKET_NAME;

    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file: Buffer, bucket: string, name: string, mimetype: string) {
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await s3.upload(params).promise();
      return s3Response.Location

    } catch (error) {
      return {
        message: 'Impossible de sauvegarder le fichier !'
      }
    }
  }
}
