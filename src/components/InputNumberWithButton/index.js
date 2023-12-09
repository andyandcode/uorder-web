import { Stepper } from 'antd-mobile';
import React from 'react';
import { ButtonLocated } from '../ButtonLocated';

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
    handleChange = (value) => {
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
                    <Stepper
                        min={0}
                        max={10}
                        value={this.state.qty}
                        key={this.props.dataProvider.id}
                        name='qty'
                        onChange={(value) => {
                            this.handleChange(value);
                        }}
                        style={{
                            '--border': '1px solid #f5f5f5',
                            '--border-inner': 'none',
                            '--height': '36px',
                            '--input-background-color': 'var(--adm-color-background)',
                            '--active-border': '1px solid #1677ff',
                        }}
                    />
                </div>
            );
        } else {
            return <ButtonLocated.AddToCartButton handleButton={this.handleIncrement} />;
        }
    }
}
