import './Homepage.css';

export const Homepage = (props) => {
  return (
    <Consumer >
      <div className="homepage">
        <div className="character-select">
          <button 
          className="generator"
          onClick={
            props.designateRole(false)
          }
          >Generator</button>
          <button 
          className="guesser"
          onClick={
            props.designateRole(true)
          }
          >Guesser</button>
        </div>
        <h1>Score: </h1>
      </div>
    </Consumer>
  )

}