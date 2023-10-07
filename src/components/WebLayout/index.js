import { ExclamationCircleFilled, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Modal, Select, Space, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { rootKeys } from '../../configuration/routesConfig';
import { MenuList } from './MenuList';

const { confirm } = Modal;
const { Header, Content, Footer, Sider } = Layout;

const rootSubmenuKeys = [
    rootKeys.home.path,
    rootKeys.manage.path,
    rootKeys.sale.path,
    rootKeys.setting.path,
];

const locales = [
    { label: 'Tiếng việt', value: 'vi' },
    { label: 'English', value: 'en' },
];

export default function WebLayout(props) {
    const { t, i18n } = useTranslation();

    const showDeleteConfirm = () => {
        confirm({
            title: t('app.notification.accountQuickAccess.title'),
            icon: <ExclamationCircleFilled />,
            content: t('app.notification.accountQuickAccess.message'),
            okType: 'danger',
            okText: t('app.notification.accountQuickAccess.acceptButton'),
            cancelText: t('app.notification.accountQuickAccess.cancelButton'),
            onOk() {},
            onCancel() {},
        });
    };

    const items = [
        {
            label: <Link to='/manage'>{t('app.feature.accountQuickAccess.infomation')}</Link>,
            key: '1',
        },
        {
            label: (
                <Button onClick={showDeleteConfirm} type='link' danger>
                    {t('app.feature.accountQuickAccess.logoutButton')}
                </Button>
            ),
            key: '2',
        },
    ];
    const { children } = props;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [openKeys, setOpenKeys] = useState([rootKeys.home]);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        } else {
            setOpenKeys(keys);
        }
    };
    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        if (key === 'signout') {
        } else {
            navigate(key);
        }
    };
    let location = useLocation();
    const [current, setCurrent] = useState(
        location.pathname === '/' || location.pathname === '' ? '/' : location.pathname,
    );

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    };
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={250}
            >
                <div className='demo-logo-vertical' />
                <Menu
                    theme='dark'
                    defaultSelectedKeys={[current]}
                    selectedKeys={[current]}
                    mode='inline'
                    items={MenuList()}
                    onOpenChange={onOpenChange}
                    openKeys={openKeys}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        paddingRight: 16,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Space>
                        <Select
                            defaultValue={i18n.language}
                            onChange={handleChange}
                            options={locales}
                            style={{
                                width: 120,
                            }}
                        />
                    </Space>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <Space>
                            <Button type='link' icon={<UserOutlined />}>
                                {t('app.feature.accountQuickAccess.label')}
                            </Button>
                        </Space>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            marginTop: 24,
                            borderRadius: 16,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}
