import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      inEditing:false,
    user: JSON.parse(sessionStorage.getItem("user")) || {
      userId: '',
      username: '',
  },
    team: JSON.parse(sessionStorage.getItem("team")) || {
      teamId: '',
      teamname: '',
  },
  },
  mutations: {
      enterEditing(){
          state.inEditing = true;
      },
      exitEditing(){
          state.inEditing = false;
      },
    $_setuser(state, value) {

      sessionStorage.setItem('user', JSON.stringify(value))
      state.user = value
    },
    $_removeuser(state) {

      sessionStorage.removeItem('user')
      state.user = null
    },

    $_setteam(state, value) {

      sessionStorage.setItem('team', JSON.stringify(value))
      state.team = value
    },
    $_removeteam(state) {

      sessionStorage.removeItem('team')
      state.team = null
    },
  },
  actions: {

          saveuser({ commit }, data) {
            commit('$_setuser', data)
        },
 
        clearuser({ commit }) {
            commit('$_removeuser');
        },

        saveteam({ commit }, data) {
          commit('$_setteam', data)
      },

      clearteam({ commit }) {
          commit('$_removeteam');
      },
  },
})
