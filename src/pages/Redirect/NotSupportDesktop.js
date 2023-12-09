import { ErrorBlock } from 'antd-mobile';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotSupportDesktop() {
    const { t } = useTranslation();
    return (
        <ErrorBlock
            status='default'
            title={t('main.message.not_support_laptop_title')}
            description={t('main.message.not_support_laptop_description')}
            fullPage
        />
    );
}
