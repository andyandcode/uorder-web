import { Modal } from 'antd';
import { FormBuilder } from '../../../../components/FormBuilder';

export default function ViewModal({ t, viewData, openViewModel, handleViewCancelClick }) {
    const target = t('main.common.system_key.discount_code');
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
                width='auto'
            >
                <FormBuilder.ViewDiscountCodeForm
                    t={t}
                    viewData={viewData}
                    handleButtonCancel={handleViewCancelClick}
                />
            </Modal>
        </>
    );
}
