import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

type Effect = 'Allow' | 'Deny';

const generatePolicy = (
  principalId: string,
  resource: string,
  effect: Effect
) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

const basicAuthorizer = (
  event: APIGatewayTokenAuthorizerEvent,
  _,
  callback
) => {
  console.log('Basic Authorizer:', event.authorizationToken);

  if (event.type !== 'TOKEN') {
    callback('Unauthorized');
  }

  try {
    const { authorizationToken, methodArn } = event;
    const encodedCreds = authorizationToken.split(' ')[1] ?? '';
    const strb64 = Buffer.from(encodedCreds, 'base64');
    const [user, password] = strb64.toString('utf-8').split(':');

    if (!user || !password) {
      callback('Unauthorized');
    }

    const envPassword = process.env[user];
    const effect: Effect =
      !envPassword || envPassword !== password ? 'Deny' : 'Allow';

    return callback(null, generatePolicy(user, methodArn, effect));
  } catch (e) {
    callback(`Unauthorized: ${e.message}`);
  }
};
export const main = basicAuthorizer;
