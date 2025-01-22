import React, { Component } from "react";
import MovieCard from "../movieCard/MovieCard";
import { Row } from "antd";
import "./movieList.css";
import { Pagination } from 'antd'
export default class MovieList extends React.Component {
  render() {
   const { searchValue } = this.props
    
    return (
      <div className="movie-list-container">
        <Row gutter={[35, 35]} justify="center">
     
            <MovieCard searchValue={searchValue}/>
      
        </Row>
        
      </div>
    );
  }
}