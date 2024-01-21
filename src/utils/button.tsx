import React, {FunctionComponent} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import colors from './colors';
import GlobalText from './globalText';

interface ButtonProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

// Global button component that is customizable based on needs.
const Button: FunctionComponent<ButtonProps> = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
}): React.JSX.Element => {
  return (
    <Pressable
      style={[styles.button, buttonStyle && buttonStyle]}
      onPress={onPress}>
      <GlobalText style={[styles.text, textStyle && textStyle]}>
        {title}
      </GlobalText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#969faf',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  text: {
    color: colors.DARK,
    fontSize: 16,
    letterSpacing: 0.25,
    lineHeight: 21,
  },
});

export default Button;
