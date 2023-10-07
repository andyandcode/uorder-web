import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DecorateContainer from '../../components/DecorateContainer';
import DishConainer from './DishContainer';

export default function Dish(props) {
    const history = useNavigate();
    const dispatch = useDispatch();

    const dishProps = {
        ...props,
        history,
        dispatch,
    };
    return <DecorateContainer {...dishProps} childComponent={DishConainer} />;
}
