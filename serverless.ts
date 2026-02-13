import type { AWS } from '@serverless/typescript'

import hello from '@functions/hello';
import user from '@functions/http/users';

const serverlessConfiguration: AWS = {
  service: 'user-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'ap-southeast-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      DB_HOST: 'localhost',
      DB_PORT: '3306',
      DB_USER: 'root',
      DB_PASS: 'password',
      DB_NAME: 'user_db',
      REDIS_HOST: 'localhost',
      JWT_SECRET: 'supersecret',
    },
  },
  // import the function via paths
  functions: { hello, ...user },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    offline: {
      httpPort: 4000,
      websocketPort: 4001,
      lambdaPort: 4002,
    },
  },
};

module.exports = serverlessConfiguration;
