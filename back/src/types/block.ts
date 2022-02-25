export interface MoonbeamBlock {
    number: number;
    hash: string;
    miner: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    baseFeePerGas?: number;
    transactions: string[];
    createdAt: Date;
}