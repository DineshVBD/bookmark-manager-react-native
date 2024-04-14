// Constants associated with the Topic details page.
export const TopicDetailsConstants: {[key: string]: string} = {
  NO_TWEET_HTML:
    '<p style="display: flex; justify-content: center; align-items: center; font-size: 16px">No articles to show</p>',
  TWITTER_EMBED_URL: 'https://publish.twitter.com/oembed?url=',
  TWITTER_HTML_PREFIX:
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>',
  TWITTER_HTML_SUFFIX:
    '<script> window.onload =function fn1(){setTimeout(() => { window.ReactNativeWebView.postMessage(JSON.stringify({ loaded: true })); },2000);}</script></body></html>',
};
