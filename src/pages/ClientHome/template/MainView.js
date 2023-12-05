import CartNavbar from '../../../components/CartNavbar';
import MenuDetail from '../../../components/MenuDetail';
import TopMenu from '../../../components/TopMenu';

export default function MainView({
    t,
    availableMenuData,
    menuData,
    handleAddDishToCard,
    isShowNavbar,
    cartItems,
    setCartItems,
    orderResult,
    handleViewOrderClick,
    tableData,
}) {
    return (
        <>
            <TopMenu t={t} data={availableMenuData} menuData={tableData} />
            <MenuDetail
                t={t}
                menuData={menuData}
                handleAddDishToCard={handleAddDishToCard}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
            <CartNavbar
                handleViewOrderClick={handleViewOrderClick}
                isShowNavbar={isShowNavbar}
                orderResult={orderResult}
            />
        </>
    );
}
