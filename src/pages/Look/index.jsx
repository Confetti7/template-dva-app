import React from 'react';
import { Link, Prompt } from 'dva/router';

export default class Look extends React.PureComponent {
    render() {
        return (
            <div>
                <Prompt message="Are you sure you want to leave?" />
                <Link to="/">
                    <div>have a look</div>
                </Link>
            </div>
        );
    }
}
