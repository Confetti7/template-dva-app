import loadable from './Loadable';

const Home = loadable(() => import('../pages/Home'));
const Look = loadable(() => import('../pages/Look'));

// 路由权限过滤
export default [
    {
        title: '首页',
        key: '/',
        path: '/',
        component: Home,
        exact: true,
    },
    {
        title: 'cNode列表',
        key: '/look',
        path: '/look/:id',
        component: Look,
        needLogin: true,
    },
];
