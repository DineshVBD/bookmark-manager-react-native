//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import RootStackParamList from '../../types/rootStack';
import colors from '../../utils/colors';
import GlobalText from '../../utils/globalText';
import IndividualTopic from '../IndividualTopic/individualTopic';
import Loader from '../Loader/loader';
import {TopicListPageConstants} from './constants';

type TopicListProps = NativeStackScreenProps<RootStackParamList, 'My Topics'>;

// List of user topics' component.
const TopicList: FunctionComponent<TopicListProps> = ({
  navigation,
}: TopicListProps): React.JSX.Element => {
  // State to hold all topics.
  const [topics, setTopics] = useState<string[]>([]);

  // Loading prop to hold the loading state.
  const [loading, setLoading] = useState<boolean>(true);

  // Imported Constants.
  const {TOPIC_STORAGE_NAME, NO_TOPICS} = TopicListPageConstants;

  // Fetches the list of all topics from Async storage(or local storage).
  const findTopics: () => Promise<void> = async () => {
    let topics: string | null = '';
    topics = await AsyncStorage.getItem(TOPIC_STORAGE_NAME);
    if (topics != null) {
      setTopics(topics.split(','));
    } else {
      AsyncStorage.setItem(
        TOPIC_STORAGE_NAME,
        'Topic 1,Topic 2,Topic 3,Topic 4,Topic 5',
      );
      topics = await AsyncStorage.getItem(TOPIC_STORAGE_NAME);
      setTopics(topics?.split(',') ?? []);
    }
    setLoading(false);
  };

  // Callback function to remove a topic.
  const removeTopic = useCallback(
    (removedTopic: string): void => {
      const filteredTopics = topics.filter(topic => topic !== removedTopic);
      AsyncStorage.setItem(TOPIC_STORAGE_NAME, filteredTopics.toString());
      setTopics(filteredTopics);
    },
    [topics],
  );

  // Runs only once on mount to fetch a list of all topics.
  useEffect(() => {
    findTopics();
  }, []);

  const individualTopicScreenNavigator = useCallback((item: string) => {
    navigation.navigate('Topic Details', {
      name: item,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader />
      ) : topics.length ? (
        <FlatList
          data={topics}
          contentContainerStyle={{paddingBottom: 20}}
          keyExtractor={(topic: string) => topic}
          renderItem={({item}) => (
            <IndividualTopic
              individualTopicScreenNavigator={individualTopicScreenNavigator}
              removeTopic={removeTopic}
              topic={item}
            />
          )}
        />
      ) : (
        <View style={styles.noTopicContainer}>
          <GlobalText style={styles.noTopicText}>{NO_TOPICS}</GlobalText>
        </View>
      )}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT,
    flex: 1,
  },
  noTopicContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noTopicText: {
    color: colors.GREY,
    fontSize: 16,
  },
});

export default TopicList;
