import React, { useEffect, useState } from 'react';
import '../styles/evolutions.css';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function PokemonEvolutions({ pokemonName }) {
    const [evolutions, setEvolutions] = useState([]);

    //obtiene los datos de la evolucion de un pokemon
    async function getDataEvolution(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error("Error fetching evolution data:", error);
            return null;
        }
    }

    //function para devolver un array con las evoluciones de un pokemon y sus datos
    async function extractEvolutionChain(chain) {
        const evolutions = [];
        let current = chain;

        while (current) {
            const res = await getDataEvolution(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`)
            evolutions.push(res);
            current = current.evolves_to[0];
        }

        return evolutions;
    }

    //function para setear las evoluciones del pokemon
    async function getEvolutions(pokemonName) {
        const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data1 = await res1.json();

        const res2 = await fetch(data1.species.url);
        const data2 = await res2.json();

        const res3 = await fetch(data2.evolution_chain.url);
        const data3 = await res3.json();

        const evolutionData = await extractEvolutionChain(data3.chain);
        setEvolutions(evolutionData);
    }

    useEffect(() => {
        getEvolutions(pokemonName);
    }, [pokemonName]);

    if (evolutions.length === 0) {
        return null
    }

    return (
        <div className="pokemon-evolutions">
            <h3 className='pokemon-evolutions-title'>Evolutions</h3>
            <ul className='pokemon-evolutions-list'>
                {evolutions.map((evolution, index) => (
                    <React.Fragment key={index}>
                        <li className="pokemon-evolution-item" >
                            <Link to={`/${evolution.name}`}>
                                <img src={evolution.sprites.front_default} alt={evolution} className="evolution-img" />
                                <p className="pokemon-id">N.º {evolution ? String(evolution.id).padStart(3, '0') : ''}</p>
                                <p className="pokemon-name">{evolution.forms[0].name.charAt(0).toUpperCase() + evolution?.forms[0].name.substring(1)}</p>
                                <div className="evolution-type">
                                    {evolution && evolution.types.map((type, index) => (
                                        <span key={index} className={`pokemon-type-text ${type.type.name}`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1)}</span>
                                    ))}
                                </div>
                                {/* Agrega la flecha si NO es el último elemento */}

                            </Link>
                        </li >
                        {
                            index < evolutions.length - 1 && (
                                <FaArrowRight className="evolution-arrow" />
                            )
                        }
                    </React.Fragment>
                ))}
            </ul>
        </div >
    );
}