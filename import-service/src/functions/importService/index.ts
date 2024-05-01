import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'uploaded/{fileName}',
        request: {
          parameters: {
            paths: {
              fileName: true,
            },
          },
        },
      },
    },
  ],
};
