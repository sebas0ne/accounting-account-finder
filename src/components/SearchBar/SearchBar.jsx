"use client"

import { useEffect, useRef } from "react"
import "./SearchBar.css"

const SearchBar = ({ searchTerm, onSearchChange, onSearch, onClear, isActive, onShowAll, onReset }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, onSearch])

  const handleInputChange = (e) => {
    onSearchChange(e.target.value)
  }

  const handleClear = () => {
    onClear()
    if (searchTerm !== "") {
      console.log(inputRef.current);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="CÓDIGO O DESCRIPCIÓN..."
          className="search-input"
          id="inputSubAccounts"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-button" aria-label="Limpiar búsqueda">
            ✕
          </button>
        )}
        <div className="search-icon">🔍</div>
      </div>
      <div className="search-buttons">
        <button onClick={onShowAll} className="search-action-button">
          TODAS LAS SUBCUENTAS
        </button>
        {isActive && (
          <button onClick={onReset} className="search-action-button">
            INICIO
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
