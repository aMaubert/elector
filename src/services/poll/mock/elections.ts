import {ElectionState, IElection} from "@/definitions";

const election1 = {
  name : 'election 1',
  state: ElectionState.Vote,
  candidates: [
    {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
    {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
    {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
  ],
} as IElection;

const election2 = {
  name : 'election 2',
  state: ElectionState.Applications,
  candidates: [
    {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
    {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
    {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
  ],
} as IElection;


const election3 = {
  name : 'election 3',
  state: ElectionState.Finished,
  candidates: [
    {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
    {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
    {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
  ],
} as IElection;

export const mockElections = [election1, election2, election3];
