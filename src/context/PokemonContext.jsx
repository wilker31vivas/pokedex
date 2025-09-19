import { createContext } from "react";
import { useState, useEffect } from "react";
export const PokemonContext = createContext()

export default function PokemonContextProvider(props) {
    const [index, setIndex] = useState(() => {
        const saved = localStorage.getItem('index');
        return saved ? parseInt(saved) : 0;
    });
    const limit = 20
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null);
    const [pokemonSearch, setPokemonSearch] = useState(null)
    const [searchError, setSearchError] = useState(false)
    const [apiError, setApiError] = useState(false);
    const [selectedType, setSelectedType] = useState(false);

    async function getData() {
        setLoading(true);
        setSearchError(false)
        setApiError(false);
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${index}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Response status: ${response.status}`);

            const json = await response.json();
            setData(json.results);
            setLoading(false);
        }
        catch (error) {
            if (error.name === 'TypeError') {
                setApiError(true);
            }
            setData(null);
            setLoading(false);
            return;
        }
    }

    useEffect(() => {
        getData()
        localStorage.setItem('index', index);
    }, [index, limit]);

    const handleForm = (e) => {
        e.preventDefault()

        const inputValue = e.target[0].value.trim();

        //en caso de apiError sea true
        if (apiError) { setApiError(false); }

        //en caso de no buscar ningun pokemon
        if (!inputValue) {
            setSearchError(false)
            setPokemonSearch(null)
            setData(null)
            getData()
            setLoading(false);
            return;
        } else {
            setPokemonSearch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
            setData(null)
            setLoading(false);
            setSearchError(false);

        }
    }

    const handleSelectType = async (type) => {
        if (!type) {
            setApiError(false);
            setPokemonSearch(null);
            setLoading(true);
            try {
                await getData();
                setSelectedType(prev => !prev)

            } catch (err) {
                setApiError(true);
                setData(null);
            } finally {
                setLoading(false);
            }
            return;
        }
        const url = `https://pokeapi.co/api/v2/type/${type}`;
        setLoading(true);
        setApiError(false);
        setPokemonSearch(null);
        setData(null);


        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Status: ${response.status}`);

            const json = await response.json();
            const filtered = json.pokemon.map(p => p.pokemon);
            setSelectedType(prev => !prev)
            setData(filtered);
        } catch (error) {
            console.error("Error fetching type data:", error);
            setApiError(true);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <PokemonContext.Provider
            value={{
                index, setIndex,
                data, pokemonSearch,
                loading, setLoading,
                apiError, limit,
                searchError, setSearchError,
                handleForm, handleSelectType,
                selectedType, setSelectedType,
            }}>
            {props.children}
        </PokemonContext.Provider>
    )
}