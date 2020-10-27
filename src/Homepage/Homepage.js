
import './Homepage.css'


export const Homepage = (props) => {
  return (
    <div className="homepage">
      <div className="character-select">
        <button className="generator">Generator</button>
        <button className="Guesser">Guesser</button>
      </div>
      <h1>Score: </h1>
    </div>
  )

}