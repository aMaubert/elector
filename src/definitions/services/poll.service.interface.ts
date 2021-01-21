import {IEthereumService} from '@/definitions/services/ethereum.service.interface';
import {ICandidate, IElection, IMedianAndAverageNote, IVote} from '@/definitions';

export interface IPollService extends IEthereumService {
  pingTest(): Promise<string>;
  createElection(electionName: string): Promise<boolean>;
  nextStep(electionId: number): Promise<boolean>;
  fetchElectionMsgSenderHasVoted(): Promise<IElection[]>;
  fetchElectionByName(name: string): Promise<IElection | undefined>;
  vote(electionId: number, vote: IVote): Promise<boolean>;
  createCandidate(electionId: number, firstName: string, lastName: string): Promise<boolean>;
  fetchAllCandidates(electionId: number): Promise<ICandidate[]>;
  fetchAllVotes(electionId: number): Promise<IVote[]>;
  fetchElectionMsgSenderHasVoted(): Promise<IElection[]>;
  fetchMedianAndAverageNotesByElectionId(electionId: number): Promise<IMedianAndAverageNote[]>;

}
