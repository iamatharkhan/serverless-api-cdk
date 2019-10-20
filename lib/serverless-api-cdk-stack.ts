import cdk = require('@aws-cdk/core');
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';

export class ServerlessApiCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const interestCalcFn = new Function(this, 'interestCalcFn', {
      runtime: Runtime.NODEJS_10_X,
      code: Code.fromAsset('dist'),
      handler: 'interestCalcFn.handler',
      functionName: 'interestCalculator'
    });

    const api = new RestApi(this, 'serverlessApi', {
      deployOptions: {
        stageName: 'dev'
      }
    });

    api.root.addResource('v1')
      .addResource('calculate-interest')
      .addMethod('GET', new LambdaIntegration(interestCalcFn));
  }
}
