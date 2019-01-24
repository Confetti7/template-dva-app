import React from 'react';
import './index.less';

export default class App extends React.PureComponent {
    render() {
        return <div className='container-app'>{this.props.children}</div>;
    }
}
