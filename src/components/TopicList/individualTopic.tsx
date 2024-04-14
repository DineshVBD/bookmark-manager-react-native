//import libaries
import React, {FunctionComponent} from 'react';
import {Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../utils/colors';
import GlobalText from '../../utils/globalText';

type IndividualTopicProps = {
  topic: string;
  removeTopic: (removedTopic: string) => void;
  nextscreen: (item: any) => void;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const deviceWidth = SCREEN_WIDTH - 40;

// Negative value
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const TOPIC_HEIGHT = 50;

const TOPIC_MARGIN = 10;

// Individual Topic Component
const IndividualTopic: FunctionComponent<IndividualTopicProps> = ({
  topic,
  removeTopic,
  nextscreen,
}): React.JSX.Element => {
  const swipeLeftValue: SharedValue<number> = useSharedValue(0);

  const topicHeight: SharedValue<number> = useSharedValue(TOPIC_HEIGHT);

  const topicMargin: SharedValue<number> = useSharedValue(TOPIC_MARGIN);

  const AnimatedTouchable =
    Animated.createAnimatedComponent(TouchableHighlight);

  const swipeGestureHandler = Gesture.Pan()
    .onUpdate(event => {
      swipeLeftValue.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = swipeLeftValue.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        swipeLeftValue.value = withTiming(-SCREEN_WIDTH);
        topicHeight.value = withTiming(0);
        topicMargin.value = withTiming(0, undefined, finished => {
          finished && runOnJS(removeTopic)(topic);
        });
      } else {
        swipeLeftValue.value = withTiming(0);
      }
    });

  const swipeLeftStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: swipeLeftValue.value,
      },
    ],
  }));

  const iconOpacityStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      swipeLeftValue.value < TRANSLATE_X_THRESHOLD ? 0 : 1,
    );
    return {opacity};
  });

  const topicHeightAndMarginStyle = useAnimatedStyle(() => {
    return {height: topicHeight.value, marginVertical: topicMargin.value};
  });

  return (
    <Animated.View style={[topicHeightAndMarginStyle]}>
      <Animated.View
        style={[
          styles.iconContainer,
          iconOpacityStyle,
          topicHeightAndMarginStyle,
        ]}>
        <Icon name="trash-alt" size={25} color="#900" />
      </Animated.View>
      <GestureHandlerRootView style={{flex: 1}}>
        <AnimatedTouchable
          underlayColor={'white'}
          onPress={() => {
            nextscreen(topic);
          }}>
          <GestureDetector gesture={swipeGestureHandler}>
            <Animated.View
              style={[
                styles.container,
                swipeLeftStyle,
                topicHeightAndMarginStyle,
              ]}>
              <GlobalText style={styles.topic} numberOfLines={1}>
                {topic}
              </GlobalText>
            </Animated.View>
          </GestureDetector>
        </AnimatedTouchable>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    paddingVertical: 15,
    width: deviceWidth,
  },
  topic: {
    paddingLeft: 10,
    textTransform: 'uppercase',
  },
  iconContainer: {
    width: 50,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default IndividualTopic;
