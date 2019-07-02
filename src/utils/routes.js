import { lazy } from 'react';

// 路由权限过滤
export default [
    {
        title: '首页',
        key: '/',
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "Home" */ '../pages/Home')),
        exact: true,
    },
    {
        title: 'cNode列表',
        key: '/look',
        path: '/look/:id',
        component: lazy(() => import(/* webpackChunkName: "Look" */ '../pages/Look')),
        needLogin: true,
    },
];
