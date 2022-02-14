import { createWebHistory, createRouter } from "vue-router";

import Page404 from './view/errors/Page404'
import Authorization from './view/authentication/Authorization'
import RegistrationRespondent from "./view/authentication/RegistrationRespondent";
import RegistrationModerator from "./view/authentication/RegistrationModerator";
import RecoveryPassword from "./view/authentication/RecoveryPassword";


import DashboardLayout from "./components/Layouts/DashboardLayout";
import AuthLayout from "./components/Layouts/AuthLayout";

import ModeratorTests from "./components/dashboards/moderator/Tests";
import ModeratorTeams from "./components/dashboards/moderator/Teams";

import RespondentTests from "./components/dashboards/respondent/Tests";

import store from "./store/store";
import userRole from "./enums";
import ModeratorDashboard from "./components/dashboards/moderator/ModeratorDashboard";
import RespondentDashboard from "./components/dashboards/respondent/RespondentDashboard";

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: 'auth',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Authorization
            },
            {
                path: '/reg-moderator',
                name: 'reg-moderator',
                component: RegistrationModerator
            },
            {
                path: '/reg-respondent',
                name: 'reg-respondent',
                component: RegistrationRespondent
            },
            {
                path: '/recovery-password',
                name: 'rec-password',
                component: RecoveryPassword
            },
        ]
    },
    {
        path: '/dashboard',
        //redirect: '/moderator/tests',
        name: 'dashboard',
        meta: {requiresAuth: true},
        component: DashboardLayout,
        children: [
            {
                path: '/moderator',
                redirect: '/moderator/tests',
                name: 'moderator',
                component: ModeratorDashboard,
                children: [
                    {
                        path: '/moderator/tests',
                        name: 'ModeratorTests',
                        component: ModeratorTests,
                    },
                    {
                        path: '/moderator/teams',
                        name: 'ModeratorTeams',
                        component: ModeratorTeams
                    },
                ]
            },
            {
                path: '/respondent',
                redirect: '/respondent/tests',
                name: 'respondent',
                component: RespondentDashboard,
                children: [
                    {
                        path: '/respondent/tests',
                        name: 'RespondentTests',
                        component: RespondentTests
                    },
                ]
            },
            // {
            //     path: '/moderator/tests',
            //     name: 'ModeratorTests',
            //     component: ModeratorTests,
            // },
            // {
            //     path: '/moderator/teams',
            //     name: 'ModeratorTeams',
            //     component: ModeratorTeams
            // },

        ]
    },
    {
        path: "/:catchAll(.*)",
        component: Page404,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'auth'})
    } else if (store.state.user.token &&
        (to.name === 'reg-moderator' ||
            to.name === 'reg-respondent' ||
            to.name === 'rec-password' ||
            to.name === 'login' ||
            to.name === 'dashboard')){
        if(store.state.user.role === userRole.Moderator){
            next({name:'ModeratorTests'})
        } else {
            next({name:'RespondentTests'})
        }
    } else {
        next()
    }
})

export default router;
