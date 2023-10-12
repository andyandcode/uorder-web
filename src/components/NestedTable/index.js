import { useTranslation } from 'react-i18next';
import Conainer from './Container';

export default function NestedTable(props) {
    const { t } = useTranslation();

    const dishProps = {
        ...props,
        t,
    };
    return <Conainer {...dishProps} />;
}
