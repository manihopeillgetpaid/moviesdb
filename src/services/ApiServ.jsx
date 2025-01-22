import React, { useState }  from "react";
 const ApiServ = () =>{
   const _apiBase = 'https://api.themoviedb.org/3';
     const options = {
        method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzM3ZTlkMDUwYjIyZDA5YjA0ZmFiOTQ0YzM3NDU4MiIsIm5iZiI6MTczNzM5NTIxOS40NDcsInN1YiI6IjY3OGU4YzEzOWQ1ZTM2M2QxOTY1MDEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xB-tHyYwzk_OAmxxp5ZDvjvZSuSdL-uXt5pn7uqzCHg'
  }
    }
    const getResource = async (url) => {
      
        const res = await fetch(`${_apiBase}${url}`, options);
        
        if (!res.ok) {
          const errorDetails = await res.text();
          console.error(`Error fetching resource: ${errorDetails}`);
          throw new Error(`Failed to fetch resource: ${res.status} ${res.statusText}`);
        }
        
        return await res.json();
      }
      
      
      const getMovie = async (url) =>{
        const query = encodeURIComponent(url);
        const data = await getResource(`/search/movie?query=${query}&language=en-US&page=1&include_adult=false`);
      
        // Проверяем, есть ли данные
        if (!data || !data.results || data.results.length === 0) {
          return { results: [] }; // Возвращаем пустой массив, чтобы избежать ошибок
        }
      
        return data;
      }
      
      
    const getGenre = async () =>{
        return await getResource("/genre/movie/list?language=en-US");
    }
  return { getResource, getMovie, getGenre };

}
 


export default ApiServ;