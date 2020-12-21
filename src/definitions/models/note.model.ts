import {ICandidate} from "@/definitions/models/candidate.model";
import {EthereumAddress} from '@/definitions';


export interface INote {
  candidate: ICandidate | EthereumAddress;
  value: number;
}
