import { ActionTree, Module, MutationTree } from 'vuex';

import persister, {
  assertSucceeded,
  IndexItem as PersisterIndexItem,
} from '@/persister';

export interface State {
  index: Array<IndexItem>;
}

export type IndexItem = PersisterIndexItem;

const mutations: MutationTree<State> = {
  set(state, { index }: { index: Array<IndexItem> }) {
    state.index = index;
  },
};

const actions: ActionTree<State, {}> = {
  async index({ commit }) {
    const response = await persister.examples.getIndex();
    assertSucceeded(response);
    const data = await response.json();
    commit('set', { index: data });
  },
};

const examples: Module<State, {}> = {
  namespaced: true,
  state: {
    index: [],
  },
  actions,
  mutations,
};

export default examples;
