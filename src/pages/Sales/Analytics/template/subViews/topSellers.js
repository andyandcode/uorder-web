import { Line } from '@ant-design/charts';
import { Button, Col, DatePicker, Form, Layout, Row, Typography } from 'antd';

const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Title } = Typography;

export default function TopSellersChart(props) {
    const { t, topSellersChartConfig, onFinishSelectTimeTopSellers } = props;

    return (
        <>
            <Content
                style={{
                    marginTop: 40,
                    padding: 12,
                    minHeight: 360,
                    borderRadius: 4,
                }}
            >
                <Row>
                    <Col span={12}>
                        <Title style={{ marginBottom: 32 }} level={3}>
                            {t('main.pages.analytics.top_sellers.title')}
                        </Title>
                    </Col>
                    <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Form name='time_related_controls' layout='inline' onFinish={onFinishSelectTimeTopSellers}>
                            <Form.Item
                                name='range-picker'
                                label={t('main.pages.analytics.top_sellers.select_range')}
                                rules={[
                                    {
                                        type: 'array',
                                    },
                                ]}
                            >
                                <RangePicker />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    {t('main.components.button.submit')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Line {...topSellersChartConfig} />
            </Content>
        </>
    );
}
