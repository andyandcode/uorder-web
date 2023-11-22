import { Layout, Typography } from 'antd';
import CartNavbar from '../../../components/CartNavbar';
import HorizontalTagMenu from '../../../components/HorizontalTagMenu';
import MenuDetail from '../../../components/MenuDetail';

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
            <Layout.Content>
                <Typography.Title level={3} style={{ margin: 4 }}>
                    {tableData.name}
                </Typography.Title>
            </Layout.Content>
            <HorizontalTagMenu data={availableMenuData} />
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
