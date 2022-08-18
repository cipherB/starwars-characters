import axios from 'axios';
import { useQuery } from 'react-query';

// Use react query to get list of selected movie

export const Getmovie = (id) => {
  return useQuery(['movieFilm', id], () => {
    return axios.get(`https://swapi.dev/api/films/${id}/`)
  }, {
    enabled: !!id
  })
}

// Use react query to get list of all movies

export const GetMovies = () => {
  return useQuery('movies', () => {
    return axios.get('https://swapi.dev/api/films/')
  })
}
