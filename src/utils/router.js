import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'dva/router';
import routesData from './routes';

import { AppContainer } from 'react-hot-loader';
import BasicLayout from '../containers/BasicLayout';
import NoMatch from '../pages/404';

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
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </AppContainer>
    );
}

routes.propTypes = {
    history: PropTypes.object
};
