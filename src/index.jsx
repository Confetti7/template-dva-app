/*
 * @Author: liuxu
 * @Date: 2019-01-22 2:49:46
 */

import dva from 'dva';
import './index.less';
import createHistory from 'history/createBrowserHistory';

import models from './models';
import routes from './utils/router';

// 创建应用
const app = dva({
    history: createHistory()
});

// 绑定数据
models.forEach(model => {
    app.model(model);
});

// 视图关系
app.router(routes);

// 渲染页面
app.start('#root');
