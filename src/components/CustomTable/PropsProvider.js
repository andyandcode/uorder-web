export default function propsProvider(props) {
    const { t, columns, dataSource, locale } = props;
    return { t, columns, dataSource, locale };
}
