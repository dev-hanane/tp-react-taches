
import { useState } from 'react'

function Tache({
  id,
  titre,
  terminee,
  onBasculer,
  onSupprimer,
  onModifier
}) {
  const [enEdition, setEnEdition] = useState(false)
  const [nouveauTitre, setNouveauTitre] = useState(titre)

  // Commencer la modification
  function commencerEdition() {
    setNouveauTitre(titre)
    setEnEdition(true)
  }

  // Enregistrer la modification
  function enregistrerModification() {
    const titreNettoye = nouveauTitre.trim()

    if (titreNettoye === '') {
      setNouveauTitre(titre)
      setEnEdition(false)
      return
    }

    onModifier(id, titreNettoye)
    setEnEdition(false)
  }

  // Gérer les touches du clavier
  function gererClavier(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      enregistrerModification()
    }

    if (event.key === 'Escape') {
      setNouveauTitre(titre)
      setEnEdition(false)
    }
  }

  return (
    <li className={terminee ? 'tache terminee' : 'tache'}>

      <label>
        <input
          type="checkbox"
          checked={terminee}
          onChange={() => onBasculer(id)}
        />

        {enEdition ? (
          <input
            type="text"
            value={nouveauTitre}
            autoFocus
            onChange={(event) => setNouveauTitre(event.target.value)}
            onKeyDown={gererClavier}
            onBlur={enregistrerModification}
            onClick={(event) => event.stopPropagation()}
          />
        ) : (
          <span
            className="titre"
            onDoubleClick={commencerEdition}
            title="Double-cliquez pour modifier"
          >
            {titre}
          </span>
        )}
      </label>

      <button
        className="danger"
        onClick={() => onSupprimer(id)}
      >
        Supprimer
      </button>

    </li>
  )
}

export default Tache
