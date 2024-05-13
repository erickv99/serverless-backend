import type { AWS } from '@serverless/typescript';

import importService from '@functions/importService';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'us-east-1',
    profile: 'iam-user1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REGION: 'us-east-1',
      BUCKET_NAME: 'practitioner-js',
      CATALOG_ITEMS_QUEUE: 'catalogItemsQueue',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              's3:PutObject',
              's3:GetObject',
              's3:DeleteObject',
              's3:ListBucket',
            ],
            Resource: 'arn:aws:s3:::practitioner-js/*',
          },
          {
            Effect: 'Allow',
            Action: ['sqs:SendMessage', 'sqs:GetQueueUrl'],
            Resource: '*',
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { importService, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      GatewayResponse: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
          ResponseType: 'DEFAULT_4XX',
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
