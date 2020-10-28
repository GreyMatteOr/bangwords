import './Homepage.css';


export const Homepage = () => {
  return (
    <div className="homepage" data-testid="homepage">
      <div className="character-select">
        <button className="generator">Generator</button>
        <button className="guesser">Guesser</button>
      </div>
      <h1>Score: </h1>
    </div>
  )

}
