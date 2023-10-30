import { FormBuilder } from '../../../../components/FormBuilder';

export default function MainView({ t, createForm, handleLoginSubmitClick }) {
    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
            }}
        >
            <FormBuilder.LoginForm t={t} form={createForm} handleButtonSubmit={handleLoginSubmitClick} />
        </div>
    );
}
