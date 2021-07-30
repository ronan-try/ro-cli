import * as fs from 'fs';
import * as path from 'path';

const CACHE_FILE_EXIT = '.cache.json';

export const getXXFullPath = (cacheName: string) => {
  const _path = path.resolve(__dirname, '../local/' + cacheName + CACHE_FILE_EXIT);
  if (fs.existsSync(_path)) {
    return _path;
  }

  fs.writeFileSync(_path, JSON.stringify([]));
  return _path;
};

export const getRawCacheData = (cacheName: string) => require(getXXFullPath(cacheName));

export const toRewriteCacheData = (cacheName: string, data: any) => new Promise(resolve => {
  fs.writeFile(getXXFullPath(cacheName), JSON.stringify(data), err => {
    if (err) throw err;

    resolve(true);
  })
})
