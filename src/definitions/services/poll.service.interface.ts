import {IEthereumService} from '@/definitions/services/ethereum.service.interface';
import {IElection} from '@/definitions';

export interface IPollService extends IEthereumService {
  pingTest(): Promise<string>;
  createElection(electionName: string): Promise<boolean>;
  nextStep(electionId: number): Promise<boolean>;
}
