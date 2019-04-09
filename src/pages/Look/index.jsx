import React from 'react';
import PropTypes from 'prop-types';
import { Link, Prompt } from 'dva/router';
import axios from 'axios';

export default class Look extends React.Component {
    static propTypes = {
        match: PropTypes.object,
    };

    state = {
        data: [],
    };

    render() {
        return (
            <div style={{ backgroundColor: '#47CF75' }}>
                <Prompt message="Are you sure you want to leave?" />
                <Link to={this.props.match.params.id == 1 ? '/look/2' : '/look/1'}>
                    <div className="padding20" style={{ fontSize: '24px' }}>
                        have a look
                    </div>
                </Link>
                {this.state.data.map(item => (
                    <div key={item.id} className="padding20">
                        {item.title}
                    </div>
                ))}
            </div>
        );
    }

    async componentDidMount() {
        await axios
            .get('https://cnodejs.org/api/v1/topics?page=1')
            .then((res) => {
                const { success, data } = res.data;
                if (success) {
                    this.setState({
                        data,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
