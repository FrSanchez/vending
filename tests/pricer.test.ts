import { it, expect, test } from '@jest/globals';
import { createPricer } from 'pricer';

function isNullOrEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

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

const simpleCases: [string, string, number][] = [
  ['large', 'non-dairy', 2.5],
  ['large', 'dairy', 2.25],
  ['large', 'none', 2.0],
  ['medium', 'non-dairy', 2.0],
  ['medium', 'dairy', 1.75],
  ['medium', 'none', 1.5],
  ['small', 'non-dairy', 1.5],
  ['small', 'dairy', 1.25],
  ['small', 'none', 1.0],
];

test.each(simpleCases)(
  'size=%s value=%s, creamer=%s value=%s → expect $%s',
  (sizeVal, creamVal, expected) => {
    const pricer = createPricer();
    pricer('size', sizeVal);
    const result = pricer('creamer', creamVal);
    expect(result).toBe(expected);
  },
);

const changeCases: [[string, string, number], [string, string, number]][] = [
  [
    ['large', 'none', 2.0],
    ['small', 'none', 1.0],
  ],
  [
    ['large', 'dairy', 2.25],
    ['small', 'dairy', 1.25],
  ],
  [
    ['large', 'dairy', 2.25],
    ['medium', 'none', 1.5],
  ],
  [
    ['medium', 'dairy', 1.75],
    ['medium', 'non-dairy', 2.0],
  ],
  [
    ['large', 'non-dairy', 2.5],
    ['small', 'dairy', 1.25],
  ],
];

test.each(changeCases)(
  'changing %s from %s to %s should update price from $%s to $%s',
  (initial, change) => {
    const pricer = createPricer();
    var initialPrice: number = 0;
    if (!isNullOrEmpty(initial[0])) {
      initialPrice = pricer('size', initial[0]);
    }
    if (!isNullOrEmpty(initial[1])) {
      initialPrice = pricer('creamer', initial[1]);
    }
    expect(initialPrice).toBe(initial[2]);

    var updatedPrice: number = 0;
    if (!isNullOrEmpty(change[0])) {
      updatedPrice = pricer('size', change[0]);
    }
    if (!isNullOrEmpty(change[1])) {
      updatedPrice = pricer('creamer', change[1]);
    }
    expect(updatedPrice).toBe(change[2]);
  },
);
