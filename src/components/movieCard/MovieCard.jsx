import React, {  useEffect, useState } from "react";
import ApiServ from "../../services/ApiServ";
import { format } from "date-fns";
import { Col, Row, Button, Rate } from "antd";
import { MehOutlined, LoadingOutlined } from '@ant-design/icons';
import "./movieCard.css";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import { Pagination} from 'antd'
import MovieItem from "../movieItem/MovieItem";
 const MovieCard = ({ searchValue }) => {
const swapiServce = ApiServ();
const [movies, setMovies] = useState([]);
const [genres, setGenres] = useState({});
const [loading, setLoading] = useState(false);
const [err, setErr] = useState(false);
const [isOffline, setIsOffline] = useState(!navigator.onLine);
const [noMovieError, setNoMovieError] = useState(false);
const[pages, setPages] = useState(1);
const [currentPage, setCurrentPage] = useState(1); 
const [guestSessionId, setGuestSessionId] = useState(null);;


useEffect(() => {
    updateGenre();
    window.addEventListener("online", handleConnectionStatus);
    window.addEventListener("offline", handleConnectionStatus);
    swapiServce.startGuestSession().then((id) => {
      setGuestSessionId(id);
    localStorage.setItem('guestSessionId', id)})
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
    setCurrentPage(1)
    updateMovie(searchValue, 1)
}, [searchValue]);

const handleConnectionStatus = () => {
 setIsOffline(!navigator.onLine)
  };

  const updateMovie = (val, pages) => {
   

    swapiServce
      .getMovie(val, pages)
      .then((movie) => {
        if (movie.results && movie.results.length > 0) {
          setPages(movie.total_pages)
          setMovies(movie.results);
          setNoMovieError(false);
          console.log(movie);
         
        } else {
          setMovies([]); 
          setNoMovieError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setErr(true);
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



const addToRated = (movieId, rating) => {
  if(!guestSessionId){
    return;
  }
  return swapiServce.rateMovie(movieId, rating, guestSessionId)
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
   

    return(
            <>
              {movies.map((movie, index) => (
              <MovieItem
              key={index}
              movie={movie}
              genres={genres}
              onRate={addToRated}/> 
               ))}
             {movies.length > 0 && (
              <Pagination
    current={currentPage}
    total={pages+'0'}
    align="center"
    style={{ marginBottom: "10px" }}
    onChange={(page) => {
        setCurrentPage(page)
        updateMovie(searchValue, page);
    }}
  />
)}

            </>
 );
    
}


}



export default MovieCard;