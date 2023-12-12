import { Layout, Space } from 'antd';
import { ButtonLocated } from '../../../components/ButtonLocated';
import { CustomAlert } from '../../../components/CustomAlert';
import CustomTable from '../../../components/CustomTable';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import CreateModal from './subviews/createModal';
import ViewModal from './subviews/viewModal';

const { Content } = Layout;

export default function MainView(props) {
    const {
        t,
        columns,
        tableData,
        handleActionButtonViewClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleCreateNewClick,
        handleRefreshClick,
        createForm,
        openCreateModel,
        handleCreateCancelClick,
        messageContextHolder,
        handleCreateSubmitClick,
        viewData,
        openViewModel,
        handleViewCancelClick,
        deleteAlert,
        handleUndoDeleteClick,
        setDeleteAlert,
    } = props;

    return (
        <>
            {deleteAlert.timestamp > 0 && (
                <CustomAlert.UndoDeleteAlert
                    t={t}
                    handleButton={handleUndoDeleteClick}
                    target={deleteAlert.data.name}
                    timestamp={deleteAlert.timestamp}
                    timeoutEvent={setDeleteAlert}
                />
            )}
            <Content>
                <Space
                    direction='horizontal'
                    align='end'
                    style={{
                        width: '100%',
                        paddingBottom: '24px',
                    }}
                >
                    <ButtonLocated.AddButton handleCreateNewClick={handleCreateNewClick} />
                    <ButtonLocated.RefreshButton handleRefreshClick={handleRefreshClick} />
                </Space>
                <CustomTable
                    columns={columns}
                    dataSource={tableData}
                    handleActionButtonEditClick={(data) => handleActionButtonViewClick(data)}
                    handleActionButtonDeleteClick={(data) => handleActionButtonDeleteClick(data)}
                    handleActionButtonTurnOffClick={(data) => handleActionButtonTurnOffClick(data)}
                    handleActionButtonTurnOnClick={(data) => handleActionButtonTurnOnClick(data)}
                    switchActionColumn={TableColumns.TableSwitch.DiscountCodeTable}
                    handleActionButtonViewClick={handleActionButtonViewClick}
                />
                <CreateModal
                    t={t}
                    createForm={createForm}
                    openCreateModel={openCreateModel}
                    handleCreateCancelClick={handleCreateCancelClick}
                    messageContextHolder={messageContextHolder}
                    handleCreateSubmitClick={handleCreateSubmitClick}
                />
                <ViewModal
                    t={t}
                    viewData={viewData}
                    openViewModel={openViewModel}
                    handleViewCancelClick={handleViewCancelClick}
                />
            </Content>
        </>
    );
}
