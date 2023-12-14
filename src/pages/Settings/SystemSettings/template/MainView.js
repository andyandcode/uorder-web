import { Layout } from 'antd';
import { FormBuilder } from '../../../../components/FormBuilder';

const { Content } = Layout;

export default function MainView({ t, editForm, settingsData, handleDomainSubmitClick, messageContextHolder }) {
    return (
        <>
            <Content>
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
