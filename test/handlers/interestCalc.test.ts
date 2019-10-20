import interestCalcFn = require('../../src/handlers/interestCalcFn');

test('Should calculate 1% interest if amount is less 1000', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {
      balance: '100'
    }
  });

  expect(resp).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      interest: '1.00'
    })
  });
});

test('Should calculate 1.5% interest for £1000 < £5000', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {
      balance: '1000'
    }
  });

  expect(resp).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      interest: '15.00'
    })
  });
});

test('Should calculate 2% interest for £5000 < £10000', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {
      balance: '5000'
    }
  });

  expect(resp).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      interest: '100.00'
    })
  });
});

test('Should calculate 2.5% interest for £10000 < £50000', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {
      balance: '10000'
    }
  });

  expect(resp).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      interest: '250.00'
    })
  });
});

test('Should calculate 3% interest for £50000+', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {
      balance: '50000'
    }
  });

  expect(resp).toMatchObject({
    statusCode: 200,
    body: JSON.stringify({
      interest: '1500.00'
    })
  });
});

test('Should fail if balance is not a valid number', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {
      balance: 'test'
    }
  });

  expect(resp).toMatchObject({
    statusCode: 400,
    body: 'Provided balance is not a valid number'
  });
});

test('Should fail if balance is negative number', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {
      balance: -1
    }
  });

  expect(resp).toMatchObject({
    statusCode: 400,
    body: 'Provided balance is not a valid number'
  });
});

test('Should fail if provided event is invalid', async () => {
  const resp = await interestCalcFn.handler({});
  expect(resp).toMatchObject({
    statusCode: 400,
    body: 'Balance amount is required to calculate the interest'
  });
});

test('Should fail if provided event query params do not contain balance property', async () => {
  const resp = await interestCalcFn.handler({
    queryStringParameters: {}
  });
  expect(resp).toMatchObject({
    statusCode: 400,
    body: 'Balance amount is required to calculate the interest'
  });
});