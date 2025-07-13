import "./ResultsList.css"

const ResultsList = ({ results, searchTerm, selectedType, showingAllAccounts }) => {
  const highlightText = (text, highlight) => {
    if (!highlight) return text

    const parts = text.split(new RegExp(`(${highlight})`, "gi"))
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? <mark key={index}>{part}</mark> : part,
    )
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>
          {selectedType ? (
            <>
              Cuentas del tipo: <strong>{selectedType.titulo}</strong>
            </>
          ) : showingAllAccounts ? (
            <>
              Resultados para: <strong>Ver todas las subcuentas</strong>
            </>
          ) : (
            <>
              Resultados para: <strong>"{searchTerm}"</strong>
            </>
          )}
        </h2>
        <span className="results-count">
          {results.length} resultado{results.length !== 1 ? "s" : ""}
        </span>
      </div>

      {results.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron subcuentas contables.</p>
        </div>
      ) : (
        <div className="results-list">
          {results.map((cuenta, index) => (
            <div key={`${cuenta.codigoC}-${index}`} className="result-item">
              <div className="result-code">
                {searchTerm ? highlightText(cuenta.codigoC, searchTerm) : cuenta.codigoC}
              </div>
              <div className="result-description">
                {searchTerm ? highlightText(cuenta.descripcion, searchTerm) : cuenta.descripcion}
              </div>
              <div className="result-type">{cuenta.tipoTitulo}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResultsList
