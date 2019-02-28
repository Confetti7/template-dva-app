import Home from '../pages/Home';
import Look from '../pages/Look';

export default [
    {
        title: '首页',
        path: '/',
        component: Home,
        exact: true,
    },
    {
        title: 'Look',
        path: '/look',
        component: Look,
        exact: true,
    },
];
