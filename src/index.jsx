/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:49:46
 */

import dva from 'dva';
import './common/less/base.less';
import './index.less';
import createHistory from 'history/createBrowserHistory';

import FastClick from 'fastclick';

import models from './models';
import routes from './utils/router';

NODE_ENV === 'production'
    && import('offline-plugin/runtime').then((OfflinePluginRuntime) => {
        OfflinePluginRuntime.install();
    });

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.getRegistration().then((registration) => {
//         registration
//             && registration.unregister().then((boolean) => {
//                 boolean ? alert('註銷成功') : alert('註銷失敗');
//             });
//     });
// }

// 创建应用
const app = dva({
    history: createHistory(),
});

// 绑定数据
models.forEach((model) => {
    app.model(model);
});

// 视图关系
app.router(routes);

// 渲染页面
app.start('#root');

FastClick.attach(document.body);
