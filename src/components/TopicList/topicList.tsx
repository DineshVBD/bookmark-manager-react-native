//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from '../../utils/colors';
import IndividualTopic from './individualTopic';

// create a component
const TopicList: FunctionComponent<{}> = (): React.JSX.Element => {
  const [topics, setTopics] = useState<string[]>([]);

  const findTopics = async () => {
    let topics: string | null = '';
    topics = await AsyncStorage.getItem('topics');
    if (topics != null) {
      setTopics(topics.split(','));
    } else {
      AsyncStorage.setItem(
        'topics',
        'Topic 1,Topic 2,Topic 3,Topic 4,Topic 5,Topic 1,Topic 2,Topic 3,Topic 4,Topic 5,Topic 1,Topic 2,Topic 3,Topic 4,Topic 5',
      );
      topics = await AsyncStorage.getItem('topics');
      setTopics(topics?.split(',') ?? []);
    }
  };

  useEffect(() => {
    findTopics();
  }, []);

  return (
    <View style={styles.container}>
      {topics.length ? (
        <FlatList
          data={topics}
          keyExtractor={(topic: string, index: number) => index.toString()}
          renderItem={({item}) => <IndividualTopic topic={item} />}
        />
      ) : (
        <Text>No Topics to show...</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },
});

//make this component available to the app
export default TopicList;
