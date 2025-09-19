import { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/select.css";
import { PokemonContext } from '../context/PokemonContext';

export default function SelectType() {
    const [types, setTypes] = useState([]);
    const { handleSelectType } = useContext(PokemonContext);
    const [typeSelected, setTypeSelected] = useState("");

    // guardar todos los tipos de pokemon
    useEffect(() => {
        async function fetchTypes() {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/type");
                if (!response.ok) throw new Error(`Response status: ${response.status}`);
                const data = await response.json();
                setTypes(data.results.slice(0, 18)); // Limitar a los primeros 18 tipos
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        }

        fetchTypes();
    }, []);

    return (
        <div className="select-type-container">
            <label htmlFor="select" className="select-label">Search by type</label>
            <div className="select-container">
                <select name="select" id="select"
                    value={typeSelected}
                    onChange={(e) => setTypeSelected(e.target.value)}
                    className={`select-dropdown ${typeSelected ? `type-${typeSelected}` : 'type-default'}`}
                >
                    <option value="" className="pokemon-type-text type-default">All</option>
                    {types.map((type) => (
                        <option key={type.name} value={type.name} className={`pokemon-type-text ${type.name}`}>
                            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                        </option>
                    ))}
                </select>
                <button className="button-search" onClick={() => handleSelectType(typeSelected)}><FaSearch className="icon" /></button>
            </div>
        </div>
    )

}