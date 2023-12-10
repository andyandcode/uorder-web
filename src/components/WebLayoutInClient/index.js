export default function WebLayoutInClient(props) {
    const { children } = props;

    // if (isMobile) {
    //     return <NotSupportDesktop />;
    // }

    return (
        <>
            <div className='web_layout'>{children}</div>
        </>
    );
}
