import { Button } from 'antd';

export default function HorizontalTagMenu({ data }) {
    return (
        <>
            <div className='scrollmenu'>
                {data.map((e, index) => (
                    <Button href={`#${e.id}`} key={index} shape='round' style={{ margin: '12px 8px' }}>
                        {e.name}
                    </Button>
                ))}
            </div>
        </>
    );
}
