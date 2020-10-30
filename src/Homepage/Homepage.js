import './Homepage.css';


export const Homepage = (props) => {
  return (
    <div className="homepage" data-testid="homepage">
      <div className="character-select">
        <button
          className="generator"
          onClick={() => {
            props.designateRole(true)
          }
        }>
          Generator
        </button>
        <button
          className="guesser"
          onClick={() => {
            props.designateRole(false)
          }
        }>
          Guesser
        </button>
      </div>
      <h1>Score: </h1>
    </div>
  )

}
