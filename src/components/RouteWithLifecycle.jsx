/*
 * @Author: liuxu
 * @Date: 2018-11-30 17:17:13
 * @mark: rouer4.0 去掉了onEnter/onLeave钩子函数 跳转Route的componentWillMount比原路由的componentWillUnmount要快
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'dva/router';

export default class RouteWithLifecycle extends React.Component {
    static propTypes = {
        onEnter: PropTypes.func,
        onUpdate: PropTypes.func,
        onLeave: PropTypes.func,
    };

    static defaultProps = {
        onEnter: () => {},
        onUpdate: () => {},
        onLeave: () => {},
    };

    componentDidMount() {
        this.props.onEnter(this.props);
    }

    componentWillUpdate(nextProps) {
        this.props.onUpdate(this.props, nextProps);
    }

    componentWillUnmount() {
        this.props.onLeave(this.props);
    }

    render() {
        return <Route {...this.props} />;
    }
}
