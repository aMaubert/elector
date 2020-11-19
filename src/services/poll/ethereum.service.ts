import {IEthereumService} from '@/definitions';
import Web3 from 'web3';
import {EthereumProvider} from '@/services';


export class EthereumService implements IEthereumService {

  private static providerInstance: Web3 | undefined = undefined;

  protected static async getProviderInstance(): Promise<Web3> {
    if( this.providerInstance === undefined) {
      console.log('call EthereumProvider.getInstance() : ' );
      this.providerInstance = await EthereumProvider.getInstance();
      if( !this.providerInstance ) {
        throw Error('error provider not instanciated');
      }
    }
    return this.providerInstance;
  }

  public async getAccounts(): Promise<string[]> {
    const provider = await EthereumService.getProviderInstance();
    return provider.eth.getAccounts();
  }
  public async getBalance(address: string): Promise<string> {
    const provider = await EthereumService.getProviderInstance();
    const balance = await provider.eth.getBalance(address);
    return provider.utils.fromWei(balance, 'ether');
  }
  public async getTransactionCount(address: string): Promise<number> {
    const provider = await EthereumService.getProviderInstance();
    return provider.eth.getTransactionCount(address);
  }

}
