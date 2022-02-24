import Web3 from 'web3';
import { Eth } from 'web3-eth';


class BlcokChain {
    private web3: Web3;
    private eth: Eth;

    constructor() {
        this.web3 = new Web3('http://localhost:9933')
        // this.web3 = new Web3('https://rpc.api.moonbase.moonbeam.network')
        this.eth = this.web3.eth;
    }
    getEth() {
        return this.eth;
    }
    getWeb3() {
        return this.web3;
    }
}
const blockChainInstace = new BlcokChain();

export const ethereum = blockChainInstace.getEth();
export const web3 = blockChainInstace.getWeb3();
