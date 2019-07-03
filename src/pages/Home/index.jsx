import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './index.less';

class Home extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        home: PropTypes.object,
    };

    updateName = () => {
        this.props.dispatch({
            type: 'home/update',
            payload: { name: 'liuxu' }, // 需要传递的信息
        });
    };

    render() {
        console.log('Home', NODE_ENV);

        const {
            home: { name = 'null' },
        } = this.props;

        return (
            <div className={styles['container-home']}>
                <div className={styles['row-bg']} />

                <div className={styles['row-welcome']}>
                    welcome to my home, {name} <Link to="/look/1">have a look</Link>
                </div>

                <div role="button" className={styles['row-action']} onClick={this.updateName}>
                    show my name
                </div>
            </div>
        );
    }
}

export default connect(({ home }) => ({
    home,
}))(Home);
