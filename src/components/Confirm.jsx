import React from 'react';
import ReactDOM from 'react-dom';

export default function (message, callback) {
    debugger;
    const root = document.createElement('div');
    root.id = 'container-confirm';

    const ConFirmComponent = () => (
        <div>
            {message}
            <button
                onClick={() => {
                    callback(true);
                    ReactDOM.unmountComponentAtNode(document.getElementById(root.id));
                }}
            >
                确定
            </button>
            <button
                onClick={() => {
                    callback(false);
                    ReactDOM.unmountComponentAtNode(document.getElementById(root.id));
                }}
            >
                取消
            </button>
        </div>
    );

    ReactDOM.render(<ConFirmComponent />, document.getElementById(root.id));
}
