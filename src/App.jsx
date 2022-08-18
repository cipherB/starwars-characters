import axios from 'axios';
import { useState, useEffect } from 'react';
import { GetMovies, Getmovie } from './helper/apiHelper';
import { Characters, Loader, OpeningCrawl } from './component';
import starwars from './assets/starwars.png';
import './App.css'

const App = () => {
  // store your selected movie
  const [movie, setMovie] = useState()
  const [characterList, setCharacterList] = useState([])

  // fetch the data of movies
  const { data, isSuccess, isLoading, isError, error } = GetMovies()
  const { 
    data:movieData, 
    isSuccess: movieIsSuccess,
    isError:movieisError,
    error: movieError,
  } = Getmovie(movie)

  // if selected movie is successfully fetched, fetch characters from api and store details
  useEffect(() => {
    if(movieIsSuccess) {
      movieData.data.characters.map(item => {
        axios.get(item)
        .then((res) => {
          setCharacterList(characterList => characterList.concat(res.data))
        })
        .catch((err) => console.error('character fetch error', err))
      })
    }
  }, [movie, movieIsSuccess])

  // handle movie selection
  const handleChange = e => {
    setMovie(e.target.value);
    setCharacterList([]);
  }

  return (
    <div className="App">
      { isError && console.error('movies fetch error',error) }
      { movieisError && console.error('movie detail fetch error', movieError) }
      {
        isLoading ? <Loader /> :
        <div>
          <h1 id='header' ><span>Star</span>Wars</h1>
          <p id='subheader' >Discover characters from your favorite star wars movie</p>
          { isSuccess && 
            <select name="movies" onChange={handleChange} id="input_select" >
              <option value='' selected disabled ></option>
              {
                data.data.results.map((item, id) => (
                  <option value={id+1} key={id} >{item.title} </option>
                ))
              }
            </select>
          }
          {
            movieIsSuccess ? <div>
              <OpeningCrawl openCrawl={movieData.data.opening_crawl} />
              {(movieIsSuccess && characterList.length === movieData.data.characters.length) ? 
              <Characters characterList={characterList} /> : 
                <div className='table-contain' >
                  {/* if character table still loading, show loader skeleton */}
                  <table className='table' >
                    <thead>
                      <tr className='table-header-row' >
                        <th align='left'><p className='table-header skeleton-loader' ></p></th>
                        <th align='left' ><p className='table-header skeleton-loader' ></p></th>
                        <th align='left' ><p className='table-header skeleton-loader' ></p></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        [1,2,3,4,5,6].map((item, id) => (
                          <tr key={id} className="table-row" >
                            <td align='left' ><p className='table-data skeleton-loader'></p></td>
                            <td align='left' ><p className='table-data skeleton-loader' ></p> </td>
                            <td align='left' ><p className='table-data skeleton-loader' ></p> </td>
                          </tr>
                        )) 
                      }
                    </tbody>
                  </table>
                </div>  
              }
            </div> : <div className={{marginTop:100}} >
              <img src={starwars} alt="starwars" id="starwars_logo" />
            </div>
          }
        </div>
      }
      <div id='farewell'>
        <h1>May the force be with you</h1>
      </div>
    </div>
  )
}

export default App
