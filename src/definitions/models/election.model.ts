import {ElectionState} from '@/definitions/enums';
import {ICandidate} from '@/definitions/models/candidate.model';
import {IVote} from '@/definitions';


export interface IElection {
  name: string;
  state: ElectionState;
  candidates: ICandidate[];
  votes: IVote[];
}
