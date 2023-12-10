import { ErrorBlock } from 'antd-mobile';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation();
    return (
        <ErrorBlock
            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            style={{
                '--image-height': '150px',
            }}
            fullPage
            title={t('main.message.not_found_page_title')}
            description={t('main.message.not_found_page_description')}
        />
    );
}
