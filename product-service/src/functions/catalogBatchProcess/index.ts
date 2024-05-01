import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': [
            '${self:provider.environment.CATALOG_ITEMS_QUEUE}',
            'Arn',
          ],
        },
        batchSize: 5,
      },
    },
  ],
};
