import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { before, after } from 'utils/hook';
import styles from './index.less';

class Home extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        home: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);
    }

    @before(() => {
        console.log('前置钩子函数: 我执行啦');
    })
    @after(() => {
        console.log('后置钩子函数: 我执行啦');
    })
    updateName(hello) {
        console.log('本命函数: 我执行啦');
        this.props.dispatch({
            type: 'home/update',
            payload: { name: 'liuxu' }, // 需要传递的信息
        });
    }

    componentDidMount() {
        console.log('Home', NODE_ENV);
    }

    render() {
        const {
            home: { name = 'null' },
        } = this.props;

        return (
            <div className={styles['container-home']}>
                <div className={styles['row-bg']} />

                <div className={styles['row-welcome']}>
                    welcome to my home, {name} <Link to="/look/1">have a look</Link>
                </div>

                <div
                    role="button"
                    className={styles['row-action']}
                    onClick={() => {
                        this.updateName('hello');
                    }}
                >
                    show my name
                </div>
            </div>
        );
    }
}

export default connect(({ home }) => ({
    home,
}))(Home);
