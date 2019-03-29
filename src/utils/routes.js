import loadable from './loadable';

// 路由权限过滤
export default [
    {
        title: '首页',
        key: '/',
        path: '/',
        component: loadable('Home'),
        exact: true,
    },
    {
        title: 'cNode列表',
        key: '/look',
        path: '/look/:id',
        component: loadable('Look'),
        needLogin: true,
    },
];
