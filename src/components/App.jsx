import '../styles/index.css'
import Home from './Home';
import { Link, Route, Routes } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';

function App() {
  return (
    <>
      <div className='title-container'>
        <Link to={`/`}>
          <h1 className='title-app'>Pokédex</h1>
        </Link>
      </div>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:pokemon' element={<PokemonDetails />}></Route>
      </Routes>
    </>
  )
}

export default App