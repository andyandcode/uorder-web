import React, { useEffect, useState } from 'react';
import { rootKeys } from '../../configuration/routesConfig';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import { getListAvailable } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [menuData, setMenuData] = useState([]);
    const [availableMenuData, setAvailableMenuData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orderResult, setOrderResult] = useState([]);
    const [isShowNavbar, setIsShowNavbar] = useState(false);

    useEffect(() => {
        dispatch(getListAvailable()).then((result) => {
            setMenuData(Utils.getValues(result, 'payload', []));
            setAvailableMenuData(
                Utils.getValues(result, 'payload', []).map((item) => ({ name: item.name, key: item.key, id: item.id })),
            );
        });
    }, [dispatch]);

    useEffect(() => {
        const combineArr = (array) => {
            const results = [];
            const uniqueIds = new Set();
            let totalItems = 0;
            let total = 0;

            for (let i = array.length - 1; i >= 0; i--) {
                const item = array[i];
                const id = item.dishId;

                if (!uniqueIds.has(id)) {
                    results.push(item);
                    uniqueIds.add(id);
                    totalItems += item.qty;
                    total += item.amount;
                }
            }

            return { results, totalItems, total };
        };

        if (combineArr(cartItems).totalItems > 0) {
            setIsShowNavbar(true);
        } else {
            setIsShowNavbar(false);
        }

        setOrderResult(combineArr(cartItems));
    }, [cartItems]);

    const handleViewOrderClick = () => {
        localStorage.setItem('cartItems', JSON.stringify(orderResult));
        history(rootKeys.orederUrl, { state: { data: orderResult } });
    };

    const containerProps = {
        ...props,
        history,
        t,
        availableMenuData,
        menuData,
        isShowNavbar,
        cartItems,
        setCartItems,
        orderResult,
        handleViewOrderClick,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
