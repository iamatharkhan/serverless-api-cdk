# Simple Serverless API

This is an example project to create a simple serverless API implementing only one GET handler
to calculate the interest based on the given amount in query string parameter.

The resources are provisioned through CloudFormation using AWS CDK.

## Resources

* AWS Lambda Function
* AWS API Gateway

## Running locally

To run the API locally, AWS SAM Cli must be installed.

Instructions to install AWS SAM Cli are defined here https://aws.amazon.com/serverless/sam/

### Insall dependencies

`npm ci`

### Build source

`npm run build`

`npm run build-webpack`

### Run tests

`npm test`

### Start API

First generate `template.yml` file using:

`cdk synth --no-staging > template.yml`

Using SAM, start API:

`sam local start-api`

This should create a URL to access the API endpoint `http://127.0.0.1:3000/`

#### Parameters

To get the interest rate applied to the given balance, supply the `balance` in query string parameters.

E.g. `http://127.0.0.1:3000/v1/calculate-interest?balance=20000`

#### Interest calculation rules

    < £1,000            1%
    £1,000 < £5,000     1.5%
    £5,000 < £10,000    2%
    £10,000 < £50,000   2.5%
    £50,000+            3%

## Deploy to AWS

Install dependencies.

`npm ci`

Build the project and run tests.

`npm run build`

`npm run build-webpack`

`npm test`

You will need to bootstrap CDK, if running for the first time:

`cdk bootstrap`

Deploy resources:

`cdk deploy`

Resources will be deployed in `eu-west-2` (London region)

**To remove resources**

`cdk destroy`

> Make sure AWS Credentials are setup before running these steps.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
