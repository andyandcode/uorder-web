import { useTranslation } from 'react-i18next';
import Conainer from './Container';

export default function WebLayout(props) {
    const { children } = props;
    const { t, i18n } = useTranslation();

    const webLayoutProps = {
        t,
        i18n,
        children,
    };

    return <Conainer {...webLayoutProps} />;
}
