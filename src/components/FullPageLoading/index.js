import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { loadingSelector } from '../../app/selector';

export default function FullPageLoading() {
    const isLoading = useSelector(loadingSelector).isLoading;
    if (isLoading) {
        return (
            <>
                <div className='content'>
                    <Spin tip='Loading'></Spin>
                </div>
            </>
        );
    }
}
