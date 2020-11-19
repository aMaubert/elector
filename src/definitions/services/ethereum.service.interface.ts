export interface IEthereumService {
  getAccounts(): Promise<string[]>;
  getBalance(address: string): Promise<string>;
  getTransactionCount(address: string): Promise<number>;
}
