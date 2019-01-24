import React from 'react';
import styles from './index.less';
import { connect } from 'dva';
import avatar from '../../assets/imgs/avatar.png'

class Home extends React.Component {
    updateName = () => {
        this.props.dispatch({
            type: 'home/update',
            payload: { name: 'liuxu' } // 需要传递的信息
        });
    };

    render() {
        const {
            home: { name = 'null' }
        } = this.props;

        return (
            <div className={styles['container-home']}>
                welcome to my home, {name}
                <div onClick={this.updateName}>show my name</div>
                <img src={avatar} alt=""/>
            </div>
        );
    }
}

export default connect(({ home }) => ({
    home
}))(Home);
