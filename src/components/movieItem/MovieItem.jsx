import React from "react";
import { Col, Row, Button, Rate } from "antd";
import { format } from "date-fns";
import './movieItem.css'
import { MehOutlined } from '@ant-design/icons';
const MovieItem = ({
  movie,
  genres,
  onRate,
  showRating = true, // Флаг для отображения рейтинга
}) =>{
    const imageCheck = (item) =>{
        if (item.poster_path == null || item.poster_path == undefined) {
           return (
           <NoPicture />
           )
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
        const getBorderColor = (voteAverage) => {
            if (voteAverage < 3) {
              return "#E90000"; 
            } else if (voteAverage >= 3 && voteAverage < 5) {
              return "#E97E00"; 
            } else if (voteAverage >= 5 && voteAverage < 7) {
              return "#E9D100";
            } else if (voteAverage >= 7) {
              return "#66E900"; 
            }
            return "#CCCCCC"; 
          };
          return(
            <Col          
            xs={24}
            sm={12}
            lg={12}   
          >    
            <div
              className="movie-card">            
                <div className="movieImage">
                {imageCheck(movie)}</div>              
                <div className="card-content">
                    <h5>{movie.title}</h5>
                    {showRating && ( <p className="vote" style={{
                    border: `2px solid ${getBorderColor(movie.vote_average)}`                         
                    }}>{movie.vote_average.toFixed(1)}</p>)}
                    <p style={{ color: "#827E7E", 
                        margin: '0 0 5px 0'
                    }}>
                    {movie.release_date ? format(new Date(movie.release_date), "MMMM d, yyyy") : null}
                    </p>
                <div>
                    {movie.genre_ids
                      .map((id) => genres[id])
                      .filter(Boolean)
                      .slice(0, 3)
                      .map((genre, index) => (
                        <Button
                          key={index}
                          style={{
                            border: "1px solid rgba(217, 217, 217, 1)",
                            padding: "0 5px",
                            color: "rgba(0, 0, 0, 0.65)",
                            marginRight: "8px",
                            marginBottom: '8px',
                            borderRadius: '1px',
                            height: '20px'
                          }}
                        >
                          {genre}
                        </Button>
                      ))}
                  </div>
             
                   <p className="overview">{movie.overview}</p>
             
                    <div className="movie-rating">
                    <Rate
                    allowHalf
                    count={10}
                    value={movie.rating}
                    onChange={(value) => onRate(movie.id, value)}
                    className="rate"
                
                    />
                    </div>
                  
                </div>
              </div>
          
          </Col>
        
          )
}

const NoPicture = () => {
    return (
        <div className="no-picture" style={{
            display:'flex',
            flexDirection: 'column'
        }}>
         
            <span style={{
                fontSize: '10px',
               textAlign: 'center'
       
            }}>Sorry! This image has no poster</span>
             <MehOutlined 
          style={{

          fontSize: '40px',
          margin: '40px'
          }}/>
        </div>
    )
}
export default MovieItem;

