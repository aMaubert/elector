import {ElectionState, IElection} from "@/definitions";

const election1 = {
  id: 0,
  name : 'election 1',
  state: ElectionState.Vote,
  candidates: [
    {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
    {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
    {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
  ],
  votes: []
} as IElection;

const election2 = {
  id: 1,
  name : 'election 2',
  state: ElectionState.Applications,
  candidates: [
    {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
    {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
    {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
  ],
  votes: []
} as IElection;


const election3 = {
  id: 2,
  name : 'election 3',
  state: ElectionState.Finished,
  candidates: [
    {address: '0x123434567823456728', firstName: 'Paul', lastName: 'pote'},
    {address: '0x084939874893795724', firstName: 'Michel', lastName: 'Obama'},
    {address: '0x048394820980449890', firstName: 'Jackie', lastName: 'Le Rookie'},
  ],
  votes: []
} as IElection;

export const mockElections = [election1, election2, election3];
