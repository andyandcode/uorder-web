import { Layout, Space } from 'antd';
import { ButtonLocated } from '../../../components/ButtonLocated';
import { CustomAlert } from '../../../components/CustomAlert';
import CustomTable from '../../../components/CustomTable';
import TableColumns from '../../../components/CustomTable/columnConfigs';
import CreateModal from './subViews/createModal';
import EditModal from './subViews/editModal';

const { Content } = Layout;

export default function MainView(props) {
    const {
        t,
        columns,
        tableData,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        handleQuickTurnOffConfirm,
        handleQuickActionButtonTurnOnClick,
        handleQuickDeleteConfirm,
        handleCreateNewClick,
        handleRefreshClick,
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
                    handleActionButtonEditClick={(data) => handleActionButtonEditClick(data)}
                    handleActionButtonDeleteClick={(data) => handleActionButtonDeleteClick(data)}
                    handleActionButtonTurnOffClick={(data) => handleActionButtonTurnOffClick(data)}
                    handleActionButtonTurnOnClick={(data) => handleActionButtonTurnOnClick(data)}
                    handleQuickTurnOffConfirm={(data) => handleQuickTurnOffConfirm(data)}
                    handleQuickActionButtonTurnOnClick={(data) => handleQuickActionButtonTurnOnClick(data)}
                    handleQuickDeleteConfirm={(data) => handleQuickDeleteConfirm(data)}
                    switchActionColumn={TableColumns.TableSwitch.AccountTable}
                />
                <CreateModal {...props}></CreateModal>
                <EditModal {...props}></EditModal>
            </Content>
        </>
    );
}
