import { CloudDownloadOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
            <Button icon={<HourglassOutlined />} onClick={() => {}}>
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

const CancelButton = ({ handleButton }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button danger onClick={handleButton}>
                {t('main.components.button.cancel')}
            </Button>
        </>
    );
};

const CreateButton = ({ form, handleButton }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button onClick={() => handleButton(form.getFieldsValue())} form={form} type='primary'>
                {t('main.components.button.create')}
            </Button>
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

export const ButtonLocated = {
    AddButton,
    RefreshButton,
    ActiveLogButton,
    ResetButton,
    CancelButton,
    CreateButton,
    UpdateButton,
};
