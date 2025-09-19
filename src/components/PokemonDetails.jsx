import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../styles/details.css";
import PokemonEvolutions from "./PokemonEvolutions";

export default function PokemonDetails() {
  const { pokemon } = useParams();
  const [description, setDescription] = useState("");
  const [dataPokemon, setDataPokemon] = useState(null);
  const [id, setId] = useState(null)
  const [nextPokemon, setNextPokemon] = useState(null)
  const [prevPokemon, setPrevPokemon] = useState(null)

  // useEffect para obtener los datos del Pokémon
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => response.json())
      .then((data) => {
        setDataPokemon(data);
        setId(data.id);
      });
  }, [pokemon])

  // useEffect para obtener el ID del Pokémon
  useEffect(() => {
    if (id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then((data) => {
          setDataPokemon(data);
        });

      fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`)
        .then(response => response.json())
        .then((data) => {
          setNextPokemon(data);
        });

      if (id > 1) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id - 1}`)
          .then(response => response.json())
          .then((data) => {
            setPrevPokemon(data);
          });
      }
      //description
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${dataPokemon.id}`)
        .then(response => response.json())
        .then(speciesData => {
          const descripcion = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
          );
          setDescription(descripcion ? descripcion.flavor_text.replace(/\n|\f/g, ' ') : 'Sin descripción');
        });
    }
  }, [id]);

  return (
    <>
      <div className={id !== 1 ? 'container-button_pokemon' : 'center'}>
        {prevPokemon && id !== 1 && (
          <Link to={`/${prevPokemon.name}`}>
            <button className="button-pokemon">
              <FaArrowLeft />
              <span className="button-pokemon__name">
                {prevPokemon.name}
              </span>
            </button>
          </Link>
        )}

        {nextPokemon && (
          <Link to={`/${nextPokemon.name}`}>
            <button className="button-pokemon">
              <span className="button-pokemon__name">
                {nextPokemon.name}
              </span>
              <FaArrowRight />
            </button>
          </Link>
        )}
      </div>
      <div className="container-details">
        {dataPokemon && (
          <>
            <div className="container-pokemon">
              <h1 className="name">{dataPokemon.name.charAt(0).toUpperCase() + dataPokemon.name.substring(1)}</h1>
              <div className="pokemon-details">
                <img src={dataPokemon.sprites.front_default} alt="" className="img" />
                <div className="container-atributes">
                  <p className="description">{description}</p>
                  <div className="atributes">
                    <div className="atribute-box">
                      <h2>Height:</h2>
                      <p>{(dataPokemon.height / 10).toFixed(1)} m</p>
                    </div>
                    <div className="atribute-box">
                      <h2 >Weight</h2>
                      <p>{(dataPokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                    <div className="atribute-box">
                      <h2>Abilities</h2>
                      <p>{dataPokemon.abilities[0].ability.name}</p>
                    </div>
                    <div className="type-box">
                      <h2>Type</h2>
                      {dataPokemon.types && dataPokemon.types.map((type, index) => (
                        <span key={index} className={`pokemon-type-text ${type.type.name}`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1)}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
              <h2 className="stats-title">Stats</h2>
              <div className="pokemon-stats">
                {dataPokemon.stats.map((item, index) =>
                  <div key={index}>
                    <h3>{item.stat.name}</h3>
                    <p>{item.base_stat}</p>
                  </div>
                )}
              </div>
            </div>
            <PokemonEvolutions pokemonName={dataPokemon.name} />
          </>
        )
        }
      </div>
    </>

  );
};