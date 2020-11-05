import PropTypes from 'prop-types';
import './Homepage.scss';

export const Homepage = (props) => {
  return (
    <div className="homepage" data-testid="homepage">
      <h1><em>Choose a role</em></h1>
      <div className="character-select">
        <button
          className="generator"
          disabled={props.hasGenerator}
          data-testid='generator-button'
          onClick={() => {
            props.designateRole(true)
          }}>
          Generator
        </button>
        <button
          className="guesser"
          data-testid='guesser-button'
          onClick={() => {
            props.designateRole(false)
          }
        }>
          Guesser
        </button>
      </div>
      <h1><em>Score: </em></h1>
    </div>
  )
}


Homepage.propType = {
  hasGenerator: PropTypes.bool,
  designateRole: PropTypes.func
}