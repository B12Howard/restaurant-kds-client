import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import AppRoutes from './Routing/Routes';
import { HelmetProvider } from 'react-helmet-async';
import Store from './Store/Store';
// @ts-ignore
import * as serviceWorker from './serviceWorkerRegistration';

// import Offline from './Shared/Components/Offline/offline';

ReactDOM.render(
    <Store>
        <React.StrictMode>
            <HelmetProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </HelmetProvider>
        </React.StrictMode>
    </Store>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorker.register({
    onUpdate: (registration: any) => {
        const waitingServiceWorker = registration.waiting;

        if (waitingServiceWorker) {
            waitingServiceWorker.addEventListener('statechange', (event: any) => {
                if (event.target.state === 'activated') {
                    window.location.reload();
                }
            });
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
    },
});
