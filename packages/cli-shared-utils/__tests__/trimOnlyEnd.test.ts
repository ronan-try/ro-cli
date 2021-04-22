import { trimOnlyEnd } from '../src/trimOnlyEnd';

test('jsjs.js => jsjs', () => {
  const result = trimOnlyEnd('jsjs.js', '.js');
  expect(result).toBe('jsjs');
});

test('jsjs.js.js => jsjs.js', () => {
  const result = trimOnlyEnd('jsjs.js.js', '.js');
  expect(result).toBe('jsjs.js');
});

test('js.js => js', () => {
  const result = trimOnlyEnd('js.js', '.js');
  expect(result).toBe('js');
});

test('gits.js => gits', () => {
  const result = trimOnlyEnd('gits.js', '.js');
  expect(result).toBe('gits');
});
