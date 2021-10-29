import * as fs from 'fs';
import * as path from 'path';

const CACHE_FILE_EXIT = '.cache.json';

/** 获取某缓存文件Path
 * 
 * @param cacheName 缓存文件名
 * @returns 路径(string)
 */
export const getXXFullPath = (cacheName: string) => {
  const _path = path.resolve(__dirname, '../local/' + cacheName + CACHE_FILE_EXIT);
  if (fs.existsSync(_path)) {
    return _path;
  }

  fs.writeFileSync(_path, JSON.stringify([]));
  return _path;
};

/** 获取某缓存文件Raw数据
 * 
 * 采用require()方式拿取文件
 * 
 * @param cacheName 缓存文件名
 * @returns 原始文件(文本形式)
 */
export const getRawCacheData = (cacheName: string) => require(getXXFullPath(cacheName));

/** 写入缓存
 * 
 * @param cacheName 缓存文件名
 * @param data 要写入的数据
 * @returns Promise
 */
export const toRewriteCacheData = (cacheName: string, data: any) => new Promise(resolve => {
  fs.writeFile(getXXFullPath(cacheName), JSON.stringify(data), err => {
    if (err) throw err;

    resolve(true);
  })
})
