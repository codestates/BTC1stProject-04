export interface MoonbeamTransaction {
    blockNumber: number | null,
    hash: string,
    from: string,
    to: string | null,
    value: string,
    gasPrice: string,
    createdAt: Date,
}