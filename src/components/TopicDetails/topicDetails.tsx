import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import RootStackParamList from '../../types/rootStack';
import Loader from '../Loader/loader';
import {TopicDetailsConstants} from './constants';

type TopicListProps = NativeStackScreenProps<
  RootStackParamList,
  'Topic Details'
>;

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

// Component that shows all the posts related to a topic.
const TopicDetails: FunctionComponent<TopicListProps> = ({
  route,
}: TopicListProps) => {
  const {name} = route.params;

  const [loading, setLoading] = useState<boolean>(true);

  const [html, setHtml] = useState<string>('');

  const {
    NO_TWEET_HTML,
    TWITTER_EMBED_URL,
    TWITTER_HTML_PREFIX,
    TWITTER_HTML_SUFFIX,
  } = TopicDetailsConstants;

  let allTweetsHtml = '';

  // Fetches tweet from the Twitter Embed API.
  const fetchTweet = async (url: string) => {
    const response = await fetch(TWITTER_EMBED_URL + url, {
      method: 'GET',
      headers: {Accepts: 'application/json'},
    });

    if (response.ok) {
      await response.json().then(json => {
        allTweetsHtml += json.html;
      });
    }
  };

  // Function that fetches all the tweets
  const fetchTweets = async () => {
    await fetchTweet(
      'https://twitter.com/Interior/status/463440424141459456&theme=dark',
    );
    await fetchTweet(
      'https://twitter.com/Interior/status/463440424141459456&theme=dark',
    );
    await fetchTweet(
      'https://twitter.com/Interior/status/463440424141459456&theme=dark',
    );

    let embedHtml = '';
    if (allTweetsHtml.length == 0) {
      embedHtml = NO_TWEET_HTML;
    } else {
      embedHtml = `${TWITTER_HTML_PREFIX}${allTweetsHtml}${TWITTER_HTML_SUFFIX}`;
    }
    setHtml(embedHtml);
  };

  // Fetches tweets for the corresponding topic.
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <ScrollView style={{display: loading ? 'none' : 'flex'}}>
        <WebView
          onMessage={() => {
            setLoading(false);
          }}
          startInLoadingState={true}
          nestedScrollEnabled
          source={{html: html}}
          style={styles.webview}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    backgroundColor: 'grey',
    flex: 1,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
  },
});

export default TopicDetails;
