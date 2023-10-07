import Dish from '../pages/Dish';

const home = '/';
const manage = '/manage';
const dish = `${manage}/dish`;
const menu = `${manage}/menu`;
const table = `${manage}/table`;
const sale = '/sale';
const booking = `${sale}/booking`;
const order = `${sale}/order`;
const account = '/account';
const setting = '/setting';
const accountSetting = `${sale}/account-settings`;
const systemSetting = `${sale}/system-settings`;

export const routeList = [
    { path: home, name: home, component: Dish },
    { path: dish, name: dish, component: Dish },
    { path: menu, name: menu, component: Dish },
    { path: table, name: table, component: Dish },
    { path: booking, name: booking, component: Dish },
    { path: order, name: order, component: Dish },
    { path: account, name: account, component: Dish },
    { path: accountSetting, name: accountSetting, component: Dish },
    { path: systemSetting, name: systemSetting, component: Dish },
];

export const rootKeys = {
    home,
    manage,
    dish,
    menu,
    table,
    sale,
    booking,
    order,
    account,
    setting,
    accountSetting,
    systemSetting,
};
