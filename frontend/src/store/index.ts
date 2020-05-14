import Vue from 'vue';
import Vuex from 'vuex';

import examples from './modules/examples';

Vue.use(Vuex);

const state = {};

export default new Vuex.Store({
  state,
  mutations: {
  },
  actions: {
  },
  modules: {
    examples,
  },
});
