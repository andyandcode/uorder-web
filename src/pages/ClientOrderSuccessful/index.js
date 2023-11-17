import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Conainer from './Container';

export default function ClientOrderSuccessful(props) {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const location = useLocation();

    const dishProps = {
        ...props,
        t,
        history,
        dispatch,
        location,
    };
    return <Conainer {...dishProps} />;
}
