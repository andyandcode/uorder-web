export default function propsProvider(props) {
    const {
        history,
        dispatch,
        t,
        availableMenuData,
        menuData,
        handleAddDishToCard,
        isShowNavbar,
        orderForm,
        cartItems,
        setCartItems,
        orderResult,
        handleViewOrderClick,
        tableData,
    } = props;
    return {
        history,
        dispatch,
        t,
        availableMenuData,
        menuData,
        handleAddDishToCard,
        isShowNavbar,
        orderForm,
        cartItems,
        setCartItems,
        orderResult,
        handleViewOrderClick,
        tableData,
    };
}
