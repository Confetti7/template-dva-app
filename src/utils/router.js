import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'dva/router';

import { AppContainer } from 'react-hot-loader';
import BasicLayout from '../containers/BasicLayout';

import Home from '../pages/Home';

const routesData = [
    {
        title: '首页',
        path: '/',
        component: Home,
        exact: true
    }
];

export default function routes({ history }) {
    return (
        <AppContainer>
            <Router history={history}>
                <Switch>
                    {routesData.map(item => (
                        <Route
                            key={item.path}
                            path={item.path}
                            exact={item.exact}
                            render={matchProps => (
                                <BasicLayout {...matchProps}>
                                    <item.component {...matchProps} />
                                </BasicLayout>
                            )}
                        />
                    ))}
                </Switch>
            </Router>
        </AppContainer>
    );
}
routes.propTypes = {
    history: PropTypes.object
};
