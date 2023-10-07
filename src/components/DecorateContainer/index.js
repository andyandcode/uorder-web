import React from 'react';

export const Context = React.createContext();

export default function DecorateContainer(props) {
    const { childComponent: ChildComponent } = props;

    return <ChildComponent {...props} />;
}
