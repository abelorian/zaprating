import { TwitterApi } from 'twitter-api-v2';
import * as cheerio from 'cheerio';

async function fetchData(key) {
  try {
    const response = await fetch(`https://metrics.zappingtv.com/public/rating/${key}`, {
      next: {
        revalidate: 60, // 1 min
      },
    });

    if (!response.ok) {
      return null
    }

    const htmlText = await response.text();
    const $ = cheerio.load(htmlText);
    const channelRatingElement = $('#channel_rating');

    if (channelRatingElement.length > 0) {
      const channelRating = channelRatingElement.text();
      return channelRating
    } else {
      console.log('No se encontró el elemento con el id "channel_rating"');
    }

  } catch (error) {
    return null
  }
}

export default async function Home() {
  const canal13 = await fetchData("13")
  const tvn = await fetchData("tvno")
  const lared = await fetchData("lared")
  const mega = await fetchData("mega")
  const chv = await fetchData("chv")
  const tvm = await fetchData("tvm")

  //tweet()

  return (
    <div>
      <p>Canal 13: { canal13 }</p>
      <p>TVN: { tvn }</p>
      <p>La Red: { lared }</p>
      <p>Mega: { mega }</p>
      <p>Chilevision: { chv }</p>
      <p>TV+: { tvm }</p>
    </div>
  )
}


async function tweet() {
    const userClient = new TwitterApi({
      appKey: process.env.APP_KEY,
      appSecret: process.env.APP_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_SECRET,
    });

    const me = await userClient.v2.me()

    console.log("*******************************************")
    console.log(me)

    if (false) {
      await userClient.v2.tweet({
        text: 'prueba'
      });
    }
}
