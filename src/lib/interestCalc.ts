
/**
 * Upper interest band.
 */
const upperInsterestBand: { min: number, percentage: number } = {
  min: 50000,
  percentage: 3
};

/**
 * Interest bands.
 */
const interestBands: Array<{ max: number, percentage: number }> = [
  {
    max: 999,
    percentage: 1
  },
  {
    max: 4900,
    percentage: 1.5
  },
  {
    max: 9999,
    percentage: 2
  },
  {
    max: 49999,
    percentage: 2.5
  }
];

/**
 * Provide method to get interest.
 *
 * @class InterestCalc
 */
export = class InterestCalc {

  balance: Number;
  percentage: Number;

  /**
   *Creates an instance of InterestCalc.
   * @param {number} balance
   * @memberof InterestCalc
   */
  constructor(balance: number) {

    if (!balance || isNaN(balance) || balance < 0) {
      throw 'Provided balance is not a valid number';
    }

    this.balance = balance;
  }

  /**
   * Calculate and return interest for the given balance based on the interest bands.
   *
   * @returns
   * @memberof InterestCalc
   */
  getInterest() {

    if (this.balance >= upperInsterestBand.min) {
      this.percentage = upperInsterestBand.percentage;
    }
    else {

      for (let band of interestBands) {

        if (this.balance <= band.max) {
          this.percentage = band.percentage;
          break;
        }
      }
    }

    return ((<number>this.balance / 100) * <number>this.percentage).toFixed(2);
  }
}