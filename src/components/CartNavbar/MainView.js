import { RightOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Typography } from 'antd';

export default function MainView({ t, isShowNavbar, orderResult, handleViewOrderClick }) {
    return (
        <Layout.Content style={{ display: isShowNavbar === false ? 'none' : '' }}>
            <div className='cart_zone'>
                <div className='cart_navbar' onClick={handleViewOrderClick}>
                    <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Col>
                            <Typography.Text>
                                {orderResult.totalItems} {t('main.components.cart_navbar.items')}
                            </Typography.Text>{' '}
                            <br />
                            <Typography.Text>
                                {orderResult.total?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                            </Typography.Text>
                        </Col>
                        <Col>
                            {t('main.components.button.view_order')} <RightOutlined />
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout.Content>
    );
}
