import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name: string, params: Object) {
    //@ts-ignore
    navigationRef.current?.navigate(name, params);
}