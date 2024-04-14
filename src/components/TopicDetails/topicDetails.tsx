import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

type TopicListProps = NativeStackScreenProps<
  RootStackParamList,
  'Topic Details'
>;

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

const Loader = () => {
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

const TopicDetails: FunctionComponent<TopicListProps> = ({
  route,
}: TopicListProps) => {
  const {name} = route.params;

  const [loading, setLoading] = useState<boolean>(true);

  const [html, setHtml] = useState<string>('');

  let allTweetsHtml = '';

  const fetchTweet = async () => {
    const response = await fetch(
      'https://publish.twitter.com/oembed?url=https://twitter.com/Interior/status/463440424141459456&theme=dark',
      {method: 'GET', headers: {Accepts: 'application/json'}},
    );

    if (response.ok) {
      await response.json().then(json => {
        allTweetsHtml += json.html;
      });
    }
  };

  const fetchTweets = async () => {
    await fetchTweet();
    await fetchTweet();
    await fetchTweet();
    let embedHtml = '';
    if (allTweetsHtml.length == 0) {
      embedHtml = '<p>No tweets to show</p>';
    } else {
      embedHtml = `<!DOCTYPE html>\
      <html>\
        <head>\
          <meta charset="utf-8">\
          <meta name="viewport" content="width=device-width, initial-scale=1.0">\
          </head>\
          <body>\
            ${allTweetsHtml}\
            <script>
             window.onload =
             function fn1(){
              setTimeout(() => {
                window.ReactNativeWebView.postMessage(JSON.stringify({ loaded: true }));
              },2000);
       
           }
          </script>
         
          </body>\
      </html>`;
    }
    setHtml(embedHtml);
    // setLoading(false);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {loading && <Loader />}
        <ScrollView style={{display: loading ? 'none' : 'flex'}}>
          <WebView
            onMessage={event => {
              setLoading(false);
            }}
            startInLoadingState={true}
            nestedScrollEnabled
            source={{html: html}}
            style={styles.webview}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    height: 1000,
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
  webview: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: 'grey',
  },
});

//make this component available to the app
export default TopicDetails;
