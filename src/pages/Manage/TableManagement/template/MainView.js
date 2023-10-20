import { Divider, Layout, Space, Typography } from 'antd';
import React from 'react';
import { ButtonLocated } from '../../../../components/ButtonLocated';
import CustomTable from '../../../../components/CustomTable';
import { ColumnBuilderKey } from '../../../../components/CustomTable/ColumnBuilder';
import CreateModal from './subViews/createModal';
import EditModal from './subViews/editModal';
import TableColumns from '../../../../components/CustomTable/columnConfigs';

const { Content } = Layout;
const { Title } = Typography;

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
        loadingTable,
        handleShowQrCodeClick,
        handleCreateNewClick,
        handleRefreshClick,
    } = props;

    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.navigation.manage.table')}
                </Title>
                <Divider />

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
                    <ButtonLocated.ActiveLogButton />
                </Space>
                <CustomTable
                    loadingTable={loadingTable}
                    columns={columns}
                    dataSource={tableData}
                    handleActionButtonEditClick={(data) => handleActionButtonEditClick(data)}
                    handleActionButtonDeleteClick={(data) => handleActionButtonDeleteClick(data)}
                    handleActionButtonTurnOffClick={(data) => handleActionButtonTurnOffClick(data)}
                    handleActionButtonTurnOnClick={(data) => handleActionButtonTurnOnClick(data)}
                    handleQuickTurnOffConfirm={(data) => handleQuickTurnOffConfirm(data)}
                    handleQuickActionButtonTurnOnClick={(data) => handleQuickActionButtonTurnOnClick(data)}
                    handleQuickDeleteConfirm={(data) => handleQuickDeleteConfirm(data)}
                    extraColumns={ColumnBuilderKey.ShowQrCodeColumnKey}
                    handleShowQrCodeClick={handleShowQrCodeClick}
                    switchActionColumn={TableColumns.TableSwitch.TableTable}
                />
                <CreateModal {...props}></CreateModal>
                <EditModal {...props}></EditModal>
            </Content>
        </>
    );
}
