const { expect, test } = require('@jest/globals');
const data = require('./data');
const { extractOperation } = require('./src/utils/index.js');
const CountOperation = require('./src/states/CountOperation');
const FilterOperation = require('./src/states/FilterOperation');


describe('extractOperation', () => {
  test('should extract operation and pattern from a string with "="', () => {
    const operation = '--filter=ry';
    const [operationType, pattern] = extractOperation(operation);
    expect(operationType).toBe('--filter');
    expect(pattern).toBe('ry');
  });

  test('should extract operation and pattern from a string with spaces', () => {
    const operation = '--filter ry';
    const [operationType, pattern] = extractOperation(operation);
    expect(operationType).toBe('--filter');
    expect(pattern).toBe('ry');
  });

  test('should throw an error for an invalid operation format', () => {
    const invalidOperation = 123;
    expect(() => extractOperation(invalidOperation)).toThrow('Invalid operation format');
  });
});

describe('FilterOperation', () => {
  let filterOperation;

  beforeEach(() => {
    filterOperation = new FilterOperation();
  });

  test('should filter animals by name case-insensitively', () => {
    const params = 'ry';
    const expectedOutput = [
      {
        name: 'Uzuzozne',
        people: [
          {
            name: 'Lillie Abbott',
            animals: [
              {
                name: 'John Dory'
              }
            ]
          }
        ]
      },
      {
        name: 'Satanwi',
        people: [
          {
            name: 'Anthony Bruno',
            animals: [
              {
                name: 'Oryx'
              }
            ]
          }
        ]
      }
    ];

    const result = filterOperation.execute(data.data, params);
    expect(result).toEqual(expectedOutput);
  });

  test('should return null when no matches are found', () => {
    const params = 'zebraXX';
    const result = filterOperation.execute(data.data, params);
    expect(result).toBeNull();
  });

  test('should throw error when search parameter is empty', () => {
    const params = '';
    expect(() => {
      filterOperation.execute(data.data, params);
    }).toThrow(new Error('Filter operation failed: Invalid filter parameter'));
  });

  test('should throw error when search parameter is undefined', () => {
    expect(() => {
      filterOperation.execute(data.data, undefined);
    }).toThrow(new Error('Filter operation failed: Invalid filter parameter'));
  });
});

describe('CountOperation', () => {
  let countOperation;

  beforeEach(() => {
    countOperation = new CountOperation();
  });

  test('should correctly count animals for each person and people for each country', () => {
    const result = countOperation.execute(data.data);
    result.forEach(country => {
      expect(Number(country.name[country.name.length - 2])).toEqual(country.people.length);
  
      country.people.forEach(person => {
        expect(Number(person.name[person.name.length - 2])).toEqual(person.animals.length);
      });
    });
  });

  test('should handle empty arrays', () => {
    const inputData = [{
      name: 'Dillauti',
      people: []
    }];

    const expectedOutput = [
      {
        name: 'Dillauti [0]',
        people: []
      }
    ];

    const result = countOperation.execute(inputData);
    expect(result).toEqual(expectedOutput);
  });

  test('should handle empty animals array', () => {
    const inputData = [{
      name: 'Dillauti',
      people: [
        {
          name: 'Winifred Graham',
          animals: []
        }
      ]
    }];

    const expectedOutput = [
      {
        name: 'Dillauti [1]',
        people: [
          {
            name: 'Winifred Graham [0]',
            animals: []
          }
        ]
      }
    ];

    const result = countOperation.execute(inputData);
    expect(result).toEqual(expectedOutput);
  });
});
