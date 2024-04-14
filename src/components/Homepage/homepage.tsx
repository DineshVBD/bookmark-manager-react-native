import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import useGetShare from '../../hooks/useGetShare';
import RootStackParamList from '../../types/rootStack';
import ShareFile from '../../types/shareFile';
import Button from '../../utils/button';
import colors from '../../utils/colors';
import GlobalText from '../../utils/globalText';
import {HomePageConstants} from './constants';

type HomePageProps = NativeStackScreenProps<RootStackParamList, 'Mark it!'>;

// Homepage component
const HomePage: FunctionComponent<HomePageProps> = ({
  navigation,
}: HomePageProps): React.JSX.Element => {
  // Receive shared files using the hook.
  const files: ShareFile[] | undefined = useGetShare();

  // Imported Constants.
  const {ONE_FILE_ALLOWED, ONLY_TWITTER_LINKS, NO_FILES_FOUND, TWITTER_PREFIX} =
    HomePageConstants;

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.topicButton}>
        <Button
          title="MY TOPICS"
          onPress={() => navigation.navigate('My Topics')}
        />
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
          {files?.length && files?.length > 1 ? (
            <GlobalText style={styles.lightText}>{ONE_FILE_ALLOWED}</GlobalText>
          ) : files?.length == 1 ? (
            <>
              {files?.map((file: ShareFile, index: number) =>
                file?.weblink?.startsWith(TWITTER_PREFIX) ? (
                  <GlobalText>{file.weblink}</GlobalText>
                ) : (
                  <GlobalText>{ONLY_TWITTER_LINKS}</GlobalText>
                ),
              )}
            </>
          ) : (
            <GlobalText style={styles.lightText}>{NO_FILES_FOUND}</GlobalText>
          )}
        </View>
      </View>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.LIGHT,
    flex: 1,
    justifyContent: 'center',
    zIndex: -1,
  },
  lightText: {
    color: colors.GREY,
    fontSize: 16,
  },
  topicButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});

export default HomePage;
