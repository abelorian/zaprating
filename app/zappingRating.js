import * as cheerio from 'cheerio';

export default async function Ratings(key){
  try {
    const response = await fetch(`https://metrics.zappingtv.com/public/rating/${key}`, { cache: 'no-store' });

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
      return null
    }

  } catch (error) {
    return null
  }
}

export async function ratingSorted(){
  let values = []
  const keys = [
    ["Canal 13", "13"],
    ["TVN", 'tvno'],
    ["Mega", 'mega'],
    ["Chilevisión", "chv"],
    ["La Red", 'lared'],
    ["TV+", 'tvm']
  ]

  for (const key of keys) {
    const rating = await Ratings(key[1]);
    values.push({ name: key[0], code: key[1], rating })
  }

  values.sort((a, b) => b.rating - a.rating);
  return values
}
