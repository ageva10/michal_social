import { useEffect, useRef, useState } from 'react'
import Tick from '@pqina/flip'
import '@pqina/flip/dist/flip.min.css'

type FlipProps = {
  value: number
}

const Flip = ({ value }: FlipProps) => {
  const tickRef = useRef(null)
  const tickInstance = useRef(null)
  const [count, setCount] = useState(value)

  // Initialize Flip on mount
  useEffect(() => {
    tickInstance.current = Tick.DOM.create(tickRef.current, {
      value: formatNumber(count),
    })

    return () => {
      Tick.DOM.destroy(tickRef.current)
    }
  }, [])

  // Update value on count change
  useEffect(() => {
    if (tickInstance.current) {
      tickInstance.current.value = formatNumber(count)
    }
  }, [count])

  // Increment every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev: number): number => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: any) => num.toString().padStart(7, '0')

  return (
    <div ref={tickRef} className="tick">
      <div data-repeat="true" aria-hidden="true">
        <span data-view="flip">0</span>
      </div>
    </div>
  );
};

export default Flip;
