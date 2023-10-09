import { HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Layout, Space, Typography } from 'antd';
import CustomTable from '../../../../components/CustomTable';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView(props) {
    const { t, columns, data, enterLoading, loadings } = props;

    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('app.feature.manage.dish.label')}
                </Title>
                <Divider />

                <Space
                    direction='horizontal'
                    align='end'
                    style={{
                        width: '100%',
                        paddingBottom: '24px',
                    }}
                >
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        loading={loadings[0]}
                        onClick={() => enterLoading(0)}
                    >
                        {t('app.feature.manage.dish.button.add')}
                    </Button>
                    <Button icon={<HourglassOutlined />} block>
                        {t('app.feature.manage.dish.button.activeLog')}
                    </Button>
                </Space>
                <CustomTable columns={columns} dataSource={data} />
            </Content>
        </>
    );
}
