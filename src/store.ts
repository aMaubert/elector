import {createStore} from 'vuex';
import {IAccount} from '@/definitions/models/account.model';
import {pollService} from '@/services';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence<State>({
  key:'userState',
  storage: window.localStorage
});

export interface State {
  user?: IAccount;
}

export enum ActionType {
  FETCH_CONNECTED_USER = 'fetchConnectedUser'
}

export enum MutationType {
  SET_USER = 'setUser'
}

export enum GetterType {
  GET_USER= 'getUser'
}

const store = createStore<State>({
  plugins: [vuexLocal.plugin],
  state: {
    user: undefined
  },
  actions: {
    async fetchConnectedUser({commit}) {
      const accounts =  await pollService.getAccounts();
      const user = {address: accounts[0] } as IAccount;
      commit(MutationType.SET_USER, user);
    }
  },
  mutations: {
    setUser(state: State, user: IAccount) {
      state.user = user;
    }
  },
  getters: {
    getUser: (state: State): IAccount | undefined => state.user
  }
});

export default store;

