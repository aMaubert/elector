import { Contract } from 'web3-eth-contract';
import abi from '@/abi/Poll.json';
import {IPollService} from '@/definitions';
import {EthereumService} from '@/services/poll/ethereum.service';

//TODO add inverse of control to load the services in a containerManager before launch the front server
//TODO only this can have a real singleton pattern for this service
//TODO should implement interface IPollService
class PollService extends EthereumService implements IPollService {

  private static pollContract: Contract | undefined = undefined;

  private static async getInstance(): Promise<Contract> {
    if( this.pollContract === undefined) {
      const provider = await this.getProviderInstance();
      this.pollContract = new provider.eth.Contract(abi.abi as any , process.env.VUE_APP_POLL_CONTRACT_ADDRESS);
    }
    return this.pollContract;
  }

  public async pingTest(): Promise<string> {
    const pollContract = await PollService.getInstance();
    return pollContract.methods.pingTest().call() as string;
  }

}

export const pollService = new PollService();
