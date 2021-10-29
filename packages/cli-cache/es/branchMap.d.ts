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

export { BranchMap, TypeBranchMap };
