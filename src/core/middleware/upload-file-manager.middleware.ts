import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { MiddlewareInterface } from './middleware.interface.js';
import { nanoid } from 'nanoid';
import mime from 'mime-types';

const VALID_MIME_LIST = [
  'image/png',
  'image/jpeg',
  'image/jpg',
];

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(request: Request, response: Response, nextFunction: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);

        if(!VALID_MIME_LIST.includes(file.mimetype)){
          response.status(409).send({ error: 'Wrong file extension format.' });
          return;
        }

        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({storage})
      .single(this.fieldName);

    uploadSingleFileMiddleware(request, response, nextFunction);
  }
}
