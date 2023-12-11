import { BellFilled, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import { SelectLanguage } from '../UseLanguages';

const { Header, Content, Footer, Sider } = Layout;

export default function MainView({
    t,
    current,
    onOpenChange,
    openSiderKeys,
    handleMenuClick,
    colorBgContainer,
    items,
    notificationCount,
    MenuList,
    children,
    access,
    contextHolder,
}) {
    return (
        <>
            {contextHolder}
            <Layout
                style={{
                    minHeight: '100vh',
                    height: '100%',
                }}
            >
                <Header
                    style={{
                        paddingRight: 16,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'fixed',
                        top: 0,
                        width: '100%',
                        zIndex: 10,
                        borderBottom: 1,
                        boxShadow:
                            '0 1px 2px 0 rgba(0,0,0,.03), 0 1px 6px -1px rgba(0,0,0,.02), 0 2px 4px 0 rgba(0,0,0,.02)',
                    }}
                >
                    <Typography.Title level={2}>{t('main.common.admin_panel')}</Typography.Title>
                    <Space size='middle'>
                        <Space>
                            <SelectLanguage />
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
                    </Space>
                </Header>
                <Layout
                    style={{
                        background: colorBgContainer,
                        marginTop: 60,
                        display: 'grid',
                        grid: '"sidebar body" 1fr "footer footer" / 250px auto',
                    }}
                >
                    <Sider
                        width={250}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            top: 'initial',
                            background: colorBgContainer,
                            gridArea: 'sidebar',
                        }}
                    >
                        <Menu
                            theme='light'
                            defaultSelectedKeys={[current]}
                            selectedKeys={[current]}
                            mode='vertical'
                            items={MenuList(access && access.data.role)}
                            onOpenChange={onOpenChange}
                            openKeys={openSiderKeys}
                            onClick={(e) => handleMenuClick(e)}
                            style={{
                                height: '100%',
                            }}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: 12,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: 4,
                            gridArea: 'body',
                            width: '100%',
                        }}
                    >
                        {children}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                            background: colorBgContainer,
                            gridArea: 'footer',
                        }}
                    >
                        {t('main.common.footer')}
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}
