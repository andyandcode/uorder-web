import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { rootKeys } from '../../configuration/routesConfig';
import Utils from '../../utilities';
import propsProvider from './PropsProvider';
import { getBooking } from './Slice';
import MainView from './template/MainView';

function Conainer(props) {
    const { history, t, dispatch } = props;
    const [menuData, setMenuData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [availableMenuData, setAvailableMenuData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [orderResult, setOrderResult] = useState([]);
    const [isShowNavbar, setIsShowNavbar] = useState(false);
    const params = useParams();

    useEffect(() => {
        dispatch(getBooking(params.tableId)).then((result) => {
            if (result.error !== undefined && result.error.code === 'ERR_BAD_REQUEST') {
                history(`/booking/tracker/${params.tableId}`, {
                    state: { data: Utils.getValues(result, 'payload', []) },
                });
            }
            setMenuData(Utils.getValues(result, 'payload.menus', []));

            setDishes(
                Utils.getValues(result, 'payload.menus', []).reduce((acc, category) => {
                    return acc.concat(category.dishes);
                }, []),
            );

            setAvailableMenuData(
                Utils.getValues(result, 'payload.menus', []).map((item) => ({
                    name: item.name,
                    key: item.key,
                    id: item.id,
                })),
            );
            setTableData(Utils.getValues(result, 'payload.table', []));
        });
    }, [dispatch]);

    useEffect(() => {
        console.log(cartItems);
        const combineArr = (array) => {
            const dishes = [];
            const uniqueIds = new Set();
            let totalItems = 0;
            let subTotal = 0;
            let discount = 0;
            let tableId = params.tableId;

            for (let i = array.length - 1; i >= 0; i--) {
                const item = array[i];
                const id = item.dishId;

                if (!uniqueIds.has(id)) {
                    dishes.push(item);
                    uniqueIds.add(id);
                    totalItems += item.qty;
                    subTotal += item.amount;
                }
            }
            let total = subTotal;
            let originalDiscount = discount;
            let originalTotal = total;

            return { dishes, totalItems, subTotal, discount, total, originalDiscount, originalTotal, tableId };
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
        history(rootKeys.clientOrederUrl, { state: { data: orderResult, preId: params } });
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
        tableData,
    };
    return <MainView {...propsProvider(containerProps)} />;
}

export default Conainer;
