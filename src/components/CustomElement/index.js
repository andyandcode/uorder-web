const CustomRadio = ({ name, id, data, handleSelectPayment }) => {
    return (
        <>
            <div className='custom_radio'>
                <input
                    type='radio'
                    name={name}
                    id={id}
                    value={data.value}
                    onChange={() => handleSelectPayment(data)}
                    checked={data.checked}
                />
                <label htmlFor={id} aria-label={data.label}>
                    {data.label}
                    <span></span>
                </label>
            </div>
        </>
    );
};

export const CustomElement = { CustomRadio };
