import { Select, Typography } from 'antd';
import { SelectLanguageMobile } from '../UseLanguages';

export default function TopMenu({ t, data, menuData }) {
    const options = data.map((e, index) => ({ label: e.name, value: e.id, href: e.id, key: index }));
    const handleChange = (value) => {
        const elementToScroll = document.getElementById(value);
        if (elementToScroll) {
            elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    console.log(data[0]);
    return (
        <>
            <div className='top_menu'>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography.Title level={3} style={{ margin: 4 }}>
                        {menuData.name}
                    </Typography.Title>
                    <SelectLanguageMobile />
                </div>
                <Select
                    options={options}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    placeholder={t('main.pages.booking.select_menu')}
                />
            </div>
        </>
    );
}
