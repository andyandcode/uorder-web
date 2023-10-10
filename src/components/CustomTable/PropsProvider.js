export default function propsProvider(props) {
    const { t, columns, dataSource, locale, onClick } = props;
    return { t, columns, dataSource, locale, onClick };
}
