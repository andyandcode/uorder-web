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
            key: rootKeys.home,
            path: rootKeys.home,
            icon: <PieChartOutlined />,
        },
        {
            label: `${t('app.feature.manage.label')}`,
            key: rootKeys.manage,
            icon: <DesktopOutlined />,
            children: [
                {
                    label: `${t('app.feature.manage.dish.label')}`,
                    key: rootKeys.dish,
                    path: rootKeys.dish,
                },
                {
                    label: `${t('app.feature.manage.menu.label')}`,
                    key: rootKeys.menu,
                    path: rootKeys.menu,
                },
                {
                    label: `${t('app.feature.manage.table.label')}`,
                    key: rootKeys.table,
                    path: rootKeys.table,
                },
            ],
        },
        {
            label: `${t('app.feature.sale.label')}`,
            key: rootKeys.sale,
            icon: <ShoppingCartOutlined />,
            children: [
                {
                    label: `${t('app.feature.sale.booking.label')}`,
                    key: rootKeys.booking,
                    path: rootKeys.booking,
                },
                {
                    label: `${t('app.feature.sale.order.label')}`,
                    key: rootKeys.order,
                    path: rootKeys.order,
                },
            ],
        },
        {
            label: `${t('app.feature.account.label')}`,
            key: rootKeys.account,
            path: rootKeys.account,
            icon: <UserOutlined />,
        },
        {
            label: `${t('app.feature.setting.label')}`,
            key: rootKeys.setting,
            icon: <SettingOutlined />,
            children: [
                {
                    label: `${t('app.feature.setting.system.label')}`,
                    key: rootKeys.systemSetting,
                    path: rootKeys.systemSetting,
                },
                {
                    label: `${t('app.feature.setting.account.label')}`,
                    key: rootKeys.accountSetting,
                    path: rootKeys.accountSetting,
                },
            ],
        },
    ];
};
