import { useTranslation } from 'react-i18next';

export default function DishMainView(props) {
    const { t } = useTranslation();
    return <h1>{t('app.layout.menu.manage.dish', { what: 'nehe' })}</h1>;
}
