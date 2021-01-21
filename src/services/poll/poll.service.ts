import {Contract} from 'web3-eth-contract';
import abi from '@/abi/Poll.json';
import {
  ElectionState,
  EthereumAddress,
  ICandidate,
  IElection, IMedianAndAverageNote,
  IPollService,
  IVote
} from '@/definitions';
import {EthereumService} from '@/services/poll/ethereum.service';
import {mockElections} from '@/services/poll/mock';
import {candidateCoderService, electionCoderService, votesCoderService, medianAndAverageNoteCoderService} from '@/services/utils';


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

  private async currentAccount(): Promise<EthereumAddress> {
    const accounts = await this.getAccounts();
    return accounts[0];
  }

  public async fetchAllElections(): Promise<IElection[]> {
    try{
      const pollContract = await PollService.getInstance();
      const currentAccount = await this.currentAccount();
      const electionsContracts = await pollContract.methods.allElections().call({from: currentAccount});
      return electionCoderService.decodeList(electionsContracts);
    } catch (error) {
      console.error({error});
      return [];
    }
  }

  public async fetchElectionByName(name: string): Promise<IElection | undefined> {
    return elections.find((election: IElection) => election.name === name);
  }

  public async vote(electionId: number, vote: IVote): Promise<boolean> {
    const addresses: string[] = [];
    const notes : number[] = [];
    vote.ballot.forEach(each => {
      addresses.push((each.candidate as ICandidate).address);
      notes.push(each.value);
    });

    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const transaction = await pollContract.methods.addVote(electionId,addresses,  notes).send({from: currentAccount});

    return transaction.status;
    // const electionFound = elections.findIndex((election: IElection) => election.name === electionName);
    // if(!electionFound) return null;
    // //todo implement
    // const election = elections[electionFound] as IElection;
    // election.votes.push(vote);
    // return election;

  }

  public async createCandidate(electionId: number, firstName: string, lastName: string): Promise<boolean> {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const transaction = await pollContract.methods.addCandidate(electionId, lastName, firstName).send({from: currentAccount});
    console.log({transaction});
    return transaction.status;
  }

  public async createElection(electionName: string): Promise<boolean> {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const created = await pollContract.methods.createElection(electionName).send({from : currentAccount});
    console.log({created});
    return true;
  }

  public async fetchAllCandidates(electionId: number): Promise<ICandidate[]> {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const candidatesToDecode = await pollContract.methods.allCandidatesByElectionID(electionId).call({from : currentAccount});
    return candidateCoderService.decodeList(candidatesToDecode);
  }

  public async nextStep(electionId: number): Promise<boolean> {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const transaction = await pollContract.methods.nextStep(electionId).send({from : currentAccount});
    return transaction.status;

  }

  public async fetchAllVotes(electionId: number): Promise<IVote[]> {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const votesToDecode = await pollContract.methods.allVotesByElectionID(electionId).call({from : currentAccount});
    return votesCoderService.decodeList(votesToDecode);
  }

  public async fetchElectionMsgSenderHasVoted(): Promise<IElection[]> {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const electionsToDecode = await pollContract.methods.fetchElectionMsgSenderHasVoted().call({from: currentAccount});
    return electionCoderService.decodeList(electionsToDecode);
  }

  public async fetchMedianAndAverageNotesByElectionId(electionId: number): Promise<IMedianAndAverageNote[]> {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const MedianAndAverageNotesToDecode = await pollContract.methods.fetchMedianCandidates(electionId).call({from: currentAccount});
    console.log({MedianAndAverageNotesToDecode});
    return medianAndAverageNoteCoderService.decodeList(MedianAndAverageNotesToDecode);

  }

  public async fetchElectionById(electionId: number): Promise<IElection>  {
    const pollContract = await PollService.getInstance();
    const currentAccount = await this.currentAccount();
    const electionToDecode = await pollContract.methods.fetchElectionByID(electionId).call({from: currentAccount});
    return electionCoderService.decode(PollService.destructResult(electionToDecode));
  }

  private static destructResult(result : any): any[] {
    let fieldCount = 0;
    while (result[fieldCount] !== undefined) {
      fieldCount++;
    }
    if(fieldCount === 0) throw new Error('How can you parse this ? : ' + result);
    const object = [];
    for( let i = 0; i < fieldCount; i++) {
      object.push(result[i]);
    }
    return object;
  }

}

export const pollService = new PollService();
