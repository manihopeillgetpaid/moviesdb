import React, { Children, useState } from "react";
import { Tabs, Row } from 'antd';
import SearchPanel from '../searchPanel/SearchPanel.jsx'
import ApiServ from "../../services/ApiServ.jsx";
import MovieItem from "../movieItem/MovieItem.jsx";
const Header = () => {
    const swapi = ApiServ();
    const [ratedMovies, setRatedMovies] = useState([]);
    const genres = {};
   
   const fetchRatedMovies = async () =>{

        const guiestSessionId = localStorage.getItem('guestSessionId');
        console.log(guiestSessionId);
        const guestSessionId = localStorage.getItem("guestSessionId");
        if (!guestSessionId) {
          console.error("Guest session ID is not available.");
          return;
        }
        const ratedMoviesData = await swapi.getRatedMovies(guestSessionId);
        setRatedMovies(ratedMoviesData.results || []); 
   }
   const onChange = async (key) => {
    if (key === '2'){
        
        await fetchRatedMovies();
    }
   }
    const items = [
        {
          key: '1',
          label: 'Search',
          children: <SearchPanel/>,
        },
        {
          key: '2',
          label: 'Rated',
          children: (
            <div style={{
                margin: '0 36px'
            }}>
            <Row gutter={[36]} style={{            
            }}>
            {Array.isArray(ratedMovies) && ratedMovies.map((movie, index) => (
              <MovieItem 
                key={index}
                movie={movie}
                genres={genres}
                onRate={() => {}} 
                showRating={false} // Отключаем возможность изменения рейтинга
              />
            ))}
          </Row>
          </div>
          )
        }]
    return(
        <>
<Tabs defaultActiveKey={1} items={items} onChange={onChange} centered/>

</>
    )
}
export default Header;

