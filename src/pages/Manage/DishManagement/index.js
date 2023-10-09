import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conainer from './Container';

export default function DishManagement(props) {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [dataToEdit, setDataToEdit] = useState([]);

    const handleEditClick = (data) => {
        setDataToEdit(data);
    };

    const dishProps = {
        ...props,
        t,
        dataToEdit,
        history,
        dispatch,
        handleEditClick,
    };
    return <Conainer {...dishProps} />;
}
