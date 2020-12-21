import {AbstractCoder} from './abstract-coder.service';
import {ICandidate, ICoderService} from '@/definitions';


class CandidateCoderService extends AbstractCoder<ICandidate>
                            implements ICoderService<ICandidate> {
  public decode(input: any): ICandidate {
    const [address, lastName, firstName] = input;
    return {address, lastName, firstName} as ICandidate;
  }
}

export const candidateCoderService = new CandidateCoderService();
