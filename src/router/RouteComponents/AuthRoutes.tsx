import { lazy, useEffect } from 'react';

const Twofactor = lazy(() => import('../../pages/Authentication/TwoFactor'));
const LoginCover = lazy(() => import('../../pages/Authentication/LoginCover'));
const Agentlognin = lazy(() => import('../../pages/Authentication/Agentlogin'));
const RegisterCover = lazy(() => import('../../pages/Authentication/AgnetSingup'));
// const Login = lazy(() => import('../../pages/Authentication/Login'));
// const Home = lazy(() => import('../../pages/dashboard/Home'));
const Thankspage = lazy(() => import('../../pages/dashboard/ThanksPage'));
const Error404 = lazy(() => import('../../pages/dashboard/404page'));
const ForgotPassword = lazy(() => import('../../pages/Authentication/Forgetpassword'));
const ForgotPasswordpage2 = lazy(() => import('../../pages/Authentication/Forgotpasswordpage'));

const About = lazy(() => import('../../Demo/about'))
const Contact = lazy(() => import('../../Demo/contact'))
const Partner_with_us = lazy(() => import('../../Demo/Partner_with_us'))
const AuthRoutes = [
    {
        path: 'auth/agent/forgotpassword/:forgotpassword',
        element: <ForgotPasswordpage2 />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: 'forgotpassword',
        element: <ForgotPassword />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: 'about',
        element: <About />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: 'Partner_with_us',
        element: <Partner_with_us />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: 'contact',
        element: <Contact />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: 'staff/Login',
        element: <LoginCover />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: '',
        element: <Agentlognin />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: '/signup',
        element: <RegisterCover />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: 'user/two-factor/:ClientToken',
        element: <Twofactor />,
        layout: 'blank',
        type: 'Auth',
    },
    // {
    //     path: 'login',
    //     element: <Login />,
    //     layout: 'blank',
    //     type: 'Auth',
    // },
    {
        path: 'thanks',
        element: <Thankspage />,
        layout: 'blank',
        type: 'Auth',
    },
    {
        path: '*',
        element: <Error404 />,
        layout: 'blank',
        type: 'Auth',
    },
];

export { AuthRoutes };
