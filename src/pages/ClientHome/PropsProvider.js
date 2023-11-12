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
    };
}
