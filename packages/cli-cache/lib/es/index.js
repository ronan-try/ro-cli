import * as fs from 'fs';
import * as path from 'path';

const CACHE_FILE_EXIT = '.cache.json';
const getXXFullPath = cacheName => {
  const _path = path.resolve(__dirname, '../local/' + cacheName + CACHE_FILE_EXIT);

  if (fs.existsSync(_path)) {
    return _path;
  }

  fs.writeFileSync(_path, JSON.stringify([]));
  return _path;
};
const getRawCacheData = cacheName => require(getXXFullPath(cacheName));
const toRewriteCacheData = (cacheName, data) => new Promise(resolve => {
  fs.writeFile(getXXFullPath(cacheName), JSON.stringify(data), err => {
    if (err) throw err;
    resolve(true);
  });
});

export { getRawCacheData, getXXFullPath, toRewriteCacheData };
