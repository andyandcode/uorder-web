import { Select } from 'antd';
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
