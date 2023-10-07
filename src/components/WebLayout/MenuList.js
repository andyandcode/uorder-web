import {
    DesktopOutlined,
    PieChartOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { rootKeys } from '../../configuration/routesConfig';

export const MenuList = () => {
    const { t } = useTranslation();
    return [
        {
            label: `${t('app.layout.menu.home')}`,
            key: rootKeys.home,
            path: rootKeys.home,
            icon: <PieChartOutlined />,
        },
        {
            label: `${t('app.layout.menu.manage.manage')}`,
            key: rootKeys.manage,
            icon: <DesktopOutlined />,
            children: [
                {
                    label: `${t('app.layout.menu.manage.dish')}`,
                    key: rootKeys.dish,
                    path: rootKeys.dish,
                },
                {
                    label: `${t('app.layout.menu.manage.menu')}`,
                    key: rootKeys.menu,
                    path: rootKeys.menu,
                },
                {
                    label: `${t('app.layout.menu.manage.table')}`,
                    key: rootKeys.table,
                    path: rootKeys.table,
                },
            ],
        },
        {
            label: `${t('app.layout.menu.sale.sale')}`,
            key: rootKeys.sale,
            icon: <ShoppingCartOutlined />,
            children: [
                {
                    label: `${t('app.layout.menu.sale.booking')}`,
                    key: rootKeys.booking,
                    path: rootKeys.booking,
                },
                {
                    label: `${t('app.layout.menu.sale.order')}`,
                    key: rootKeys.order,
                    path: rootKeys.order,
                },
            ],
        },
        {
            label: `${t('app.layout.menu.account')}`,
            key: rootKeys.account,
            path: rootKeys.account,
            icon: <UserOutlined />,
        },
        {
            label: `${t('app.layout.menu.setting.setting')}`,
            key: rootKeys.setting,
            icon: <SettingOutlined />,
            children: [
                {
                    label: `${t('app.layout.menu.setting.system')}`,
                    key: rootKeys.systemSetting,
                    path: rootKeys.systemSetting,
                },
                {
                    label: `${t('app.layout.menu.setting.account')}`,
                    key: rootKeys.accountSetting,
                    path: rootKeys.accountSetting,
                },
            ],
        },
    ];
};
