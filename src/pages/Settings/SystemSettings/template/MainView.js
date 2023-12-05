import { Divider, Layout, Typography } from 'antd';
import { FormBuilder } from '../../../../components/FormBuilder';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView({ t, editForm, settingsData, handleDomainSubmitClick, messageContextHolder }) {
    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.navigation.settings.system')}
                </Title>
                <Divider style={{ marginTop: 60 }} />
                {messageContextHolder}
                <FormBuilder.SystemSettingsForm
                    form={editForm}
                    data={settingsData}
                    handleDomainSubmitClick={handleDomainSubmitClick}
                />
            </Content>
        </>
    );
}
