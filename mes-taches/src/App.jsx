
import { useState, useEffect } from 'react'

import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'
import Horloge from './components/Horloge.jsx'

function App() {
  const [taches, setTaches] = useState([])

  const [filtre, setFiltre] = useState('toutes')

  // États du chargement JSON
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  // Charger les tâches depuis le fichier JSON
  useEffect(() => {
    let annule = false

    fetch('/taches.json')
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP ${reponse.status}`)
        }

        return reponse.json()
      })
      .then((donnees) => {
        if (!annule) {
          setTaches(donnees)
        }
      })
      .catch((err) => {
        if (!annule) {
          setErreur(err.message)
        }
      })
      .finally(() => {
        if (!annule) {
          setChargement(false)
        }
      })

    return () => {
      annule = true
    }
  }, [])

  // Ajouter une tâche
  function ajouterTache(titre) {
    const nouvelleTache = {
      id: Date.now(),
      titre,
      terminee: false
    }

    setTaches((anciennesTaches) => [
      ...anciennesTaches,
      nouvelleTache
    ])
  }

  // Basculer l'état d'une tâche
  function basculerTache(id) {
    setTaches((anciennesTaches) =>
      anciennesTaches.map((tache) =>
        tache.id === id
          ? { ...tache, terminee: !tache.terminee }
          : tache
      )
    )
  }

  // Supprimer une tâche
  function supprimerTache(id) {
    setTaches((anciennesTaches) =>
      anciennesTaches.filter((tache) => tache.id !== id)
    )
  }

  // Calculer les tâches visibles
  const tachesVisibles = taches.filter((tache) => {
    if (filtre === 'actives') {
      return !tache.terminee
    }

    if (filtre === 'terminees') {
      return tache.terminee
    }

    return true
  })

  // Calculer le nombre de tâches restantes
  const restantes = taches.filter(
    (tache) => !tache.terminee
  ).length

  // Synchroniser le titre de l'onglet
  useEffect(() => {
    document.title = `(${restantes}) Mes tâches`
  }, [restantes])

  return (
    <div className="app">

      <Entete
        titre="Mes tâches"
        sousTitre="Mon premier projet React"
      />

      <Carte titre="Heure actuelle">
        <Horloge />
      </Carte>

      <Carte titre="Compteur">
        <Compteur />
      </Carte>

      <Carte titre="Nouvelle tâche">
        <FormulaireAjout onAjouter={ajouterTache} />
      </Carte>

      <Carte titre="Ma liste">

        {chargement && (
          <p className="vide">
            Chargement des tâches…
          </p>
        )}

        {erreur && (
          <p className="erreur">
            Erreur : {erreur}
          </p>
        )}

        {!chargement && !erreur && (
          <>
            <Filtres
              filtre={filtre}
              onChanger={setFiltre}
            />

            <ListeTaches
              taches={tachesVisibles}
              onBasculer={basculerTache}
              onSupprimer={supprimerTache}
            />
          </>
        )}

      </Carte>

      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>

      <Pied auteur="HANANE CHAAOUAN" />

    </div>
  )
}

export default App
