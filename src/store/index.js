const counterModule = {
  namespaced: true, // seperates it from the root state in case of name clashes, you then have to used the assigned state
  // modules can help seperate your code to make it leaner
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    increment(state) {
      state.counter += 1;
    },
    increaseBy(state, amount) {
      state.counter += amount.value; // amoubnt is an object it is sent by the action
    },
  },
  actions: {
    increase(context, value) {
      // gets context automatically
      // can recieve payload
      setTimeout(function () {
        context.commit({
          type: 'increaseBy',
          value, //love this function
        });
      }, 300);
    },
  },
  getters: {
    finalCounter(state) {
      return state.counter * 2;
    },
  },
};
// application wide data
const store = createStore({
  modules: {
    numbers: counterModule,
  },
  state() {
    return {
      counter: 0,
      isLoggedIn: false,
    };
  },
  mutations: {
    setAuth(state, value) {
      console.log('setting value');
      console.log(value.value);
      state.isLoggedIn = value.value; // got to access whats being sent
    },
  },
  actions: {
    login(context) {
      context.commit({
        type: 'setAuth',
        value: true,
      });
    },
    logout(context) {
      console.log('logging out');
      context.commit({
        type: 'setAuth',
        value: false,
      });
    },
  },
  getters: {
    getAuth(state) {
      return state.isLoggedIn;
    },
  },
});
export default { store };
