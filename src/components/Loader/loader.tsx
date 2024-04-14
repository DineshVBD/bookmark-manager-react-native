import LottieView from 'lottie-react-native';
import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';

// Loader Generic component
const Loader: FunctionComponent<{}> = (): React.JSX.Element => {
  return (
    <View style={[styles.loadingContainer, styles.horizontal]}>
      <LottieView
        source={require('../../../assets/animations/Animation - 1711886303664.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    height: 1000,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  animation: {
    height: 200,
    width: 200,
  },
});

export default Loader;
