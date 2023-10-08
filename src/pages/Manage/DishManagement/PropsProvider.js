export default function propsProvider(props) {
    const { history, dispatch, t, columns, data } = props;
    return { history, dispatch, t, columns, data };
}
