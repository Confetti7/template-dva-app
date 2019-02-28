import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'dva/router';
import { AppContainer } from 'react-hot-loader';
import routes from './routes';

import BasicLayout from '../containers/BasicLayout';
import NoMatch from '../pages/404';

// Switch排他性
export default function router({ history }) {
    return (
        <AppContainer>
            <Router history={history}>
                <Switch>
                    {routes.map(item => (
                        <Route
                            key={item.path}
                            path={item.path}
                            exact={item.exact}
                            render={(matchProps) => {
                                console.log(matchProps);
                                const matchRoute = routes.filter(route => route.path === matchProps.match.path)[0];
                                document.title = matchRoute.title;
                                // 登录重定向逻辑

                                return (
                                    <BasicLayout {...matchProps}>
                                        <item.component {...matchProps} />
                                    </BasicLayout>
                                );
                            }}
                        />
                    ))}
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </AppContainer>
    );
}

router.propTypes = {
    history: PropTypes.object,
};
