import { getRawCacheData } from '../src/base';

test('getRawCacheData:projects.cache.json', () => {
  const source = getRawCacheData('projects')

  expect(Array.isArray(source)).toBe(true)
});

test('读取branchMap缓存文件', () => {
  const source = getRawCacheData('branchMap');

  expect(Array.isArray(source)).toBe(true);
});
