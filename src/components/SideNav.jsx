import { useState, useEffect, useRef } from 'react'
import { first151Pokemon, getFullPokedexNumber } from '../utils'

export default function SideNav(props) {
    const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } = props

    const [searchValue, setSearchValue] = useState('')
    const [keyPressed, setKeyPressed] = useState(false)
    const inputRef = useRef(null) // Ref to the input element

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        // if the full pokedex includes the current search value, return true
        if ((getFullPokedexNumber(eleIndex)).includes(searchValue)) { return true }

        // if the pokemon name includes the current search value, return true
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) { return true }

        // otherwise, exclude value from the array
        return false
    })

    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.key === '/') {
                setKeyPressed(true) // Add the pressed class
            }
        }

        const handleKeyup = (e) => {
            if (e.key === '/') {
                e.preventDefault() // Prevent default `/` action
                inputRef.current.focus() // Focus the input field
                setKeyPressed(false) // Remove the pressed class on key release
            }
        }

        window.addEventListener('keydown', handleKeydown)
        window.addEventListener('keyup', handleKeyup)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
            window.removeEventListener('keyup', handleKeyup)
        }
    }, [])

    return (
        <nav className={'' + (!showSideMenu ? 'open' : '')}>
            <div className={"header" + (!showSideMenu ? 'open' : '')}>
                <button onClick={handleCloseMenu} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <div className="for-pill">
                <input
                    ref={inputRef} // Assign the ref to the input element
                    placeholder='E.g. 001 or Bulba...'
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                />
                <p className={`pill pill--key ${keyPressed ? 'pill--key-pressed' : ''}`}>
                    /
                </p>
            </div>
            {filteredPokemon.map((pokemon, pokemonIndex) => {
                const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                return (
                    <button onClick={() => {
                        setSelectedPokemon(truePokedexNumber)
                        handleCloseMenu()
                    }} key={pokemonIndex} className={'nav-card ' + (pokemonIndex === selectedPokemon ? 'nav-card-selected' : '')}>
                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}