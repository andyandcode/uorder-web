export default function propsProvider(props) {
    const { history, dispatch, t } = props;
    return { history, dispatch, t };
}
