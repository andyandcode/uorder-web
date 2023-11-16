import { Modal } from 'antd';
import { FormBuilder } from '../../../../../components/FormBuilder';

export default function ViewModal({
    t,
    viewData,
    openViewModel,
    handleViewCancelClick,
    handleCreateSubmitClick,
    messageContextHolder,
    handleChangeOrderStatus,
    handlePrintClick,
}) {
    const target = t('main.common.system_key.booking');
    return (
        <>
            <Modal
                open={openViewModel}
                title={t('main.entities.form_view_title', {
                    target: target,
                })}
                onCancel={handleViewCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='50%'
            >
                {messageContextHolder}
                <FormBuilder.ViewOrderForm
                    viewData={viewData}
                    handleButtonSubmit={handleCreateSubmitClick}
                    handleButtonCancel={handleViewCancelClick}
                    handleChangeOrderStatus={handleChangeOrderStatus}
                    handlePrintClick={handlePrintClick}
                />
            </Modal>
        </>
    );
}
