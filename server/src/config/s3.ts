import { S3Client } from '@aws-sdk/client-s3';

export const getS3 = () => {
  const region = process.env.AWS_REGION;
  if (!region) return null;
  return new S3Client({ region });
};

export const S3_BUCKET = process.env.S3_BUCKET || '';
