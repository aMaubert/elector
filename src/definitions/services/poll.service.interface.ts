import {IEthereumService} from '@/definitions/services/ethereum.service.interface';
import {IElection} from '@/definitions';

export interface IPollService extends IEthereumService {
  pingTest(): Promise<string>;
  createElection(election: IElection): Promise<boolean>;
  nextStep(electionName: string): Promise<boolean>;
}
