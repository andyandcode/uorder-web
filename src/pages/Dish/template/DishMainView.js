import { useTranslation } from 'react-i18next';

export default function DishMainView(props) {
    const { t, i18n } = useTranslation();
    return <h1>{t('app.layout.menu.manage.dish', { what: 'nehe' })}</h1>;
}
