export default function propsProvider(props) {
    /*
      - To only list utilized props
      - Wrapping utilized props on each view
  */
    const { dishList, history } = props;
    return { dishList, history };
}
