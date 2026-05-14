export type Category = 'size' | 'creamer';
export type Option =
  | 'small'
  | 'medium'
  | 'large'
  | 'none'
  | 'dairy'
  | 'non-dairy';
export type Price = number;

export interface Pricer {
  /**
   * * Invoked each time the user makes a selection.
   * * No need to validate arguments, the caller validates the arguments before this function is invoked.
   * * @returns the _total_ price of the coffee so far given all the selections made
   */

  (category: Category, option: Option): Price;
}

// simplle price map to look up the price of each option
const sizeMap: Partial<Record<Option, number>> = {
  // size options
  small: 1.0,
  medium: 1.5,
  large: 2.0,
};

const creamerMap: Partial<Record<Option, number>> = {
  // creamer options
  none: 0,
  dairy: 0.25,
  'non-dairy': 0.5,
};

/**
 * A new pricer is created for each coffee being purchased.
 */
export const createPricer = (): Pricer => {
  // keep track of the current calculated price
  const price = { size: 0, creamer: 0 };
  // your code goes here
  // instantiate and return a function to calculate price
  return (category: Category, option: Option): Price => {
    if (category == 'size') {
      if (!(option in sizeMap)) {
        throw new Error(`Invalid size option: ${option}`);
      }
      price.size = sizeMap[option];
    }
    if (category == 'creamer') {
      if (!(option in creamerMap)) {
        throw new Error(`Invalid creamer option: ${option}`);
      }
      price.creamer = creamerMap[option];
    }
    const total = price.size + price.creamer;
    if (total != total) {
      throw new Error(`Invalid price calculation: ${total}`);
    }
    return total;
  };
};
