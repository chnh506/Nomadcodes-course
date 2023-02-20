import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, year, summary, genres }) {
  return (
    <div className={styles.movieBox}>
      <img src={coverImg} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>
          {title}({year})
        </Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g, idx) => (
          <li key={idx}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
