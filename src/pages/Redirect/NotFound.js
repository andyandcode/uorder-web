import { Typography } from 'antd';
import React from 'react';

export default function NotFound() {
    return (
        <Typography.Title
            level={4}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
            }}
        >
            Not Found
        </Typography.Title>
    );
}
