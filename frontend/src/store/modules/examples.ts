import { ActionTree, Module, MutationTree } from 'vuex';

import persister, { assertSucceeded } from '@/persister';

export interface State {
  index: Array<IndexItem>;
}

export interface IndexItem {
  id: string;
  title: string;
  url: string;
}

interface IndexResponse {
  pk: string;
  fields: {
    title: string;
    url: string;
  };
}

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
    const conv = (d: IndexResponse) => ({ id: d.pk, ...d.fields });
    commit('set', { index: data.map(conv) });
  },
};

const disclosedWorld: Module<State, {}> = {
  namespaced: true,
  state: {
    index: [],
  },
  actions,
  mutations,
};

export default disclosedWorld;
