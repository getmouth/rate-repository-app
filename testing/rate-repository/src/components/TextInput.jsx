import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import theme from '../theme';

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [style, { borderColor: error ? theme.colors.error : theme.colors.mainBackground }];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;