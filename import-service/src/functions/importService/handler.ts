import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import schema from './schema';

const s3Client = new S3Client({
  region: process.env.REGION,
});

const importService: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log('importService', event);
  const fileName = event?.pathParameters?.fileName ?? '';

  if (!fileName) {
    throw new Error('File name is required');
  }

  const putCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: 'uploaded/' + fileName,
  });

  const signedUrl = await getSignedUrl(s3Client, putCommand, {
    expiresIn: 3600, // time in seconds(1hour)
  });

  return formatJSONResponse({
    url: signedUrl,
  });
};

export const main = importService;
