import { Layout, Select, Typography } from 'antd';

export default function TopMenu({ data, menuData }) {
    const options = data.map((e, index) => ({ label: e.name, value: e.id, href: e.id, key: index }));
    const handleChange = (value) => {
        const elementToScroll = document.getElementById(value);
        if (elementToScroll) {
            elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <>
            <div className='top_menu'>
                <Layout.Content>
                    <Typography.Title level={3} style={{ margin: 4 }}>
                        {menuData.name}
                    </Typography.Title>
                </Layout.Content>
                <Select options={options} style={{ width: '100%' }} onChange={handleChange} placeholder='Select menu' />
            </div>
        </>
    );
}
