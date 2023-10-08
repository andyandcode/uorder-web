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
            label: `${t('app.feature.home.label')}`,
            key: rootKeys.homeUrl,
            path: rootKeys.homeUrl,
            icon: <PieChartOutlined />,
        },
        {
            label: `${t('app.feature.manage.label')}`,
            key: rootKeys.manageUrl,
            icon: <DesktopOutlined />,
            children: [
                {
                    label: `${t('app.feature.manage.dish.label')}`,
                    key: rootKeys.dishManagementUrl,
                    path: rootKeys.dishManagementUrl,
                },
                {
                    label: `${t('app.feature.manage.menu.label')}`,
                    key: rootKeys.menuManagementUrl,
                    path: rootKeys.menuManagementUrl,
                },
                {
                    label: `${t('app.feature.manage.table.label')}`,
                    key: rootKeys.tableManagementUrl,
                    path: rootKeys.tableManagementUrl,
                },
            ],
        },
        {
            label: `${t('app.feature.sales.label')}`,
            key: rootKeys.salesUrl,
            icon: <ShoppingCartOutlined />,
            children: [
                {
                    label: `${t('app.feature.sales.analytics.label')}`,
                    key: rootKeys.analyticsUrl,
                    path: rootKeys.analyticsUrl,
                },
                {
                    label: `${t('app.feature.sales.booking.label')}`,
                    key: rootKeys.bookingManagementUrl,
                    path: rootKeys.bookingManagementUrl,
                },
                {
                    label: `${t('app.feature.sales.order.label')}`,
                    key: rootKeys.orderManagementUrl,
                    path: rootKeys.orderManagementUrl,
                },
            ],
        },
        {
            label: `${t('app.feature.account.label')}`,
            key: rootKeys.accountManagementUrl,
            path: rootKeys.accountManagementUrl,
            icon: <UserOutlined />,
        },
        {
            label: `${t('app.feature.settings.label')}`,
            key: rootKeys.settingUrl,
            icon: <SettingOutlined />,
            children: [
                {
                    label: `${t('app.feature.settings.system.label')}`,
                    key: rootKeys.systemSettingUrl,
                    path: rootKeys.systemSettingUrl,
                },
                {
                    label: `${t('app.feature.settings.account.label')}`,
                    key: rootKeys.accountSettingUrl,
                    path: rootKeys.accountSettingUrl,
                },
            ],
        },
    ];
};
