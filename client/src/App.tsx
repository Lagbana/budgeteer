import React from 'react'

function App () {
  function sum (a: number, b: number): number {
    return a + b
  }

  return (
    <div>
      <h1>Rick and Morty</h1>
      <p>Pick your favorite episode</p>
    </div>
  )
}

export default App
