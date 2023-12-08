import { Col, Row, Space, Tag, Typography } from 'antd';
import moment from 'moment';
import { ButtonLocated } from '../ButtonLocated';
import { CurrencyFormat } from '../CurrencyFormat';

export default function DiscountCard({ t, onCardClick, discountData, handleUseDiscountClick }) {
    return (
        <>
            <div className='discount_card'>
                <Row>
                    <Col flex={'auto'} onClick={onCardClick}>
                        <Space direction='vertical'>
                            <p>
                                {discountData.code}{' '}
                                {discountData.isAvailableForUse ? (
                                    <Tag bordered={false} color='success'>
                                        {t('main.message.available')}
                                    </Tag>
                                ) : (
                                    <Tag bordered={false} color='error'>
                                        {t('main.message.not_available')}
                                    </Tag>
                                )}
                            </p>
                            <Typography.Title level={5}>
                                {t('main.message.discount')} <CurrencyFormat.Minimal value={discountData.discount} />
                            </Typography.Title>
                            <Typography.Text type='secondary'>
                                {t('main.message.valid_till')} {moment(discountData.endDate).format('DD/MM/YYYY')}
                            </Typography.Text>
                        </Space>
                    </Col>
                    <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <ButtonLocated.UseDiscountButton
                            disabledBtn={discountData.discount === 0}
                            handleButton={handleUseDiscountClick}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
}
