import { Select } from 'antd';
import { Button, Picker } from 'antd-mobile';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function useLanguages() {
    const requireLanguages = require.context('/public/locales/', true, /\.json$/);
    const languages = requireLanguages.keys().map((file) => {
        const langKey = file.match(/([a-z]{2}(?:-[A-Z]{2})?)\/translation\.json$/)?.[1];
        const translation = requireLanguages(file);
        return { value: langKey, label: translation.system.lang_label || langKey };
    });
    return languages;
}

export function SelectLanguage() {
    const { i18n } = useTranslation();
    const languages = useLanguages();

    const handleChangeLocales = (value) => {
        i18n.changeLanguage(value);
    };

    return (
        <>
            <Select
                defaultValue={i18n.language}
                onChange={handleChangeLocales}
                options={languages}
                style={{
                    width: 120,
                }}
            />
        </>
    );
}

export function SelectLanguageMobile() {
    const { i18n, t } = useTranslation();
    const languages = useLanguages();
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(i18n.language);

    const handleChangeLocales = (value) => {
        i18n.changeLanguage(value);
        setValue(value);
    };
    return (
        <>
            <Button
                onClick={() => {
                    setVisible(true);
                }}
            >
                {t('system.lang_label')}
            </Button>
            <Picker
                cancelText={t('main.components.button.cancel')}
                confirmText={t('main.components.button.submit')}
                visible={visible}
                value={value}
                onConfirm={handleChangeLocales}
                columns={[languages]}
                onClose={() => {
                    setVisible(false);
                }}
            />
        </>
    );
}
