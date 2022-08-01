import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'welcome',
    component: () =>
        import ('../views/welcome.vue')
}, {
    path: '/register',
    name: 'register',
    component: () =>
        import ('../views/register.vue')
}, {
    path: '/login',
    name: 'login',
    component: () =>
        import ('../views/login.vue')
}, {
    path: '/team_firstpage',
    name: 'team_firstpage',
    component: () =>
        import ('../views/teams/team_firstpage.vue')
}, {
    path: '/team_members',
    name: 'team_members',
    component: () =>
        import ('../views/teams/team_members.vue')
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router