import { ActionTree, Module, MutationTree } from 'vuex';

import persister, {
  IndexItem as PersisterIndexItem,
  PASCandidate,
} from '@/persister';

export interface CurrentExample {
  id?: number;
  title?: string;
  content?: string; // FIXME: content って何？
  pascandidates?: Array<PASCandidate>;
}

export interface State {
  index: Array<IndexItem>;
  current: CurrentExample;
}

export type IndexItem = PersisterIndexItem;

const mutations: MutationTree<State> = {
  set(state, {
    index, current,
  }: {
    index?: Array<IndexItem>;
    current?: CurrentExample;
  }) {
    state.index = index || state.index;
    state.current = current || state.current;
  },
};

const actions: ActionTree<State, {}> = {
  async list({ commit }) {
    const data = await persister.examples.list();
    commit('set', { index: data });
  },

  async retrieve({ commit }, { id }: { id: number }) {
    const data = await persister.examples.retrieve(id);
    commit('set', { current: data });
  },
};

const examples: Module<State, {}> = {
  namespaced: true,
  state: {
    index: [],
    current: {
      id: 0,
      title: '',
      content: '',
      pascandidates: [],
    },
  },
  actions,
  mutations,
};

export default examples;
