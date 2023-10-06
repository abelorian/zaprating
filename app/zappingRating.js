import * as cheerio from 'cheerio';

export default async function Ratings(key){
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
