import { NumericFormat } from 'react-number-format';

const Minimal = ({ value }) => {
    return (
        <>
            <NumericFormat thousandSeparator=',' displayType='text' value={value} suffix=' VND' />
        </>
    );
};
const Highlight = ({ value }) => {
    return (
        <>
            <NumericFormat
                style={{ color: '#f75e51', fontSize: 16, fontWeight: 500 }}
                thousandSeparator=','
                displayType='text'
                value={value}
                suffix=' VND'
            />
        </>
    );
};

export const CurrencyFormat = { Minimal, Highlight };
