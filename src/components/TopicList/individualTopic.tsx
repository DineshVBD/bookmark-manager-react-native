//import liraries
import React, {FunctionComponent} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from '../../utils/colors';
import GlobalText from '../../utils/globalText';

type IndividualTopicProps = {
  topic: string;
};

// create a component
const IndividualTopic: FunctionComponent<IndividualTopicProps> = ({
  topic,
}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <GlobalText style={styles.topic} numberOfLines={1}>
        {topic}
      </GlobalText>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width - 40;

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT,
    borderRadius: 10,
    elevation: 5,
    height: 50,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 15,
    width: deviceWidth,
  },
  topic: {
    paddingLeft: 10,
    textTransform: 'uppercase',
  },
});

//make this component available to the app
export default IndividualTopic;
