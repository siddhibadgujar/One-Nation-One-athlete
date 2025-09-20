import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { getS3, S3_BUCKET } from '../config/s3';
import fs from 'fs';

const s3 = getS3();

const localStorage = () => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });
  return multer({ dest: uploadDir, limits: { fileSize: 10 * 1024 * 1024 } });
};

export const upload = s3 && S3_BUCKET
  ? multer({
      storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        key: (_req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
        contentType: (_req, file, cb) => cb(null, file.mimetype)
      }),
      limits: { fileSize: 10 * 1024 * 1024 }
    })
  : localStorage();
