
function Filtres({ filtre, onChanger }) {

  const options = [
    { valeur: 'toutes', libelle: 'Toutes' },
    { valeur: 'actives', libelle: 'À faire' },
    { valeur: 'terminees', libelle: 'Terminées' }
  ]

  return (
    <div className="filtres">
      {options.map((option) => (
        <button
          key={option.valeur}
          className={filtre === option.valeur ? 'actif' : ''}
          onClick={() => onChanger(option.valeur)}
        >
          {option.libelle}
        </button>
      ))}
    </div>
  )
}

export default Filtres
