import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, year, summary, genres }) {
  return (
    <div className={styles.movieBox}>
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} />
        <div className={styles.movie__info}>
          <h2 className={styles.movie__title}>
            {title}({year})
          </h2>
          <ul>
            {genres.map((g, idx) => (
              <li key={idx} className={styles.movie__genres}>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </Link>
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
