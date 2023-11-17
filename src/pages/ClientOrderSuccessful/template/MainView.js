import { Result } from 'antd';

export default function MainView({ t }) {
    return (
        <>
            <Result
                status='success'
                title={t('main.pages.tracker.booking_successfully_title')}
                subTitle={t('main.pages.tracker.booking_successfully_subtitle')}
            />
        </>
    );
}
