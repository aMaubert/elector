import {IEthereumService} from '@/definitions/services/ethereum.service.interface';

export interface IPollService extends IEthereumService{
  pingTest(): Promise<string>;
}
