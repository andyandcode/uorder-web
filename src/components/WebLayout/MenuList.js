import {
    DesktopOutlined,
    PieChartOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { rootKeys } from '../../configuration/routesConfig';

export const MenuList = (roleName) => {
    const { t } = useTranslation();

    const originalMenu = [
        {
            label: t('main.navigation.home.label'),
            key: rootKeys.homeUrl,
            path: rootKeys.homeUrl,
            icon: <PieChartOutlined />,
            role: '',
        },
        {
            label: t('main.navigation.manage.label'),
            key: rootKeys.manageUrl,
            icon: <DesktopOutlined />,
            role: 'admin,creator',
            children: [
                {
                    label: t('main.navigation.manage.dish'),
                    key: rootKeys.dishManagementUrl,
                    path: rootKeys.dishManagementUrl,
                    role: 'admin,creator',
                },
                {
                    label: t('main.navigation.manage.menu'),
                    key: rootKeys.menuManagementUrl,
                    path: rootKeys.menuManagementUrl,
                    role: 'admin,creator',
                },
                {
                    label: t('main.navigation.manage.table'),
                    key: rootKeys.tableManagementUrl,
                    path: rootKeys.tableManagementUrl,
                    role: 'admin,creator',
                },
            ],
        },
        {
            label: t('main.navigation.sales.label'),
            key: rootKeys.salesUrl,
            icon: <ShoppingCartOutlined />,
            role: 'admin,staff',
            children: [
                {
                    label: t('main.navigation.sales.analytics'),
                    key: rootKeys.analyticsUrl,
                    path: rootKeys.analyticsUrl,
                    role: 'admin',
                },
                {
                    label: t('main.navigation.sales.booking'),
                    key: rootKeys.bookingManagementUrl,
                    path: rootKeys.bookingManagementUrl,
                    role: 'admin,staff',
                },
                {
                    label: t('main.navigation.sales.order'),
                    key: rootKeys.orderManagementUrl,
                    path: rootKeys.orderManagementUrl,
                    role: 'admin,staff',
                },
            ],
        },
        {
            label: t('main.navigation.account'),
            key: rootKeys.accountManagementUrl,
            path: rootKeys.accountManagementUrl,
            icon: <UserOutlined />,
            role: 'admin',
        },
        {
            label: t('main.navigation.discount_code'),
            key: rootKeys.discountCodeManagementUrl,
            path: rootKeys.discountCodeManagementUrl,
            icon: <TagsOutlined />,
            role: 'admin,staff',
        },
        {
            label: t('main.navigation.settings.label'),
            key: rootKeys.settingUrl,
            icon: <SettingOutlined />,
            role: '',
            children: [
                {
                    label: t('main.navigation.settings.system'),
                    key: rootKeys.systemSettingUrl,
                    path: rootKeys.systemSettingUrl,
                    role: 'admin',
                },
                {
                    label: t('main.navigation.settings.account'),
                    key: rootKeys.accountSettingUrl,
                    path: rootKeys.accountSettingUrl,
                    role: '',
                },
            ],
        },
    ];

    // Hàm để lọc các object dựa trên giá trị của role
    const filterObjectsByRole = (item, role) => {
        if (!item.role || item.role.includes(role)) {
            const newItem = { ...item }; // Tạo một bản sao của đối tượng gốc
            if (newItem.children) {
                // Nếu có children, lọc lại children dựa trên role
                newItem.children = newItem.children.map((child) => filterObjectsByRole(child, role));
            }
            delete newItem.role;
            return newItem;
        }
        return null;
    };

    return originalMenu.map((item) => filterObjectsByRole(item, roleName)).filter(Boolean);
};
