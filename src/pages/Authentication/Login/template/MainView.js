import { FormBuilder } from '../../../../components/FormBuilder';

export default function MainView({ loginForm, t, handleLoginSubmitClick, contextHolder, loginBtnLoading }) {
    return (
        <>
            {contextHolder}
            <FormBuilder.LoginForm
                t={t}
                form={loginForm}
                handleButtonSubmit={handleLoginSubmitClick}
                loginBtnLoading={loginBtnLoading}
            />
        </>
    );
}
