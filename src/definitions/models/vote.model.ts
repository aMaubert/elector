import {EthereumAddress} from '@/definitions/types';
import {INote} from '@/definitions/models/note.model';

export interface IVote {
  voter: EthereumAddress;
  ballot: INote[];
}
