
export interface ICoderService<T> {
  //TODO change any
  decodeList(input: string[][]): T[] ;
  decode(input: any): T;
}
