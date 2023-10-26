import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { Layout, Typography } from 'antd';

const { Statistic } = StatisticCard;
const { Content } = Layout;
const { Title } = Typography;

export default function OrdersToday(props) {
    const { t, ordersToday } = props;

    return (
        <>
            <Content
                style={{
                    padding: 12,
                    minHeight: 360,
                    borderRadius: 4,
                }}
            >
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.pages.analytics.orders_today.title')}
                </Title>
                <ProCard
                    tabs={{
                        onChange: (key) => {},
                        items: ordersToday.map((item) => {
                            return {
                                key: item.key,
                                style: { width: '100%' },
                                label: (
                                    <Statistic
                                        layout='vertical'
                                        title={item.title}
                                        value={item.value}
                                        status={item.status}
                                        style={{
                                            width: 120,
                                            borderInlineEnd: item.total ? '1px solid #f0f0f0' : undefined,
                                        }}
                                    />
                                ),
                                children: (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#fafafa',
                                            height: 100,
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                ),
                            };
                        }),
                    }}
                />
            </Content>
        </>
    );
}
