import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Conainer from './Container';

export default function WebLayout(props) {
    const { children } = props;
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const history = useNavigate();

    const webLayoutProps = {
        t,
        i18n,
        children,
        dispatch,
        history,
    };

    return <Conainer {...webLayoutProps} />;
}
