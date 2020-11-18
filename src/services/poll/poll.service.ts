import {EthereumProvider} from '@/services';
import { Contract } from 'web3-eth-contract';
import abi from '@/abi/Poll.json';

//TODO add inverse of control to load the services in a containerManager before launch the front server
//TODO only this can have a real singleton pattern for this service
//TODO should implement interface IPollService
class PollService {

  private static pollContract: Contract | undefined = undefined;

  private static async providerInstance(): Promise<Contract> {
    if( this.pollContract === undefined) {
      const provider = await EthereumProvider.getInstance();
      if( !provider ) {
        throw Error('error provider not instanciated');
      }

      this.pollContract = new provider.eth.Contract(abi.abi as any , process.env.VUE_APP_POLL_CONTRACT_ADDRESS);
    }
    return this.pollContract;
  }

  public async pingTest(): Promise<string> {
    const pollContract = await PollService.providerInstance();
    return pollContract.methods.pingTest().call() as string;
  }
}

export const pollService = new PollService();
