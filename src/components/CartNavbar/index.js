import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conainer from './Container';

export default function CartNavbar(props) {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const dishProps = {
        ...props,
        t,
        history,
        dispatch,
    };
    return <Conainer {...dishProps} />;
}
