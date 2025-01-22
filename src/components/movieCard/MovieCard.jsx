import React, {  useEffect, useState } from "react";
import ApiServ from "../../services/ApiServ";
import { format } from "date-fns";
import { Col, Row, Button } from "antd";
import { MehOutlined, LoadingOutlined } from '@ant-design/icons';
import "./movieCard.css";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import { Pagination} from 'antd'
 const MovieCard = ({ searchValue }) => {
const swapiServce = ApiServ();
const [movies, setMovies] = useState([]);
const [genres, setGenres] = useState({});
const [loading, setLoading] = useState(false);
const [err, setErr] = useState(false);
const [isOffline, setIsOffline] = useState(!navigator.onLine);
const [noMovieError, setNoMovieError] = useState(false);
useEffect(() => {
    updateGenre();
    window.addEventListener("online", handleConnectionStatus);
    window.addEventListener("offline", handleConnectionStatus);
    return () => {
        window.removeEventListener("online", handleConnectionStatus);
        window.removeEventListener("offline", handleConnectionStatus);
     }
},[]);
useEffect(() => {
    if (!searchValue) {
      setNoMovieError(false); // Нет ошибки, если пользователь не ввел запрос
      return;
    }
    if (!movies || movies.length === 0) {
      setNoMovieError(true); // Нет фильмов, устанавливаем ошибку
    } else {
      setNoMovieError(false); // Есть фильмы, сбрасываем ошибку
    }
  }, [movies, searchValue]);
  
useEffect(() =>{
    updateMovie(searchValue)
}, [searchValue]);

const handleConnectionStatus = () => {
 setIsOffline(!navigator.onLine)
  };

  const updateMovie = (val) => {
   

    swapiServce
      .getMovie(val)
      .then((movie) => {
        if (movie.results && movie.results.length > 0) {
          setMovies(movie.results); // Устанавливаем фильмы
          setNoMovieError(false); // Сбрасываем ошибку
        } else {
          setMovies([]); // Очищаем массив фильмов
          setNoMovieError(true); // Устанавливаем ошибку
        }
        setLoading(false); // Сбрасываем состояние загрузки
      })
      .catch(() => {
        setErr(true); // Устанавливаем ошибку при сбое API
        setLoading(false);
      });
  };
  
  

 const updateGenre = () =>{
    swapiServce.getGenre().then((data) => {
      const genresMap = {};
      data.genres.forEach((genre) => {
        genresMap[genre.id] = genre.name;
      });
      setGenres(genresMap);
     
    })
   
  }

const imageCheck = (item) =>{
if (item.poster_path == null || item.poster_path == undefined) {
   return <NoPicture />
}
return (
    <img
    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
    alt=''
    style={{
      width: "100%",
      height: "100%",
        padding: '0',
      objectFit: "cover",
    }}
  />
)
}
if (isOffline) {
    return (
      <div className="offline-indicator">
        <h3>No Internet Connection</h3>
        <p>Please check your network and try again.</p>
      </div>
    );
  }
if(loading) {
    return(
        <div style={{ textAlign: 'center', padding: '20px' }}>
        <LoadingOutlined style={{ fontSize: '50px' }} spin />
      </div>
    )
}

if(err){
    return <ErrorIndicator/>
}
if(noMovieError){
    return(
        <div>
        <p>There's no such movie</p>
    </div>
    )
}

 else if(searchValue){
    const limitedMovies = Array.isArray(movies) ? movies.slice(0, 20) : [];

    return(
       
            <>
              {limitedMovies.map((movie, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={12}
                  lg={12}
                  style={{   
                  }}
                >
                  <div
                    className="movie-card"
                    style={{
                      
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "279px",
                    }}
                  >            
                    <Row gutter={16}>
                      <Col
                        xs={24}
                        sm={8}
                        md={10}
                        style={{
                    
                        }}
                      >
                       {imageCheck(movie)}
                      </Col>
                 
                      <Col xs={24} sm={16} md={12} className="card-content">
                        <h5>{movie.title}</h5>
                        <p style={{ color: "#827E7E" }}>
                        {movie.release_date ? format(new Date(movie.release_date), "MMMM d, yyyy") : null}
                        </p>
                        <div>
                          {movie.genre_ids
                            .map((id) => genres[id])
                            .filter(Boolean)
                            .map((genre, index) => (
                              <Button
                                key={index}
                                style={{
                                  border: "1px solid rgba(217, 217, 217, 1)",
                                  padding: "5px",
                                  color: "rgba(0, 0, 0, 0.65)",
                                  marginRight: "8px",
                                  marginBottom: "8px",
                                }}
                              >
                                {genre}
                              </Button>
                            ))}
                        </div>
                        <p className="overview">{movie.overview}</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
             {movies.length > 0 && (
  <Pagination
    defaultCurrent={1}
    total={50}
    align="center"
    style={{ marginBottom: "10px" }}
  />
)}

            </>
          );
    
}


}


const NoPicture = () => {
    return (
        <div className="no-picture">
          <MehOutlined 
          style={{

          fontSize: '50px',
          margin: '50px'
          }}/>
            <span style={{
                fontSize: '20px',
               textAlign: 'center'
       
            }}>Sorry! this image has no poster</span>
        </div>
    )
}

export default MovieCard;