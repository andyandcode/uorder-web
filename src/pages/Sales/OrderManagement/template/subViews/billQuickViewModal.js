import { Modal } from 'antd';
import { ComponentToPrint } from '../../../../../components/ComponentToPrint';

export default function BillQuickViewModal({ viewData, componentRef, openBillQuickViewModal }) {
    return (
        <>
            <Modal open={openBillQuickViewModal} maskClosable={true} footer={[]} centered>
                <ComponentToPrint.OrderBill data={viewData} componentRef={componentRef} />
            </Modal>
        </>
    );
}
