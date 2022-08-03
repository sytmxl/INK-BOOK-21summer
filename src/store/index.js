import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        inEditing: false,
        user: JSON.parse(sessionStorage.getItem("user")) || {
            userId: '',
            username: '',
        },
        team: JSON.parse(sessionStorage.getItem("team")) || {
            teamId: '',
            teamname: '',
        },

        searched: JSON.parse(sessionStorage.getItem("searched")) || {
            content: ''
        },
        token: JSON.parse(sessionStorage.getItem("token")) || {
            token_num: ''
        },
    },
    mutations: {
        enterEditing() {
            state.inEditing = true;
        },
        exitEditing() {
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

        $_setsearched(state, value) {

            sessionStorage.setItem('searched', JSON.stringify(value))
            state.searched = value
        },
        $_removesearched(state) {

            sessionStorage.removeItem('searched')
            state.searched = null
        },
        $_settoken(state, value) {

            sessionStorage.setItem('token', JSON.stringify(value))
            state.token = value
        },
        $_removetoken(state, value) {

            sessionStorage.removeItem('token', JSON.stringify(value))
            state.token = null
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

        savesearched({ commit }, data) {
            commit('$_setsearched', data)
        },

        clearsearched({ commit }) {
            commit('$_removesearched');
        },

        savetoken({ commit }, data) {
            commit('$_settoken', data)
        },

        cleartoken({ commit }) {
            commit('$_removetoken');
        },
    },
})