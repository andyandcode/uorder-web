import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView(props) {
    const { t } = props;

    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('app.feature.sales.booking.label')}
                </Title>
            </Content>
        </>
    );
}
