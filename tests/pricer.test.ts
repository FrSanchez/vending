import { it, expect, test, describe } from '@jest/globals';
import { createPricer } from 'pricer';

describe('pricer', () => {
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

  const invalidCases: [string | null, string | null][] = [
    ['foo', 'bar'],
    ['', ''],
    [null, null],
  ];

  test.each(invalidCases)(
    '(sanity check) category=%s option=%s',
    (category, option) => {
      const pricer = createPricer();
      const price = pricer(category, option);
      expect(price).toBe(0);
    },
  );

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
    'size=%s, creamer=%s -> expect $%s',
    (sizeVal, creamVal, expected) => {
      const pricer = createPricer();
      pricer('size', sizeVal);
      const result = pricer('creamer', creamVal);
      expect(result).toBe(expected);
    },
  );

  const simpleCasesWithCreamer: [string, string, number][] = [
    ['non-dairy', 'large', 2.5],
    ['dairy', 'large', 2.25],
    ['none', 'large', 2.0],
    ['non-dairy', 'medium', 2.0],
    ['dairy', 'medium', 1.75],
    ['none', 'medium', 1.5],
    ['non-dairy', 'small', 1.5],
    ['dairy', 'small', 1.25],
    ['none', 'small', 1.0],
  ];

  test.each(simpleCasesWithCreamer)(
    'creamer=%s, size=%s -> expect $%s',
    (creamVal, sizeVal, expected) => {
      const pricer = createPricer();
      pricer('creamer', creamVal);
      const result = pricer('size', sizeVal);
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
    [
      ['large', 'non-dairy', 2.5],
      ['large', 'non-dairy', 2.5],
    ],
    [
      ['small', 'dairy', 1.25],
      ['small', 'dairy', 1.25],
    ],
  ];

  test.each(changeCases)(
    'changing from %s to %s should update price ',
    (initial, change) => {
      const pricer = createPricer();
      pricer('size', initial[0]);
      const initialPrice = pricer('creamer', initial[1]);
      expect(initialPrice).toBe(initial[2]);

      pricer('size', change[0]);
      const updatedPrice = pricer('creamer', change[1]);
      expect(updatedPrice).toBe(change[2]);
    },
  );

  const sizeErrors: [string | number | null, string][] = [
    ['none', 'none'],
    ['dairy', 'none'],
    ['non-dairy', 'foo'],
    ['', 'none'],
    [null, 'none'],
    [123, 'none'],
  ];

  const creamerErrors: [string, string | number | null][] = [
    ['small', 'small'],
    ['medium', 'medium'],
    ['large', 'large'],
    ['small', ''],
    ['small', null],
    ['small', 123],
  ];

  test.each(sizeErrors)('(Error) size=%s, creamer=%s', (sizeVal, creamVal) => {
    const pricer = createPricer();
    expect(() => pricer('size', sizeVal)).toThrow();
  });

  test.each(creamerErrors)(
    '(Error) size=%s, creamer=%s',
    (sizeVal, creamVal) => {
      const pricer = createPricer();
      pricer('size', sizeVal);
      expect(() => pricer('creamer', creamVal)).toThrow();
    },
  );
});
