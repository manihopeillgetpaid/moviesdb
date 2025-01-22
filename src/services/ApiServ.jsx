import React, { Component }  from "react";
import NoMovieError from "../components/noMovieError/NoMovieError";
export default class ApiServ extends React.Component{
    _apiBase = 'https://api.themoviedb.org/3';
    options = {
        method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzM3ZTlkMDUwYjIyZDA5YjA0ZmFiOTQ0YzM3NDU4MiIsIm5iZiI6MTczNzM5NTIxOS40NDcsInN1YiI6IjY3OGU4YzEzOWQ1ZTM2M2QxOTY1MDEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xB-tHyYwzk_OAmxxp5ZDvjvZSuSdL-uXt5pn7uqzCHg'
  }
    }
    async getResource(url) {
      
        const res = await fetch(`${this._apiBase}${url}`, this.options);
        
        if (!res.ok) {
          const errorDetails = await res.text();
          console.error(`Error fetching resource: ${errorDetails}`);
          throw new Error(`Failed to fetch resource: ${res.status} ${res.statusText}`);
        }
        
        return await res.json();
      }
      
      
      async getMovie(url) {
        const query = encodeURIComponent(url);
        const data = await this.getResource(`/search/movie?query=${query}&language=en-US&page=1&include_adult=false`);
      
        if (!data || !data.results || data.results.length === 0) {
        return <NoMovieError/>
        }
      
        return data;
      }
      
    async getGenre(){
        return await this.getResource("/genre/movie/list?language=en-US");
    }
  
    // async getPicture(url){
    //     const res = await fetch(`https://image.tmdb.org/t/p/w500/${url}`);
    //     if(!res.ok){
    //         throw new Error('could load picture')
    //     };
    //     return await res.blob();
    // }
    // async getAllMovies(){
    //     const res = await this.getResource('/movie/');
        
    // }
}
// const swapi = new ApiServ();
// swapi.getMovie('hello').then((data) => {
// console.log(data);
// })

