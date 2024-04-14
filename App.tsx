import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomePage from './src/components/Homepage/homepage';
import TopicDetails from './src/components/TopicDetails/topicDetails';
import TopicList from './src/components/TopicList/topicList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mark it!" component={HomePage} />
        <Stack.Screen name="My Topics" component={TopicList} />
        <Stack.Screen
          name="Topic Details"
          component={TopicDetails}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
