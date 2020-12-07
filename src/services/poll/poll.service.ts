import { Contract } from 'web3-eth-contract';
import abi from '@/abi/Poll.json';
import {ElectionState, EthereumAddress, ICandidate, IElection, IPollService, IVote} from '@/definitions';
import {EthereumService} from '@/services/poll/ethereum.service';
import {mockElections} from "@/services/poll/mock";


let elections = mockElections;

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
    return elections;
  }

  public async fetchElectionByName(name: string): Promise<IElection | undefined> {
    return elections.find((election: IElection) => election.name === name);
  }

  public async vote(electionName: EthereumAddress, vote: IVote): Promise<IElection | null> {
    const electionFound = elections.findIndex((election: IElection) => election.name === electionName);
    if(!electionFound) return null;
    //todo implement
    const election = elections[electionFound] as IElection;
    election.votes.push(vote);
    return election;

  }

  public async createCandidate(electionName: EthereumAddress, firstName: string, lastName: string): Promise<boolean> {
    const electionFound = elections.find((election: IElection) => election.name === electionName);
    if(!electionFound) return false;
    for( let i = 0; i < elections.length; i++ ) {
      if(elections[i].name === electionName) {
        elections[i].candidates.push({ address: firstName, firstName, lastName} as ICandidate);
        return true;
      }
    }
    return false;
  }
}

export const pollService = new PollService();
