import { Col, Divider, Image, Layout, Row, Typography } from 'antd';
import { FallBack } from '../../../assets/fallback';
import { CurrencyFormat } from '../../CurrencyFormat';
import InputNumberWithButton from '../../InputNumberWithButton';

export default function MainView({ t, menuData, cartItems, setCartItems }) {
    return (
        <Layout.Content style={{ margin: 8 }}>
            {menuData.map((o, index) => (
                <>
                    <Typography.Title id={o.id} key={index} style={{ marginBottom: 20 }} level={4}>
                        {o.name}
                    </Typography.Title>
                    {o.dishes.map((e, index) => (
                        <>
                            <Row key={['main', index]} gutter={[12, 0]}>
                                <Col span={6}>
                                    <Image style={{ borderRadius: 8 }} src={e.coverLink} fallback={FallBack} />
                                </Col>
                                <Col span={18}>
                                    <Row>
                                        <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography.Text level={5}>{e.name}</Typography.Text>
                                            <br />
                                            <CurrencyFormat.Minimal value={e.price} />
                                        </Col>
                                        <Col
                                            flex={'auto'}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                height: 'min-content',
                                            }}
                                        >
                                            <InputNumberWithButton
                                                t={t}
                                                key={e.id}
                                                dataProvider={e}
                                                defaultValue={0}
                                                min={0}
                                                cartItems={cartItems}
                                                setCartItems={setCartItems}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {e.desc && (
                                <Row key={['desc', index]}>
                                    <Col span={6}></Col>
                                    <Col span={18}>
                                        <Typography.Paragraph
                                            ellipsis={{
                                                rows: 3,
                                                expandable: true,
                                                symbol: 'more',
                                            }}
                                            type='secondary'
                                        >
                                            {e.desc}
                                        </Typography.Paragraph>{' '}
                                    </Col>
                                </Row>
                            )}
                            <Divider key={['divider', index]} />
                        </>
                    ))}
                </>
            ))}
        </Layout.Content>
    );
}
