import {AbstractCoder} from '@/services/utils/abstract-coder.service';
import {ICoderService, IMedianAndAverageNote} from '@/definitions';


class MedianAndAverageNoteCoderService extends AbstractCoder<IMedianAndAverageNote>
                                        implements ICoderService<IMedianAndAverageNote> {
  decode(input: any[]): IMedianAndAverageNote {
    console.log({input})
    const [name, firstName, address, medianNote, averageNote] = input;
    console.log({medianandAverageNote: {
        name,
        firstName,
        address,
        medianNote: medianNote/ 100,
        averageNote: averageNote / 100
      } as IMedianAndAverageNote});
    return {
      name,
      firstName,
      address,
      medianNote: medianNote/ 100,
      averageNote: averageNote / 100
    } as IMedianAndAverageNote;
  }
}

export const medianAndAverageNoteCoderService = new MedianAndAverageNoteCoderService();
