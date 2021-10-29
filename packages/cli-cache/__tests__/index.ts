import { getRawCacheData } from '../index'

test('getRawCacheData:projects.cache.json', () => {
  const source = getRawCacheData('projects')

  expect(Array.isArray(source)).toBe(true)
});

test('读取branchMap缓存文件', () => {
  const source = getRawCacheData('branchMap');

  console.log(typeof source, Object.prototype.toString.call(source));

  expect(Array.isArray(source)).toBe(true);
});
