import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';

export default function ValidateSubmitButton(props) {
    const [submittable, setSubmittable] = useState(false);
    const { form, label, onClick } = props;
    // Watch all values
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({
            validateOnly: true,
        }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button onClick={onClick} type='primary' htmlType='submit' disabled={!submittable}>
            {label}
        </Button>
    );
}
