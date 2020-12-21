import {AbstractCoder} from "@/services/utils/abstract-coder.service";
import {ICoderService, INote, IVote} from "@/definitions";


class VotesCoderService extends AbstractCoder<IVote>
                        implements ICoderService<IVote> {
  public decode(input: any): IVote {
    return {} as IVote;
  }
  public decodeList(input: any[][]): IVote[] {
    const voters = input[0];
    const candidateAddresses = input[1];
    const notes = input[2];


    if( !Array.isArray(voters) || !Array.isArray(candidateAddresses) || !Array.isArray(notes) ||
      (candidateAddresses.length / voters.length)  !== (notes.length / voters.length) )  {
      throw new Error(`Can't decode this as a vote list ${input}`);
    }

    const candidatesCount = candidateAddresses.length / voters.length;

    console.log({decodeList: input});
    console.log({candidatesCount});
    const votes: IVote[] = [];
    for(let i = 0; i < voters.length; i++) {
      let ballot: INote[] = [];

      for(let j = 0; j < candidatesCount; j++) {
        const candidate = candidateAddresses[(i * candidatesCount) + j];
        const note = parseInt(notes[(i * candidatesCount) + j], 10);
        ballot.push({candidate, value: note });
      }

      votes.push({voter: voters[i], ballot});
    }
    return votes;
  }
}

export const votesCoderService = new VotesCoderService();
