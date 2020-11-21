import { Contract } from 'web3-eth-contract';
import abi from '@/abi/Poll.json';
import {ElectionState, IElection, IPollService} from '@/definitions';
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

  public async fetchAllElections(): Promise<IElection[]> {
    const election1 = {
      name : 'election 1',
      state: ElectionState.Vote,
      candidates: [
        {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
        {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
        {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
        ],
    } as IElection;

    const election2 = {
      name : 'election 2',
      state: ElectionState.Applications,
      candidates: [
        {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
        {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
        {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
      ],
    } as IElection;

    const election3 = {
      name : 'election 3',
      state: ElectionState.Finished,
      candidates: [
        {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
        {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
        {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
      ],
    } as IElection;

    return [election1, election2, election3];
  }
}

export const pollService = new PollService();
