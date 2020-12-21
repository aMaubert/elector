import {ElectionState, ICoderService} from '@/definitions';
import {AbstractCoder} from "@/services/utils/abstract-coder.service";


class ElectionStateCoderService extends AbstractCoder<ElectionState>
                                implements ICoderService<ElectionState> {

  public decode(state: string): ElectionState {

    switch (parseInt(state,10)) {
      case 0:
        return ElectionState.Applications;
      case 1:
        return ElectionState.Vote;
      case 2:
        return ElectionState.Finished;
      default:
        throw new Error(`Can't decode ElectionState of ${state}`);
    }
  }

}

export const electionStateCoderService = new ElectionStateCoderService();
