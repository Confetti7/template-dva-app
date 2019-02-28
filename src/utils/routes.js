import Home from '../pages/Home';
import Look from '../pages/Look';

// 路由权限过滤
export default [
    {
        title: '首页',
        path: '/',
        component: Home,
        exact: true,
    },
    {
        title: '看一看瞧一瞧了啊',
        path: '/look',
        component: Look,
        exact: true,
        needLogin: true,
    },
];
