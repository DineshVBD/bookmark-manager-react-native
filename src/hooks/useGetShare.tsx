import {useEffect, useState} from 'react';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import ShareFile from '../types/shareFile';

/**
 * Core Logic of the Application where files are received when shared by any
 * application on Android device.
 *
 * @returns {sharedFiles}
 */
const useGetShare = () => {
  const [sharedFiles, setSharedFiles] = useState<ShareFile[] | undefined>(
    undefined,
  );

  useEffect(() => {
    // To get All Recived Urls
    ReceiveSharingIntent.getReceivedFiles(
      (files: ShareFile[]) => {
        // files returns as JSON Array example
        //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
        setSharedFiles(files);
      },
      // @ts-ignore
      error => {
        console.log(error);
      },
      'dimaportenko', // share url protocol (must be unique to your app, suggest using your apple bundle id)
    );
  }, []);

  return sharedFiles;
};

export default useGetShare;
