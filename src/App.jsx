import { useState } from 'react'
import './App.css'

function App() {
  const [carro, setCarro] = useState('BMW')

  function trocarDeCarro() {
    setCarro("Mustang")
  }
  return (
    <>
      <h1>{carro}</h1>
      <button onClick={trocarDeCarro}>trocar de carro</button>
    </>
  )
}

export default App
