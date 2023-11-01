// vuex/store.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    message: 'null',
    messageType: 'success',
  },
  mutations: {
    setMessage(state, { message, type }) {
      state.message = message;
      state.messageType = type;
    },
    clearMessage(state) {
      state.message = null;
      state.messageType = null;
    },
  },
});
