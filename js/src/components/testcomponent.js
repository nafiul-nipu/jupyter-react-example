import React from 'react';

export default function TestComponent( props ) {
    const style = {
        color: props.color
    };
    return (
        <h1 style={style}>This a test of putting React in a notebook</h1>
    );
}
