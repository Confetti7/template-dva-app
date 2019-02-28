import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class App extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        return <div className="container-app">{this.props.children}</div>;
    }
}
