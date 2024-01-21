import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomePage from './src/components/Homepage/homepage';
import TopicList from './src/components/TopicList/topicList';

type RootStackParamList = {
  'Mark it!': undefined;
  'My Topics': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mark it!" component={HomePage} />
        <Stack.Screen name="My Topics" component={TopicList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// return (
//   <>
//     <TwitterPreview
//       url={'https://twitter.com/elonmusk/status/1636162726140493825'}
//       backgroundColor={'#272A35'}
//     />
//   </>
// );
