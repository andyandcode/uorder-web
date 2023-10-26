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
            label: t('main.navigation.home.label'),
            key: rootKeys.homeUrl,
            path: rootKeys.homeUrl,
            icon: <PieChartOutlined />,
        },
        {
            label: t('main.navigation.manage.label'),
            key: rootKeys.manageUrl,
            icon: <DesktopOutlined />,
            children: [
                {
                    label: t('main.navigation.manage.dish'),
                    key: rootKeys.dishManagementUrl,
                    path: rootKeys.dishManagementUrl,
                },
                {
                    label: t('main.navigation.manage.menu'),
                    key: rootKeys.menuManagementUrl,
                    path: rootKeys.menuManagementUrl,
                },
                {
                    label: t('main.navigation.manage.table'),
                    key: rootKeys.tableManagementUrl,
                    path: rootKeys.tableManagementUrl,
                },
            ],
        },
        {
            label: t('main.navigation.sales.label'),
            key: rootKeys.salesUrl,
            icon: <ShoppingCartOutlined />,
            children: [
                {
                    label: t('main.navigation.sales.analytics'),
                    key: rootKeys.analyticsUrl,
                    path: rootKeys.analyticsUrl,
                },
                {
                    label: t('main.navigation.sales.booking'),
                    key: rootKeys.bookingManagementUrl,
                    path: rootKeys.bookingManagementUrl,
                },
                {
                    label: t('main.navigation.sales.order'),
                    key: rootKeys.orderManagementUrl,
                    path: rootKeys.orderManagementUrl,
                },
            ],
        },
        {
            label: t('main.navigation.account'),
            key: rootKeys.accountManagementUrl,
            path: rootKeys.accountManagementUrl,
            icon: <UserOutlined />,
        },
        {
            label: t('main.navigation.settings.label'),
            key: rootKeys.settingUrl,
            icon: <SettingOutlined />,
            children: [
                {
                    label: t('main.navigation.settings.system'),
                    key: rootKeys.systemSettingUrl,
                    path: rootKeys.systemSettingUrl,
                },
                {
                    label: t('main.navigation.settings.account'),
                    key: rootKeys.accountSettingUrl,
                    path: rootKeys.accountSettingUrl,
                },
            ],
        },
    ];
};
