import { TwitterApi } from 'twitter-api-v2';

export default async function Tweet(text){
  const userClient = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
  });

  if (true) {
    await userClient.v2.tweet({
      text: text || '???'
    });
  }
}
