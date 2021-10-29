/** 获取某缓存文件Path
 *
 * @param cacheName 缓存文件名
 * @returns 路径(string)
 */
declare const getXXFullPath: (cacheName: string) => string;
/** 获取某缓存文件Raw数据
 *
 * 采用require()方式拿取文件
 *
 * @param cacheName 缓存文件名
 * @returns 原始文件(文本形式)
 */
declare const getRawCacheData: (cacheName: string) => any;
/** 写入缓存
 *
 * @param cacheName 缓存文件名
 * @param data 要写入的数据
 * @returns Promise
 */
declare const toRewriteCacheData: (cacheName: string, data: any) => Promise<unknown>;

declare type TypeBranchMap = {
    targetGit: string;
    map: {
        localBranch: string;
        targetBranch: string;
    }[];
};
declare class BranchMap {
    private static raw;
    private static write;
    static getRaw(): TypeBranchMap[];
    static insertOrUpdate(targetGit: string, localBranch: string, targetBranch: string): Promise<boolean | undefined>;
    static getTargetBranch(targetGit: string, localBranch: string): string | false;
}

export { BranchMap, TypeBranchMap, getRawCacheData, getXXFullPath, toRewriteCacheData };
