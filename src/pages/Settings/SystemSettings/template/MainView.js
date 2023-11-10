import { Alert, Divider, Layout, Typography } from 'antd';
import { FormBuilder } from '../../../../components/FormBuilder';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView({
    t,
    editForm,
    settingsData,
    handleDomainSubmitClick,
    handleChiefCountSubmitClick,
    messageContextHolder,
}) {
    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.navigation.settings.system')}
                </Title>
                <Divider style={{ marginTop: 60 }} />
                {settingsData.length === undefined
                    ? settingsData.domain.length === 0 && (
                          <Alert
                              message={t('main.components.alert.not_have_domain_warning')}
                              type='warning'
                              showIcon
                              style={{ marginBottom: 24 }}
                          />
                      )
                    : ''}
                {messageContextHolder}
                <FormBuilder.SystemSettingsForm
                    form={editForm}
                    data={settingsData}
                    handleDomainSubmitClick={handleDomainSubmitClick}
                    handleChiefCountSubmitClick={handleChiefCountSubmitClick}
                />
            </Content>
        </>
    );
}
