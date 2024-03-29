'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var path__namespace = /*#__PURE__*/_interopNamespace(path);

const CACHE_FILE_EXIT = '.cache.json';
/** 获取某缓存文件Path
 *
 * @param cacheName 缓存文件名
 * @returns 路径(string)
 */

const getXXFullPath = cacheName => {
  const _path = path__namespace.resolve(__dirname, '../local/' + cacheName + CACHE_FILE_EXIT);

  if (fs__namespace.existsSync(_path)) {
    return _path;
  }

  fs__namespace.writeFileSync(_path, JSON.stringify([]));
  return _path;
};
/** 获取某缓存文件Raw数据
 *
 * 采用require()方式拿取文件
 *
 * @param cacheName 缓存文件名
 * @returns 原始文件(文本形式)
 */

const getRawCacheData = cacheName => require(getXXFullPath(cacheName));
/** 写入缓存
 *
 * @param cacheName 缓存文件名
 * @param data 要写入的数据
 * @returns Promise
 */

const toRewriteCacheData = (cacheName, data) => new Promise(resolve => {
  fs__namespace.writeFile(getXXFullPath(cacheName), JSON.stringify(data), err => {
    if (err) throw err;
    resolve(true);
  });
});

exports.getRawCacheData = getRawCacheData;
exports.getXXFullPath = getXXFullPath;
exports.toRewriteCacheData = toRewriteCacheData;
