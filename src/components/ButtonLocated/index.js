import { CloudDownloadOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Button as MobileButton } from 'antd-mobile';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddButton = ({ handleCreateNewClick }) => {
    const { t } = useTranslation();
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                handleCreateNewClick();
                return newLoadings;
            });
        }, 500);
    };
    return (
        <>
            <Button type='primary' icon={<PlusOutlined />} loading={loadings[0]} onClick={() => enterLoading(0)}>
                {t('main.components.button.add')}
            </Button>
        </>
    );
};

const RefreshButton = ({ handleRefreshClick }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button icon={<CloudDownloadOutlined />} onClick={() => handleRefreshClick()}>
                {t('main.components.button.refresh')}
            </Button>
        </>
    );
};

const ActiveLogButton = ({ handleActiveLogClick }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button icon={<HourglassOutlined />} onClick={() => handleActiveLogClick()}>
                {t('main.components.button.active_log')}
            </Button>
        </>
    );
};

const ResetButton = () => {
    const { t } = useTranslation();
    return (
        <>
            <Button type='text' htmlType='reset'>
                {t('main.components.button.reset')}
            </Button>
        </>
    );
};

const CancelButton = ({ handleButton, disabled }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button danger onClick={handleButton} disabled={disabled}>
                {t('main.components.button.cancel')}
            </Button>
        </>
    );
};

const CreateButton = ({ form, handleButton, disabledBtn }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button
                onClick={() => handleButton(form.getFieldsValue())}
                form={form}
                type='primary'
                disabled={disabledBtn}
            >
                {t('main.components.button.create')}
            </Button>
        </>
    );
};

const AddToCartButton = ({ data, handleButton, disabledBtn }) => {
    const { t } = useTranslation();
    return (
        <>
            <MobileButton onClick={handleButton} fill='solid' style={{ backgroundColor: '#5097fc', color: 'white' }}>
                {t('main.components.button.add_to_card')}
            </MobileButton>
        </>
    );
};

const PayButton = ({ data, handleButton }) => {
    const { t } = useTranslation();
    return (
        <>
            <MobileButton onClick={handleButton} fill='solid' block color='primary'>
                {t('main.components.button.pay')}
            </MobileButton>
        </>
    );
};

const UndoButton = ({ data, handleButton }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button type='text' size='small' ghost onClick={handleButton}>
                {t('main.components.button.undo')}
            </Button>
        </>
    );
};

const CallStaffButton = ({ data, handleButton, callStaffLoading, callStaffDisabled }) => {
    const { t } = useTranslation();
    return (
        <>
            <MobileButton
                onClick={handleButton}
                fill='solid'
                block
                loading={callStaffLoading}
                disabled={callStaffDisabled}
            >
                {t('main.components.button.call_staff')}
            </MobileButton>
        </>
    );
};
const UseDiscountButton = ({ data, handleButton, disabledBtn }) => {
    const { t } = useTranslation();
    return (
        <>
            <MobileButton
                fill='solid'
                style={{ backgroundColor: !disabledBtn && '#5097fc', color: !disabledBtn && 'white' }}
                onClick={() => handleButton(data)}
                form={data}
                disabled={disabledBtn}
            >
                {t('main.components.button.use')}
            </MobileButton>
        </>
    );
};

const UpdateButton = ({ form, handleButton }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button onClick={() => handleButton(form.getFieldsValue())} form={form} type='primary'>
                {t('main.components.button.update')}
            </Button>
        </>
    );
};

const NewOrderButton = ({ handleButton }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button type='text' icon={<PlusOutlined />} style={{ color: '#5d56d5' }} onClick={handleButton}>
                {t('main.components.button.new_order')}
            </Button>
        </>
    );
};

const AddOrderItem = ({ handleButton }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button type='dashed' onClick={handleButton} block icon={<PlusOutlined />}>
                {t('main.components.button.add_order_item')}
            </Button>
        </>
    );
};

const SubmitSystemSettingsButtom = ({ form, handleButton, disabled }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button
                type='primary'
                onClick={(e) => handleButton(form.getFieldsValue(), (e.currentTarget.disabled = true))}
                form={form}
                disabled={disabled}
            >
                {t('main.components.button.submit')}
            </Button>
        </>
    );
};
const SubmitButtom = ({ form, handleButton, disabledBtn }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button
                type='primary'
                onClick={() => handleButton(form.getFieldsValue())}
                form={form}
                disabled={disabledBtn}
            >
                {t('main.components.button.submit')}
            </Button>
        </>
    );
};
const ChangePasswordButton = ({ form, handleButton, disabledBtn }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button onClick={handleButton} form={form} disabled={disabledBtn}>
                {t('main.components.button.change_pasword')}
            </Button>
        </>
    );
};
const OrderButton = ({ handleOrderClick }) => {
    const { t } = useTranslation();
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                handleOrderClick();
                return newLoadings;
            });
        }, 500);
    };
    return (
        <>
            <Button
                type='primary'
                style={{ backgroundColor: '#5097fc' }}
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
                block
            >
                {t('main.components.button.order')}
            </Button>
        </>
    );
};
export const ButtonLocated = {
    AddButton,
    RefreshButton,
    ActiveLogButton,
    ResetButton,
    CancelButton,
    CreateButton,
    UpdateButton,
    NewOrderButton,
    AddOrderItem,
    SubmitSystemSettingsButtom,
    OrderButton,
    SubmitButtom,
    ChangePasswordButton,
    UseDiscountButton,
    AddToCartButton,
    PayButton,
    CallStaffButton,
    UndoButton,
};
