import AccountManagement from '../pages/AccountManagement';
import Login from '../pages/Authentication/Login';
import DiscountCodeManagement from '../pages/DiscountCodeManagement';
import Home from '../pages/Home';
import DishManagement from '../pages/Manage/DishManagement';
import MenuManagement from '../pages/Manage/MenuManagement';
import TableManagement from '../pages/Manage/TableManagement';
import Analytics from '../pages/Sales/Analytics';
import BookingManagement from '../pages/Sales/BookingManagement';
import OrderManagement from '../pages/Sales/OrderManagement';
import AccountSettings from '../pages/Settings/AccountSettings';
import SystemSettings from '../pages/Settings/SystemSettings';

import ClientHome from '../pages/ClientHome';
import ClientOrder from '../pages/ClientOrder';
import ClientOrderSuccessful from '../pages/ClientOrderSuccessful';
import ClientOrderTracker from '../pages/ClientOrderTracker';
import NotFound from '../pages/Redirect/NotFound';

const adminUrl = '/admin-zone';
const homeUrl = `${adminUrl}/home`;

const manageUrl = `${adminUrl}/manage`;
const dishManagementUrl = `${manageUrl}/dish-management`;
const menuManagementUrl = `${manageUrl}/menu-management`;
const tableManagementUrl = `${manageUrl}/table-management`;

const salesUrl = `${adminUrl}/sales`;
const bookingManagementUrl = `${salesUrl}/booking-management`;
const orderManagementUrl = `${salesUrl}/order-management`;
const analyticsUrl = `${salesUrl}/analytics`;

const accountManagementUrl = `${adminUrl}/account-management`;
const discountCodeManagementUrl = `${adminUrl}/discount-code-management`;

const settingUrl = `${adminUrl}/settings`;
const accountSettingUrl = `${settingUrl}/account-settings`;
const systemSettingUrl = `${settingUrl}/system-settings`;

const loginUrl = `${adminUrl}/login`;

const clientHomeRoorUrl = '/booking';
const clientHomeUrl = `${clientHomeRoorUrl}/:tableId`;
const clientOrederUrl = `${clientHomeRoorUrl}/order`;
const clientOrderSuccessfulUrl = `${clientHomeRoorUrl}/:orderId/successfully`;
const clientOrderTrackerUrl = `${clientHomeRoorUrl}/tracker/:tableId`;

const notFoundUrl = '/*';

export const routeList = [
    { path: homeUrl, name: homeUrl, component: Home },
    { path: dishManagementUrl, name: dishManagementUrl, component: DishManagement },
    { path: menuManagementUrl, name: menuManagementUrl, component: MenuManagement },
    { path: tableManagementUrl, name: tableManagementUrl, component: TableManagement },
    { path: bookingManagementUrl, name: bookingManagementUrl, component: BookingManagement },
    { path: orderManagementUrl, name: orderManagementUrl, component: OrderManagement },
    { path: analyticsUrl, name: analyticsUrl, component: Analytics },
    { path: accountManagementUrl, name: accountManagementUrl, component: AccountManagement },
    { path: discountCodeManagementUrl, name: discountCodeManagementUrl, component: DiscountCodeManagement },
    { path: accountSettingUrl, name: accountSettingUrl, component: AccountSettings },
    { path: systemSettingUrl, name: systemSettingUrl, component: SystemSettings },
];

export const routeWithoutLayout = [
    { path: loginUrl, name: loginUrl, component: Login },
    // Keep "Not found page" the last one
    { path: notFoundUrl, component: NotFound },
];

export const routeClientLayout = [
    { path: clientHomeUrl, name: homeUrl, component: ClientHome },
    { path: clientOrederUrl, name: clientOrederUrl, component: ClientOrder },
    { path: clientOrderSuccessfulUrl, name: clientOrderSuccessfulUrl, component: ClientOrderSuccessful },
    { path: clientOrderTrackerUrl, name: clientOrderTrackerUrl, component: ClientOrderTracker },
    // Keep "Not found page" the last one
    { path: notFoundUrl, component: NotFound },
];

export const rootKeys = {
    homeUrl,
    manageUrl,
    dishManagementUrl,
    menuManagementUrl,
    tableManagementUrl,
    salesUrl,
    bookingManagementUrl,
    orderManagementUrl,
    analyticsUrl,
    accountManagementUrl,
    settingUrl,
    accountSettingUrl,
    systemSettingUrl,
    loginUrl,
    clientHomeUrl,
    clientOrederUrl,
    clientOrderTrackerUrl,
    clientHomeRoorUrl,
    clientOrderSuccessfulUrl,
    discountCodeManagementUrl,
};
