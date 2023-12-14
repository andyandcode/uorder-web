import { Anchor, Typography } from 'antd';
import { SelectLanguageMobile } from '../UseLanguages';

export default function TopMenu({ t, data, menuData }) {
    const options = data.map((e) => ({ title: e.name, key: e.id, href: `#${e.id}` }));
    return (
        <>
            <div className='top_menu'>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography.Title level={3} style={{ margin: 4 }}>
                        {menuData.name}
                    </Typography.Title>
                    <SelectLanguageMobile />
                </div>
                <Anchor direction='horizontal' items={options} style={{ width: '100vw', padding: '0 8px' }} />
            </div>
        </>
    );
}
