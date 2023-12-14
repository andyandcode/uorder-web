import { Alert, Space } from 'antd';
import Countdown from 'react-countdown';
import { ButtonLocated } from '../ButtonLocated';

const UndoDeleteAlert = ({ t, handleButton, target, timestamp, timeoutEvent }) => {
    const renderer = ({ seconds, completed }) => {
        if (completed) {
            return timeoutEvent({});
        } else {
            return (
                <Alert
                    message={t('main.notification.undo_delete_alert.delete_message', {
                        target: target,
                        timestamp: seconds,
                    })}
                    type='warning'
                    action={
                        <Space style={{ marginLeft: 20 }}>
                            <ButtonLocated.UndoButton handleButton={handleButton} />
                        </Space>
                    }
                    closable
                    showIcon
                    style={{ position: 'fixed', bottom: 10 }}
                />
            );
        }
    };
    return (
        <>
            <Countdown date={Date.now() + timestamp * 1000} renderer={renderer} />
        </>
    );
};

export const CustomAlert = { UndoDeleteAlert };
