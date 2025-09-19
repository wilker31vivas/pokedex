import { useContext } from 'react';
import PokemonCard from './PokemonCard'
import Search from './Search';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { PokemonContext } from '../context/PokemonContext';

function Home() {
  const { index, setIndex, limit,
    data, pokemonSearch, loading,
    apiError, searchError, selectedType } = useContext(PokemonContext);

  function handleFollowing() {
    if (index + limit < 1302) {
      setIndex(prevIndex => prevIndex + limit);
    }
  }

  function handleBack() {
    if (index >= limit) {
      setIndex(prevIndex => prevIndex - limit);
    }
  }

  const message = () => {
    if (loading) {
      return (
        <div className="loading-message">
          <p className="loading-text">⏳ Charging...</p>
        </div>
      );
    }
    if (apiError) {
      return (
        <div className="error-message">
          <p className="error-text">🚫 Error loading data. Please check your internet connection..</p>
        </div>
      );
    }

    if (searchError) {
      return (
        <div className="error-message">
          <p className="error-text">❌ Pokémon not found. Try another name.</p>
        </div>
      );
    }
  }

  return (
    <div className="contenedor" id="app">
      <Search></Search>
      {message()}
      <div className='contenedor-pokemon'>
        {data && data.map((item, index) => (
          <PokemonCard key={index} url={item.url}></PokemonCard>
        ))}
        {pokemonSearch && <PokemonCard url={pokemonSearch}></PokemonCard>}
      </div>
      {!pokemonSearch && !selectedType && (
        <div className='container-button'>
          {index !== 0 && (
            <button className='button' onClick={handleBack}>
              <FaArrowLeft />
            </button>
          )}
          <button className='button' onClick={handleFollowing}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default Home