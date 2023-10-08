import AccountManagement from '../pages/AccountManagement';
import Home from '../pages/Home';
import DishManagement from '../pages/Manage/DishManagement';
import MenuManagement from '../pages/Manage/MenuManagement';
import TableManagement from '../pages/Manage/TableManagement';
import BookingManagement from '../pages/Sales/BookingManagement';
import OrderManagement from '../pages/Sales/OrderManagement';
import AccountSettings from '../pages/Settings/AccountSettings';
import SystemSettings from '../pages/Settings/SystemSettings';

const homeUrl = '/';
const manageUrl = '/manage';
const dishManagementUrl = `${manageUrl}/dish-management`;
const menuManagementUrl = `${manageUrl}/menu-management`;
const tableManagementUrl = `${manageUrl}/table-management`;
const salesUrl = '/sales';
const bookingManagementUrl = `${salesUrl}/booking-management`;
const orderManagementUrl = `${salesUrl}/order-management`;
const accountManagementUrl = '/account-management';
const settingUrl = '/settings';
const accountSettingUrl = `${settingUrl}/account-settings`;
const systemSettingUrl = `${settingUrl}/system-settings`;

export const routeList = [
    { path: homeUrl, name: homeUrl, component: Home },
    { path: dishManagementUrl, name: dishManagementUrl, component: DishManagement },
    { path: menuManagementUrl, name: menuManagementUrl, component: MenuManagement },
    { path: tableManagementUrl, name: tableManagementUrl, component: TableManagement },
    { path: bookingManagementUrl, name: bookingManagementUrl, component: BookingManagement },
    { path: orderManagementUrl, name: orderManagementUrl, component: OrderManagement },
    { path: accountManagementUrl, name: accountManagementUrl, component: AccountManagement },
    { path: accountSettingUrl, name: accountSettingUrl, component: AccountSettings },
    { path: systemSettingUrl, name: systemSettingUrl, component: SystemSettings },
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
    accountManagementUrl,
    settingUrl,
    accountSettingUrl,
    systemSettingUrl,
};
