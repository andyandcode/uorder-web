import { FormBuilder } from '../../../../components/FormBuilder';

export default function MainView({ loginForm, t, handleLoginSubmitClick, contextHolder }) {
    return (
        <>
            {contextHolder}
            <FormBuilder.LoginForm t={t} form={loginForm} handleButtonSubmit={handleLoginSubmitClick} />
        </>
    );
}
