import React from 'react';
import ReactDOM from 'react-dom';
import 'lib-flexible';

// import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store, persistor} from '@/store';
import '@/lang/index';
import '@/style/index.less';
import 'nprogress/nprogress.css';
import PKG from '../package.json';
import {PersistGate} from "redux-persist/integration/react";
import ErrorBoundary from "@/layout/ErrorBoundary";
import App from './App';

console.log('当前版本：' + PKG.version);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
