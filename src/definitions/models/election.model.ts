import {ElectionState} from '@/definitions/enums';
import {ICandidate} from '@/definitions/models/candidate.model';


export interface IElection {
  name: string;
  state: ElectionState;
  candidates: ICandidate[];
}
