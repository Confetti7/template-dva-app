import Loadable from '../components/Loadable';

const Home = Loadable(() => import('../pages/Home'));
const Look = Loadable(() => import('../pages/Look'));

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
        path: '/look/:id',
        component: Look,
        needLogin: true,
    },
];
