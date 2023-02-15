import React from 'react'
import { useAtom } from 'jotai'

import { countAtom } from '@/src/store/count'

const Counter = () => {
  const [count, setCount] = useAtom(countAtom)

  return (
    <>
      <div id="counter">{count}</div>
      <div>
        <button onClick={() => setCount(count + 1)} id="plusButton" type="button">
          +
        </button>
        <button onClick={() => setCount(count - 1)} id="minusButton" type="button">
          -
        </button>
      </div>
    </>
  )
}

Counter.whydidyourender = true

export default Counter
