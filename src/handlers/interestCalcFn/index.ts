
import InterestCalc = require('../../lib/interestCalc');

export const handler = async (event: any): Promise<any> => {

  try {

    if (!event.queryStringParameters || !event.queryStringParameters.balance) {
      throw 'Balance amount is required to calculate the interest';
    }

    const interest = new InterestCalc(event.queryStringParameters.balance).getInterest();

    return {
      statusCode: 200,
      body: JSON.stringify({
        interest
      })
    }
  }
  catch (e) {
    return {
      statusCode: 400,
      body: e.message || e
    }
  }

};