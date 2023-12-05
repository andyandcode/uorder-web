import { Modal } from 'antd';
import { FormBuilder } from '../../../../../components/FormBuilder';

export default function PayBillModal({
    t,
    openPayBillModal,
    handlePayBillCancelClick,
    messageContextHolder,
    viewData,
    handlePayBillSubmitClick,
    payBillForm,
}) {
    return (
        <>
            <Modal
                open={openPayBillModal}
                title={t('main.entities.form_pay_bill_title')}
                onCancel={handlePayBillCancelClick}
                maskClosable={false}
                footer={[]}
                centered
                width='auto'
            >
                {messageContextHolder}
                <FormBuilder.PayBillForm
                    form={payBillForm}
                    viewData={viewData}
                    handleButtonSubmit={handlePayBillSubmitClick}
                    handleButtonCancel={handlePayBillCancelClick}
                />
            </Modal>
        </>
    );
}
