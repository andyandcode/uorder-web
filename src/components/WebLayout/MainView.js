import { BellFilled, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Layout, Menu, Select, Space } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function MainView(props) {
    const {
        t,
        i18n,
        collapsed,
        setCollapsed,
        current,
        onOpenChange,
        openSiderKeys,
        handleMenuClick,
        colorBgContainer,
        handleChangeLocales,
        locales,
        items,
        notificationCount,
        MenuList,
        children,
        access,
    } = props;
    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                    height: '100%',
                }}
            >
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    width={250}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'sticky',
                        top: 0,
                        left: 0,
                    }}
                >
                    <div className='demo-logo-vertical' />
                    <Menu
                        theme='dark'
                        defaultSelectedKeys={[current]}
                        selectedKeys={[current]}
                        mode='inline'
                        items={MenuList(access && access.data.role)}
                        onOpenChange={onOpenChange}
                        openKeys={openSiderKeys}
                        onClick={handleMenuClick}
                    />
                </Sider>
                <Layout
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Header
                        style={{
                            paddingRight: 16,
                            background: colorBgContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            width: '50%',
                            marginLeft: 'auto',
                            marginRight: 0,
                        }}
                    >
                        <Space size='middle'>
                            <Select
                                defaultValue={i18n.language}
                                onChange={handleChangeLocales}
                                options={locales}
                                style={{
                                    width: 120,
                                }}
                            />
                            <Badge count={notificationCount} overflowCount={10}>
                                <Button shape='circle' icon={<BellFilled />} />
                            </Badge>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <Button type='link' icon={<UserOutlined />}>
                                    {t('main.navigation.account_quick_access.label')}
                                </Button>
                            </Dropdown>
                        </Space>
                    </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                            padding: 12,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: 4,
                        }}
                    >
                        {children}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                            background: colorBgContainer,
                        }}
                    >
                        {t('main.common.footer')}
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}
