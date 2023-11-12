export default function propsProvider(props) {
    const { history, dispatch, t, menuData, handleAddDishToCard, cartItems, setCartItems } = props;
    return {
        history,
        dispatch,
        t,
        menuData,
        handleAddDishToCard,
        cartItems,
        setCartItems,
    };
}
