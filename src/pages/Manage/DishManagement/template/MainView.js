import { Divider, Layout, Space, Typography } from 'antd';
import React from 'react';
import { ButtonLocated } from '../../../../components/ButtonLocated';
import CustomTable from '../../../../components/CustomTable';
import TableColumns from '../../../../components/CustomTable/columnConfigs';
import CreateModal from './subViews/createModal';
import EditModal from './subViews/editModal';

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
        expandedRowRenderSelection,
        loadingTable,
        handleCreateNewClick,
        handleRefreshClick,
        createForm,
        openCreateModel,
        handleCreateCancelClick,
        handleCreateSubmitClick,
        messageContextHolder,
        editForm,
        openEditModel,
        handleEditSubmitClick,
        handleEditCancelClick,
        defaultFileList,
    } = props;

    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('main.navigation.manage.dish')}
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
                </Space>
                <CustomTable
                    loadingTable={loadingTable}
                    columns={columns}
                    dataSource={tableData}
                    handleActionButtonEditClick={(data) => handleActionButtonEditClick(data)}
                    handleActionButtonDeleteClick={(data) => handleActionButtonDeleteClick(data)}
                    handleActionButtonTurnOffClick={(data) => handleActionButtonTurnOffClick(data)}
                    handleActionButtonTurnOnClick={(data) => handleActionButtonTurnOnClick(data)}
                    expandedRowRenderSelection={expandedRowRenderSelection}
                    switchActionColumn={TableColumns.TableSwitch.DishTable}
                />
                <CreateModal
                    t={t}
                    createForm={createForm}
                    openCreateModel={openCreateModel}
                    handleCreateCancelClick={handleCreateCancelClick}
                    handleCreateSubmitClick={handleCreateSubmitClick}
                    messageContextHolder={messageContextHolder}
                />
                <EditModal
                    t={t}
                    editForm={editForm}
                    openEditModel={openEditModel}
                    handleEditSubmitClick={handleEditSubmitClick}
                    handleEditCancelClick={handleEditCancelClick}
                    messageContextHolder={messageContextHolder}
                    defaultFileList={defaultFileList}
                />
            </Content>
        </>
    );
}
