import { CloudDownloadOutlined, HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Layout, Space, Typography } from 'antd';
import React from 'react';
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
        data,
        enterLoading,
        loadings,
        handleActionButtonEditClick,
        handleActionButtonDeleteClick,
        handleActionButtonTurnOffClick,
        handleActionButtonTurnOnClick,
        expandedRowRenderSelection,
        handleRefreshDataClick,
        loadingsRefreshButton,
        loadingTable,
    } = props;

    return (
        <>
            <Content>
                <Title style={{ marginBottom: 32 }} level={3}>
                    {t('app.feature.manage.dish.label')}
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
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        loading={loadings[0]}
                        onClick={() => enterLoading(0)}
                    >
                        {t('app.feature.manage.dish.button.add')}
                    </Button>
                    <Button
                        icon={<CloudDownloadOutlined />}
                        loading={loadingsRefreshButton[1]}
                        onClick={() => handleRefreshDataClick(1)}
                    >
                        {t('app.feature.manage.dish.button.refresh')}
                    </Button>
                    <Button icon={<HourglassOutlined />} block>
                        {t('app.feature.manage.dish.button.activeLog')}
                    </Button>
                </Space>
                <CustomTable
                    loadingTable={loadingTable}
                    columns={columns}
                    dataSource={data}
                    handleActionButtonEditClick={(data) => handleActionButtonEditClick(data)}
                    handleActionButtonDeleteClick={(data) => handleActionButtonDeleteClick(data)}
                    handleActionButtonTurnOffClick={(data) => handleActionButtonTurnOffClick(data)}
                    handleActionButtonTurnOnClick={(data) => handleActionButtonTurnOnClick(data)}
                    expandedRowRenderSelection={() =>
                        expandedRowRenderSelection(t, data, TableColumns.TableSwitch.DishTable)
                    }
                />
                <CreateModal {...props}></CreateModal>
                <EditModal {...props}></EditModal>
            </Content>
        </>
    );
}
