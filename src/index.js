import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import store from './app/store';
import Loading from './components/FullPageLoading';
import { UseNotificationForAxios } from './components/UseNotification';
import WebLayout from './components/WebLayout/index';
import WebLayoutInClient from './components/WebLayoutInClient';
import './configuration/i18n';
import { routeClientLayout, routeList, routeWithoutLayout } from './configuration/routesConfig';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <Loading />
            <UseNotificationForAxios.NetworkError />
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
                {routeWithoutLayout.map((route) => (
                    <Route key={`route-${route.name}`} exact path={route.path} element={<route.component />} />
                ))}

                {routeClientLayout.map((route) => (
                    <Route
                        key={`route-${route.name}`}
                        exact
                        path={route.path}
                        element={
                            <WebLayoutInClient>
                                <route.component />
                            </WebLayoutInClient>
                        }
                    />
                ))}
            </Routes>
        </Router>
    </Provider>,
);
