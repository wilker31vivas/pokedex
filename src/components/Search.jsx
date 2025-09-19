import { FaSearch } from "react-icons/fa";
import SelectType from "./SelectType";
import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';


export default function Search() {
    const { handleForm, handleSelectType } = useContext(PokemonContext);

    return (
        <div className="container-search">
            <div className="search">
                <label htmlFor="search" className="label-search">Search by name or number</label>
                <form className="form-search" onSubmit={e => handleForm(e)}>
                    <input type="text" placeholder="Search for Pokémon" name="search" id="search" className="input-search" />
                    <button className="button-search"><FaSearch className="icon" /></button>
                </form>
            </div>
            <SelectType handleSelectType={handleSelectType}></SelectType>
        </div>
    )
}