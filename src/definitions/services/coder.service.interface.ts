import {Modules as web3} from 'web3';

export interface ICoderService<T> {
  //TODO change any
  decodeList(input: string[][]): T[] ;
  decode(input: any): T;
}
