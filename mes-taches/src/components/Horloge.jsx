
import { useEffect, useState } from 'react'

function Horloge() {
  const [maintenant, setMaintenant] = useState(() => new Date())

  useEffect(() => {
    const intervalle = setInterval(() => {
      setMaintenant(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalle)
    }
  }, [])

  return (
    <p className="horloge">
      {maintenant.toLocaleTimeString('fr-FR')}
    </p>
  )
}

export default Horloge
