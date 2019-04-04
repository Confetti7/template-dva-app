import React from 'react';
import PropTypes from 'prop-types';
import { AppContainer } from 'react-hot-loader';

import { Router, Switch } from 'dva/router';
import { Route } from '../components';
import routes from './routes';

import BasicLayout from '../containers/BasicLayout';
import NoMatch from '../pages/404';

// Switch排他性
export default function router({ history }) {
    return (
        <AppContainer>
            <Router
                history={history}
                getUserConfirmation={(message, callback) => {
                    const allowTransition = window.confirm(message);
                    callback(allowTransition);
                }}
            >
                <Switch>
                    {routes.map(item => (
                        <Route
                            key={item.key}
                            path={item.path}
                            exact={item.exact}
                            render={(matchProps) => {
                                const matchRoute = routes.filter(route => route.path === matchProps.match.path)[0];
                                document.title = matchRoute.title;
                                // 登录重定向逻辑

                                return (
                                    <BasicLayout {...matchProps}>
                                        <item.component {...matchProps} />
                                    </BasicLayout>
                                );
                            }}
                            onEnter={(props) => {
                                console.log('onEnter', props);
                            }}
                            onUpdate={(props, nextProps) => {
                                console.log('onUpdate: props', props);
                                console.log('onUpdate: nextProps', nextProps);
                            }}
                            onLeave={(props) => {
                                console.log('onLeave', props);
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
