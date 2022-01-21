import propTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({id, mediumCoverImg, titleLong, synopsis, genres}) {
  return (
    <div>
      <img src={mediumCoverImg} alt="" />
      <h2><Link to={`/movie/${id}`}>{titleLong}</Link></h2>
      <p>{synopsis}</p>
      {genres === undefined ? null : (
        <ul>{genres.map((g) => <li key={g}>{g}</li>)}</ul>
      )}
    </div>
  )
}

Movie.propTypes = {
  mediumCoverImg: propTypes.string.isRequired,
  titleLong: propTypes.string.isRequired,
  synopsis: propTypes.string.isRequired,
  genres: propTypes.arrayOf(propTypes.string),
}

export default Movie; 