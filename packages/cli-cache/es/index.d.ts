declare const getXXFullPath: (cacheName: string) => string;
declare const getRawCacheData: (cacheName: string) => any;
declare const toRewriteCacheData: (cacheName: string, data: any) => Promise<unknown>;

export { getRawCacheData, getXXFullPath, toRewriteCacheData };
