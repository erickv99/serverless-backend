import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'practitioner-js',
        event: 's3:ObjectCreated:*',
        existing: true, // this means the bucket already exists
        rules: [{ prefix: 'uploaded/' }, { suffix: '.csv' }],
      },
    },
  ],
};
