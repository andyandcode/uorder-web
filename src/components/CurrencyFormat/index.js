import { NumericFormat } from 'react-number-format';

export default function CurrencyFormat({ value }) {
    return (
        <>
            <NumericFormat thousandSeparator=',' displayType='text' defaultValue={value} suffix=' VND' />
        </>
    );
}
