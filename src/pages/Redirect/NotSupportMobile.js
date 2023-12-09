import { ErrorBlock } from 'antd-mobile';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotSupportMobile() {
    const { t } = useTranslation();
    return (
        <ErrorBlock
            status='default'
            title={t('main.message.not_support_mobile_title')}
            description={t('main.message.not_support_mobile_description')}
            fullPage
        />
    );
}
