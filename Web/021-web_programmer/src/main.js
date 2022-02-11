import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';
import './index.less';

//热更新实现
const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app'),
    )
}

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./app', () => {
        render(App);
    })
}