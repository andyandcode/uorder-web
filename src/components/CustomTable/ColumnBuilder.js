import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Table } from 'antd';
import TableColumns from './columnConfigs';

const { Column } = Table;

const menuSelection = ({
    t,
    record,
    handleActionButtonDeleteClick,
    handleActionButtonTurnOffClick,
    handleActionButtonTurnOnClick,
}) => {
    const process = () => {
        let menuArr = [
            {
                label: t('main.components.button.delete'),
                key: '1',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => handleActionButtonDeleteClick(record),
            },
        ];
        if (record.hasOwnProperty('isActive')) {
            if (record.isActive === true) {
                menuArr.push({
                    label: t('main.components.button.turn_off'),
                    key: '2',
                    icon: <EyeInvisibleOutlined />,
                    onClick: () => handleActionButtonTurnOffClick(record),
                });
            } else {
                menuArr.push({
                    label: t('main.components.button.turn_on'),
                    key: '2',
                    icon: <EyeOutlined />,
                    onClick: () => handleActionButtonTurnOnClick(record),
                });
            }
        }
        return menuArr;
    };

    return (
        <>
            <Menu items={process()} />
        </>
    );
};

const ActionColumn = ({
    t,
    handleActionButtonEditClick,
    handleActionButtonDeleteClick,
    handleActionButtonTurnOffClick,
    handleActionButtonTurnOnClick,
    switchActionColumn,
    handleActionButtonViewClick,
}) => {
    switch (switchActionColumn) {
        case TableColumns.TableSwitch.OrderTable:
            return (
                <>
                    <Column
                        title={t('main.components.table.action_column')}
                        key='action'
                        align='center'
                        render={(record) => (
                            <Space>
                                <Button type='text' onClick={() => handleActionButtonViewClick(record)}>
                                    {t('main.components.button.view_order')}
                                </Button>
                            </Space>
                        )}
                    />
                </>
            );
        case TableColumns.TableSwitch.DiscountCodeTable:
            return (
                <>
                    <Column
                        title={t('main.components.table.action_column')}
                        key='action'
                        align='center'
                        render={(record) => (
                            <Space>
                                <Dropdown.Button
                                    type='text'
                                    dropdownRender={() =>
                                        menuSelection({
                                            t,
                                            record,
                                            handleActionButtonDeleteClick,
                                            handleActionButtonTurnOffClick,
                                            handleActionButtonTurnOnClick,
                                        })
                                    }
                                    trigger={['click']}
                                    onClick={() => handleActionButtonViewClick(record)}
                                >
                                    {t('main.components.button.view')}
                                </Dropdown.Button>
                            </Space>
                        )}
                    />
                </>
            );
        default:
            return (
                <>
                    <Column
                        title={t('main.components.table.action_column')}
                        key='action'
                        align='center'
                        render={(record) => (
                            <Space>
                                <Dropdown.Button
                                    type='text'
                                    dropdownRender={() =>
                                        menuSelection({
                                            t,
                                            record,
                                            handleActionButtonDeleteClick,
                                            handleActionButtonTurnOffClick,
                                            handleActionButtonTurnOnClick,
                                        })
                                    }
                                    trigger={['click']}
                                    onClick={() => handleActionButtonEditClick(record)}
                                >
                                    {t('main.components.button.edit')}
                                </Dropdown.Button>
                            </Space>
                        )}
                    />
                </>
            );
    }
};

const ExtraColumnBuilder = (props, key) => {
    const { t, handleShowQrCodeClick } = props;

    switch (key) {
        case ShowQrCodeColumnKey:
            return (
                <>
                    <Column
                        title={t('main.entities.qr_code')}
                        key='action'
                        align='center'
                        render={(record) => (
                            <Button
                                type='text'
                                icon={<QrcodeOutlined style={{ fontSize: '16px', color: '#08c' }} />}
                                onClick={() => handleShowQrCodeClick(record)}
                            ></Button>
                        )}
                    />
                </>
            );

        default:
            break;
    }
};

const ShowQrCodeColumnKey = 'showqrcode';

export const ColumnBuilderKey = { ShowQrCodeColumnKey };

export const ColumnBuilder = { ActionColumn, ExtraColumnBuilder };
