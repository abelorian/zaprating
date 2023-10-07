import { ratingSorted } from '../zappingRating'
import Tweet from '../twitter'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams && searchParams.get('key')
  const ratings = await ratingSorted()
  const validRatings = ratings.every(rating => rating !== null);

  if (validRatings){
    const tweetText = ratings.map(channel => `${channel.name} → ${channel.rating}`).join('\n');

    console.log(key)
    console.log(tweetText);

    if (key && key === process.env.KEY){
      console.log("Send tweet")
      Tweet(tweetText)
    }
    return NextResponse.json({ ratings });
  }

  return NextResponse.json({ error: ':(' });
}

