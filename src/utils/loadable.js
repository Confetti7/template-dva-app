import React from 'react';
import loadable from 'react-loadable';
import Loading from '../components/Loading';

/* eslint-disable */
export default function(chunkName) {
    return loadable({
        loader: () => import(/* webpackChunkName: "[request]" */ `../pages/${chunkName}`),
        loading: props => {
            if (props.error) {
                return <div>发生错误</div>;
            }
            if (props.timedOut) {
                return <div>加载超时</div>;
            }
            if (props.pastDelay) {
                return <Loading />;
            }
            return null;
        },
        timeout: 10000,
    });
}
