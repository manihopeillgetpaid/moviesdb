import React, { Component } from "react";
import ApiServ from "../../services/ApiServ";
import { format, set } from "date-fns";
import { Card, Col, Row, Button } from "antd";
import { MehOutlined, LoadingOutlined } from '@ant-design/icons';
import "./movieCard.css";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import NoMovieError from "../noMovieError/NoMovieError";
import { Pagination} from 'antd'
export default class MovieCard extends React.Component {
  swapiServce = new ApiServ();

  state = {
    movies: [],
    genres: {},
    loading: false,
    err: false,
    isOffline: !navigator.onLine,
    noMovieError: false
  };
  
 componentDidMount(){
    this.updateGenre();
    window.addEventListener("online", this.handleConnectionStatus);
    window.addEventListener("offline", this.handleConnectionStatus);
}
componentWillUnmount(){
    window.removeEventListener("online", this.handleConnectionStatus);
    window.removeEventListener("offline", this.handleConnectionStatus);
}
componentDidUpdate(prevProps, prevState){
    if(prevProps.searchValue !== this.props.searchValue){
        this.updateMovie(this.props.searchValue)
    }
}
handleConnectionStatus = () => {
    this.setState({ isOffline: !navigator.onLine });
  };

  updateMovie(val) {
    this.setState({
        loading: true
    })
    this.swapiServce.getMovie(val).then((movie) => {
       
      this.setState({
        movies: movie.results,
        loading: false
      });
    
      
    })
   
  }

onError = () => {
    
    this.setState({
        err: true, 
        loading: false
    })
}
  updateGenre() {
    this.swapiServce.getGenre().then((data) => {
      const genresMap = {};
      data.genres.forEach((genre) => {
        genresMap[genre.id] = genre.name;
      });
      this.setState({
        genres: genresMap,
      });
    })
   
  }

imageCheck(item){
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

  render() {
  
    const { movies, genres, loading, err, isOffline, noMovieError } = this.state;
const { searchValue } = this.props;
if(!movies ){
    return <NoMovieError/>
}
 
if(searchValue){
    const limitedMovies = movies.slice(0, 20);
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
                       {this.imageCheck(movie)}
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
              <Pagination defaultCurrent={1} total={50} align="center" style={{
                marginBottom: '10px'
              }}/>
            </>
          );
    
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
        return <NoMovieError/>
    }
   
   
   
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