import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import React from 'react';

export default function InputNumberWithButton({ t, dataProvider, cartItems, setCartItems }) {
    return (
        <>
            <IncrementDecrement
                dataProvider={dataProvider}
                key={dataProvider.id}
                cartItems={cartItems}
                setCartItems={setCartItems}
                t={t}
            />
        </>
    );
}

class IncrementDecrement extends React.Component {
    state = {
        name: this.props.dataProvider.name,
        dishId: this.props.dataProvider.id,
        unitPrice: this.props.dataProvider.price,
        qty: 0,
        amount: 0,
    };
    handleDecrement = () => {
        let value = this.state.qty - 1;
        this.setState({ qty: value, amount: value * this.props.dataProvider.price });

        this.props.setCartItems((current) => [
            ...current,
            {
                dishId: this.props.dataProvider.id,
                unitPrice: this.props.dataProvider.price,
                qty: value,
                amount: value * this.props.dataProvider.price,
                name: this.props.dataProvider.name,
            },
        ]);
    };
    handleIncrement = () => {
        let value = this.state.qty + 1;
        this.setState({ qty: value, amount: value * this.props.dataProvider.price });

        this.props.setCartItems((current) => [
            ...current,
            {
                dishId: this.props.dataProvider.id,
                unitPrice: this.props.dataProvider.price,
                qty: value,
                amount: value * this.props.dataProvider.price,
                name: this.props.dataProvider.name,
            },
        ]);
    };

    render() {
        if (this.state.qty > 0) {
            return (
                <div style={{ display: 'flex', gap: 8, height: 'auto' }}>
                    <Button icon={<MinusOutlined />} onClick={this.handleDecrement}></Button>
                    <InputNumber
                        min={1}
                        style={{ width: '40px', height: '100%' }}
                        name='qty'
                        value={this.state.qty}
                        key={this.props.dataProvider.id}
                    />
                    <Button
                        icon={<PlusOutlined />}
                        onClick={this.handleIncrement}
                        disabled={this.state.qty === 10 ? true : false}
                    ></Button>
                </div>
            );
        } else {
            return (
                <Button icon={<PlusOutlined />} onClick={this.handleIncrement}>
                    {this.props.t('main.components.button.add_to_card')}
                </Button>
            );
        }
    }
}
