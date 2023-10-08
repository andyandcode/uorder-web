import { Layout, Table, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView(props) {
    const { t, columns, data } = props;

    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('app.feature.manage.dish.label')}
                </Title>
                <Table columns={columns} dataSource={data} />
            </Content>
        </>
    );
}
