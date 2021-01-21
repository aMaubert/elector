import {ICoderService, IElection} from '@/definitions';
import {AbstractCoder} from "@/services/utils/abstract-coder.service";
import {electionStateCoderService} from "@/services";

class ElectionCoderService extends AbstractCoder<IElection>
                           implements ICoderService<IElection> {

  public decode(input: any[]): IElection {

    const [id, name, state] = input;
    return {id: parseInt(id,10),name: name, state: electionStateCoderService.decode(state), votes: [], candidates: []} as IElection;
  }

}
export const electionCoderService = new ElectionCoderService();
