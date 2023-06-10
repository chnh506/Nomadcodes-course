import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();

  const getMovie = useCallback(async () => {
    const res = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await res.json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <h1 className={styles.loader}>Loading...</h1>
      ) : (
        <div className={styles.container}>
          <img
            src={movie.background_image}
            alt={id}
            className={styles.bgImage}
          />
          <div className={styles.content}>
            <img
              src={movie.medium_cover_image}
              alt={id}
              className={styles.coverImage}
            />
            <div className={styles.detailInfo}>
              <h1 className={styles.title}>{movie.title_long}</h1>
              <p className={styles.description}>{movie.description_intro}</p>
              <ul className={styles.genres}>
                {movie.genres.map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
              <h4 className={styles.rating}>rating: {movie.rating} / 10</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
