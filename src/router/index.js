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
        import ('../views/teams/team_firstpage.vue'),
    children: [{
        path: '/team_outline',
        name: 'team_outline',
        component: () =>
            import ('../views/teams/team_outline.vue'),
    }, {
        path: '/team_members',
        name: 'team_members',
        component: () =>
            import ('../views/teams/team_members.vue'),
    }, {
        path: '/team_projects',
        name: 'team_projects',
        component: () =>
            import ('../views/teams/team_projects.vue'),
    }, {
        path: '/team_dustbin',
        name: 'team_dustbin',
        component: () =>
            import ('../views/teams/team_dustbin.vue'),
    }]
}, {
    path: '/project_firstpage',
    name: 'project_firstpage',
    component: () =>
        import ('../views/projects/project_firstpage.vue'),
    children: [{
        path: '/project_outline',
        name: 'project_outline',
        component: () =>
            import ('../views/projects/project_outline.vue'),
    }, {
        path: '/project_design',
        name: 'project_design',
        component: () =>
            import ('../views/projects/project_design.vue'),
    }, {
        path: '/project_paint',
        name: 'project_paint',
        component: () =>
            import ('../views/projects/project_paint.vue'),
    }, {
        path: '/project_word',
        name: 'project_word',
        component: () =>
            import ('../views/projects/project_word.vue'),
    }]
}, {
    path: '/user_search',
    name: 'user_search',
    component: () =>
        import ('../views/users/user_search.vue')
}, {
    path: '/user_information',
    name: 'user_information',
    component: () =>
        import ('../views/users/user_information.vue')
}, {
    path: '/other_user_information',
    name: 'other_user_information',
    component: () =>
        import ('../views/users/otheruser_info.vue')
}, {
    path: '/test',
    name: 'test',
    component: () =>
        import ('../views/testpage.vue')
}, {
    path: '/taketoken/:id',
    name: 'taketoken',
    component: () =>
        import ('../views/taketoken.vue')
}, {
    path: '/forget',
    name: 'forget',
    component: () =>
        import ('../views/forget.vue')
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router