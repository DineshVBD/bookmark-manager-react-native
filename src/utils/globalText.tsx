import React, {FunctionComponent} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

interface GlobalTextProps {
  children?: React.JSX.Element | string;
  style?: StyleProp<TextStyle>;
}

// Global text component for a unified font style elsewhere.
const GlobalText: FunctionComponent<GlobalTextProps | TextProps> = ({
  children,
  style,
  ...props
}): React.JSX.Element => {
  return (
    <Text style={[styles.text, style ?? style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NunitoSans_10pt-Regular',
    color: 'black',
  },
});

export default GlobalText;
