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
        authorizer: {
          arn: 'arn:aws:lambda:us-east-1:381492271036:function:authorization-service-dev-basicAuthorizer',
          identitySource: 'method.request.header.Authorization',
          name: 'basicAuthorizer',
          resultTtlInSeconds: 0,
          type: 'token',
        },
      },
    },
  ],
};
