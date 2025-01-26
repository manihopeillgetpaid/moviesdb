import React from "react";

const ApiServ = () => {
  const _apiKey = "fc37e9d050b22d09b04fab944c374582"; 
  const _apiBase = "https://api.themoviedb.org/3";

  
  const startGuestSession = async () => {
    const res = await fetch(`${_apiBase}/authentication/guest_session/new?api_key=${_apiKey}`);
    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(`Error creating guest session: ${errorDetails}`);
      throw new Error(`Failed to create guest session: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.guest_session_id; 
  };


  const getMovie = async (query, page = 1) => {
    const res = await fetch(
      `${_apiBase}/search/movie?api_key=${_apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=${page}&include_adult=false`
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(`Error searching movies: ${errorDetails}`);
      throw new Error(`Failed to search movies: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data; 
  };


  const getGenre = async () => {
    const res = await fetch(`${_apiBase}/genre/movie/list?api_key=${_apiKey}&language=en-US`);
    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(`Error fetching genres: ${errorDetails}`);
      throw new Error(`Failed to fetch genres: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data; 
  };

  // Добавление фильма в "оценённые"
  const rateMovie = async (movieId, rating, guestSessionId) => {
    const res = await fetch(
      `${_apiBase}/movie/${movieId}/rating?api_key=${_apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: rating }), // Оценка должна быть числом от 0.5 до 10
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(`Error rating movie: ${errorDetails}`);
      throw new Error(`Failed to rate movie: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
 
    return data;
  };
  const getRatedMovies = async (guestSessionId) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzM3ZTlkMDUwYjIyZDA5YjA0ZmFiOTQ0YzM3NDU4MiIsIm5iZiI6MTczNzM5NTIxOS40NDcsInN1YiI6IjY3OGU4YzEzOWQ1ZTM2M2QxOTY1MDEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xB-tHyYwzk_OAmxxp5ZDvjvZSuSdL-uXt5pn7uqzCHg'
      }
    };    
    try {
      const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`, options)
     

      if (!response.ok) {
        throw new Error(`Failed to fetch rated movies: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching rated movies:", error);
      return [];
    }
  };
  
  return { startGuestSession, getMovie, getGenre, rateMovie, getRatedMovies };
};

export default ApiServ;
