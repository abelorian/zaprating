import Ratings from "./zappingRating"

export default async function Home() {
  const canal13 = await Ratings("13")
  const tvn = await Ratings("tvno")
  const mega = await Ratings("mega")
  const chv = await Ratings("chv")
  const lared = await Ratings("lared")
  const tvm = await Ratings("tvm")

  return (
    <div>
      <p>Canal 13: { canal13 }</p>
      <p>TVN: { tvn }</p>
      <p>Mega: { mega }</p>
      <p>Chilevision: { chv }</p>
      <p>La Red: { lared }</p>
      <p>TV+: { tvm }</p>
    </div>
  )
}
