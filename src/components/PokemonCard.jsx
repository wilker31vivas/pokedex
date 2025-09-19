import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';

export default function PokemonCard({ url }) {
    const [datos, setDatos] = useState(null);
    const { setLoading, setSearchError } = useContext(PokemonContext);

    // Obtiene los datos del Pokémon desde la URL proporcionada
    async function getData() {
        setLoading(true);
        setSearchError(false);
        setDatos(null);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const json = await response.json();
            setDatos(json)
        } catch (error) {
            setDatos(null)
            setSearchError(true)
            setLoading?.(false);
        } finally {
            setLoading?.(false);
        }
    }

    // Llama a getData cuando cambia la URL
    useEffect(() => {
        getData()
    }, [url]);

    // Si no hay datos, no renderiza nada
    if (!datos) return null;

    return (
        <div className='pokemon-box'>
            <Link to={`/${datos?.name}`}>
                <img src={datos?.sprites.front_default} alt={datos?.name} className="pokemon-img" />
                <p className="pokemon-id">N.º {datos ? String(datos.id).padStart(3, '0') : ''}</p>
                <p className="pokemon-name">{datos?.forms[0].name.charAt(0).toUpperCase() + datos?.forms[0].name.substring(1)}</p>
                <div className="pokemon-type">
                    {datos && datos.types.map((type, index) => (
                        <span key={index} className={`pokemon-type-text ${type.type.name}`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1)}</span>
                    ))}
                </div>
            </Link>
        </div>
    )
}
