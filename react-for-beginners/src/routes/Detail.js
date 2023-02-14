import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.background_image} alt={id} />
          <img src={movie.medium_cover_image} alt={id} />
          <h1>title: {movie.title_long}</h1>
          <h4>genres: </h4>
          <ul>
            {movie.genres.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
          <h4>rating: {movie.rating}</h4>
        </div>
      )}
    </div>
  );
}

export default Detail;
