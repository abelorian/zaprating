import { ratingSorted } from "./zappingRating"

export default async function Home() {
  const ratings = await ratingSorted()
  return (
    <div>
      <ul>
        {ratings.map(({ name, rating }) => (
          <li key={name}>
            {name} → {rating}%
          </li>
        ))}
      </ul>
    </div>
  )
}
