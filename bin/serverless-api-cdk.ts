#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ServerlessApiCdkStack } from '../lib/serverless-api-cdk-stack';

const app = new cdk.App();
new ServerlessApiCdkStack(app, 'ServerlessApiCdkStack', {
  env: {
    region: 'eu-west-2'
  }
});
