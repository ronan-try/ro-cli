import { getRawCacheData } from '../index'

test('getRawCacheData:projects.cache.json', () => {
  const source = getRawCacheData('projects')

  console.log(source)

  expect(Array.isArray(source)).toBe(true)
});