import { HourglassOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Layout, Space, Typography } from 'antd';
import React from 'react';
import CustomTable from '../../../../components/CustomTable';
import CreateModel from './subViews/createModel';
import EditModel from './subViews/editModel';

const { Content } = Layout;
const { Title } = Typography;

export default function MainView(props) {
    const {
        t,
        columns,
        data,
        enterLoading,
        loadings,
        openCreateModel,
        openEditModel,
        handleCreateSubmitClick,
        handleEditSubmitClick,
        handleEditClick,
        createForm,
        editForm,
        initialValuesInEditForm,
        handleCreateCancelClick,
        handleEditCancelClick,
        messageContextHolder,
        previewOpen,
        previewImage,
        previewTitle,
        fileList,
        handlePreview,
        handleUploadChange,
        handleCancelPreview,
        draggerFileProps,
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
                    <Button icon={<HourglassOutlined />} block>
                        {t('app.feature.manage.dish.button.activeLog')}
                    </Button>
                </Space>
                <CustomTable
                    columns={columns}
                    dataSource={data}
                    onClick={(data) => handleEditClick(data)}
                />
                <CreateModel
                    t={t}
                    openCreateModel={openCreateModel}
                    handleCreateCancelClick={handleCreateCancelClick}
                    handleCreateSubmitClick={handleCreateSubmitClick}
                    createForm={createForm}
                    messageContextHolder={messageContextHolder}
                    previewOpen={previewOpen}
                    previewImage={previewImage}
                    previewTitle={previewTitle}
                    fileList={fileList}
                    handlePreview={handlePreview}
                    handleUploadChange={handleUploadChange}
                    handleCancelPreview={handleCancelPreview}
                    draggerFileProps={draggerFileProps}
                ></CreateModel>
                <EditModel
                    t={t}
                    openEditModel={openEditModel}
                    handleEditCancelClick={handleEditCancelClick}
                    handleEditSubmitClick={handleEditSubmitClick}
                    editForm={editForm}
                    initialValuesInEditForm={initialValuesInEditForm}
                    messageContextHolder={messageContextHolder}
                    previewOpen={previewOpen}
                    previewImage={previewImage}
                    previewTitle={previewTitle}
                    fileList={fileList}
                    handlePreview={handlePreview}
                    handleUploadChange={handleUploadChange}
                    handleCancelPreview={handleCancelPreview}
                    draggerFileProps={draggerFileProps}
                ></EditModel>
            </Content>
        </>
    );
}
