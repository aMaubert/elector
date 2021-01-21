import {EthereumAddress, Level} from '@/definitions';


export interface IMedianAndAverageNote {
  name: string;
  firstName: string;
  address: EthereumAddress;
  medianNote: number;
  averageNote: number;

  level?: Level;
}
