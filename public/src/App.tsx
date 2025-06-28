import { useState } from 'react'
import { Flip } from './components'

function App() {
  const [count] = useState(0o000000)

  return (
    <>
      <Flip value={count} />
    </>
  )
}

export default App
