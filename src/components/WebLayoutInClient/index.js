export default function WebLayoutInClient(props) {
    const { children } = props;
    return (
        <>
            <div className='web_layout'>{children}</div>
        </>
    );
}
