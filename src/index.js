import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './app/store';
import Loading from './components/FullPageLoading';
import WebLayout from './components/WebLayout/index';
import './configuration/i18n';
import { routeList } from './configuration/routesConfig';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Loading />
            <Routes>
                {routeList.map((route) => (
                    <Route
                        key={`route-${route.name}`}
                        exact
                        path={route.path}
                        element={
                            <WebLayout>
                                <route.component />
                            </WebLayout>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    </Provider>,
);
