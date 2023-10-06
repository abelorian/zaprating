import Ratings from '../zappingRating'
import Tweet from '../twitter'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  console.log(searchParams)

  const canal13 = await Ratings("13")
  const tvn = await Ratings("tvno")
  const mega = await Ratings("mega")
  const lared = await Ratings("lared")
  const chv = await Ratings("chv")
  const tvm = await Ratings("tvm")

  Tweet(`Canal 13 → ${canal13}\nTVN → ${tvn}\nMega → ${mega}\nCHV → ${chv}\nLaRed → ${lared}\nTV+ → ${tvm}`)

  return NextResponse.json({ canal13, tvn, lared, mega, chv, tvm });
}

