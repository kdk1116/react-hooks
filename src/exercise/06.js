// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemonState, setPokemonState] = React.useState(null)
  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemonState(null)
    fetchPokemon(pokemonName).then(pokemonData => {
      setPokemonState(pokemonData)
    })
  }, [pokemonName])
  if (!pokemonName) {
    return 'Submit a pokemon'
  } else if (pokemonName && !pokemonState) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemonState} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
