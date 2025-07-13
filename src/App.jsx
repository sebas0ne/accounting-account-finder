"use client"

import { useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar.jsx"
import TypeSelector from "./components/TypeSelector/TypeSelector.jsx"
import ResultsList from "./components/ResultsList/ResultsList"
import { cuentasData } from "./data/cuentasData.js"
import "./styles/App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState(null)
  const [results, setResults] = useState([])
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [showingAllAccounts, setShowingAllAccounts] = useState(false)

  // Función para buscar cuentas por código o descripción
  const searchAccounts = (term) => {
    if (!term.trim()) {
      setResults([])
      setIsSearchActive(false)
      return
    }

    const searchResults = []
    cuentasData.forEach((tipo) => {
      tipo.cuentas.forEach((cuenta) => {
        if (
          cuenta.codigoC.toLowerCase().includes(term.toLowerCase()) ||
          cuenta.descripcion.toLowerCase().includes(term.toLowerCase())
        ) {
          searchResults.push({
            ...cuenta,
            tipoTitulo: tipo.titulo,
            tipoCode: tipo.codigoT,
          })
        }
      })
    })

    setResults(searchResults)
    setIsSearchActive(true)
    setSelectedType(null)
    setShowingAllAccounts(false)
  }

  // Función para filtrar por tipo de cuenta
  const filterByType = (tipoCode) => {
    const tipo = cuentasData.find((t) => t.codigoT === tipoCode)
    if (tipo) {
      const typeResults = tipo.cuentas.map((cuenta) => ({
        ...cuenta,
        tipoTitulo: tipo.titulo,
        tipoCode: tipo.codigoT,
      }))

      setResults(typeResults)
      setSelectedType(tipo)
      setIsSearchActive(true)
      setSearchTerm("")
      setShowingAllAccounts(false)
    }
  }

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm("")
    setSelectedType(null)
    setResults([])
    setIsSearchActive(false)
    setShowingAllAccounts(false)
  }

  // Función para mostrar todas las cuentas
  const showAllAccounts = () => {
    const allAccounts = []
    cuentasData.forEach((tipo) => {
      tipo.cuentas.forEach((cuenta) => {
        allAccounts.push({
          ...cuenta,
          tipoTitulo: tipo.titulo,
          tipoCode: tipo.codigoT,
        })
      })
    })

    setResults(allAccounts)
    setIsSearchActive(true)
    setSelectedType(null)
    setSearchTerm("")
    setShowingAllAccounts(true)
  }

  // Función para regresar al estado original
  const resetToInitial = () => {
    setSearchTerm("")
    setSelectedType(null)
    setResults([])
    setIsSearchActive(false)
    setShowingAllAccounts(false)
  }

  return (
    <div className="app">
      <div className={`search-container ${isSearchActive ? "search-active" : ""}`}>
        <TypeSelector onSelectType={filterByType} selectedType={selectedType} cuentasData={cuentasData} />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={searchAccounts}
          onClear={clearSearch}
          isActive={isSearchActive}
          onShowAll={showAllAccounts}
          onReset={resetToInitial}
        />
      </div>

      {isSearchActive && (
        <ResultsList
          results={results}
          searchTerm={searchTerm}
          selectedType={selectedType}
          showingAllAccounts={showingAllAccounts}
        />
      )}

      {!isSearchActive && (
        <div className="welcomeMesagge">
          <h1>BUSCADOR DE CUENTAS CONTABLES</h1>
          <p>Para Di con amor.</p>
        </div>
      )}
    </div>
  )
}

export default App
