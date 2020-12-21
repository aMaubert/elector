

export abstract class AbstractCoder<T>  {

  public decodeList(input: any[][]): T[] {
    let fieldCount = 0;
    while (input[fieldCount] !== undefined) {
      if( (fieldCount > 1 && input[fieldCount].length !== input[fieldCount - 1].length) ||
          !Array.isArray(input[fieldCount]) )
        throw new Error('How can you parse this ? : ' + input);
      fieldCount++;
    }
    if(fieldCount === 0) throw new Error('How can you parse this ? : ' + input);

    const ret: T[] = [];
    for(let index = 0; index < input[0].length; index++) {
      const object = [];
      for( let i = 0; i < fieldCount; i++) {
        object.push(input[i][index]);
      }
      ret.push(this.decode(object));
    }

    return ret;
  }

  public abstract decode(input: any): T ;
}
