import { Divider, Layout, Typography } from 'antd';
import React from 'react';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView({ t }) {
    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.navigation.active_log')}
                </Title>
                <Divider />
            </Content>
        </>
    );
}
