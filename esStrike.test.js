import {Turno} from './main.js';

describe('prueba de strike()', () => {
  const test = new Turno(10, 0, 0, 10);

  // First test. Expected result = true
  test.tiro1 = 10;
  test.tiro2 = 0;

  test('Debe de regresar un true', () => {
    expect(test.esStrike()).toBe(true);
  });

  // Second test. Expected result = false
  test.tiro1 = 9;
  test.tiro2 = 1;

  test('Debe de regresar un false', () => {
    expect(test.esStrike()).toBe(false);
  });

  // Third test. Expected result = false
  test.tiro1 = 2;
  test.tiro2 = 2;

  test('Debe de regresar un false', () => {
    expect(test.esStrike()).toBe(false);
  });
});
