import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './index.less';
// import avatar from '../../assets/imgs/avatar.png'

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
        console.log(NODE_ENV);
        const {
            home: { name = 'null' },
        } = this.props;

        return (
            <div className={styles['container-home']}>
                welcome to my home, {name}
                <div role="button" className={styles.action} onClick={this.updateName}>
                    show my name
                </div>
                <Link to="/look/1">have a look</Link>
                {/* <img src={avatar} alt=""/> */}
            </div>
        );
    }
}

export default connect(({ home }) => ({
    home,
}))(Home);
