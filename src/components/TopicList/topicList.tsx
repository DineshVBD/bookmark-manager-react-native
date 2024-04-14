//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../utils/colors';
import IndividualTopic from './individualTopic';

type TopicListProps = NativeStackScreenProps<RootStackParamList, 'My Topics'>;

// create a component
const TopicList: FunctionComponent<TopicListProps> = ({
  navigation,
}: TopicListProps): React.JSX.Element => {
  const [topics, setTopics] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(false);
  };

  const removeTopic = useCallback(
    (removedTopic: string) => {
      setTopics(topics.filter(topic => topic !== removedTopic));
      AsyncStorage.setItem(
        'topics',
        topics.filter(topic => topic !== removedTopic).toString(),
      );
    },
    [topics],
  );

  useEffect(() => {
    findTopics();
  }, []);

  const nextscreen = useCallback((item: any) => {
    navigation.navigate('Topic Details', {
      name: item,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <LottieView
            source={require('../../../assets/animations/Animation - 1711886303664.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      ) : topics.length ? (
        <FlatList
          data={topics}
          contentContainerStyle={{paddingBottom: 20}}
          keyExtractor={(topic: string, index: number) => index.toString()}
          renderItem={({item}) => (
            // <TouchableHighlight
            //   underlayColor="GREY"
            //   onPressIn={() => {
            //     navigation.navigate('Topic Details', {
            //       name: item,
            //     });
            //   }}
            //   onPress={() => {
            //     navigation.navigate('Topic Details', {
            //       name: item,
            //     });
            //   }}>

            <IndividualTopic
              nextscreen={nextscreen}
              removeTopic={removeTopic}
              topic={item}
            />

            // </TouchableHighlight>
          )}
        />
      ) : (
        <Text>No Topics to show...</Text>
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  animation: {
    width: 200,
    height: 200,
  },
});

//make this component available to the app
export default TopicList;
