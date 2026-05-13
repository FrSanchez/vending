import { it, expect, test } from '@jest/globals';
import { createPricer } from 'pricer';

it('provides the latest price given the options selected so far', () => {
  // starting a coffee order
  const pricer = createPricer();

  // set the default options
  pricer('size', 'small');
  const defaultPrice = pricer('creamer', 'none');
  expect(defaultPrice).toBe(1.0);

  // user selects dairy creamer
  const priceAfterFirstSelection = pricer('creamer', 'dairy');
  expect(priceAfterFirstSelection).toBe(1.25);

  // user selects non-dairy creamer
  const priceAfterSecondSelection = pricer('creamer', 'non-dairy');
  expect(priceAfterSecondSelection).toBe(1.5);

  // user selects large
  const priceAfterThirdSelection = pricer('size', 'large');
  expect(priceAfterThirdSelection).toBe(2.5);
});

const cases: [string, string, string, string, number][] = [
  ['size', 'large', 'creamer', 'non-dairy', 2.5],
  ['size', 'large', 'creamer', 'dairy', 2.25],
  ['size', 'large', 'creamer', 'none', 2.0],
  ['size', 'medium', 'creamer', 'non-dairy', 2.0],
  ['size', 'medium', 'creamer', 'dairy', 1.75],
  ['size', 'medium', 'creamer', 'none', 1.5],
  ['size', 'small', 'creamer', 'non-dairy', 1.5],
  ['size', 'small', 'creamer', 'dairy', 1.25],
  ['size', 'small', 'creamer', 'none', 1.0],
];

test.each(cases)(
  'size=%s value=%s, creamer=%s value=%s → expect $%s',
  (sizeKey, sizeVal, creamKey, creamVal, expected) => {
    const pricer = createPricer();
    pricer(sizeKey, sizeVal);
    const result = pricer(creamKey, creamVal);
    expect(result).toBe(expected);
  },
);
