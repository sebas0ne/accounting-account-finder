"use client"

import { useEffect, useRef } from "react"
import "./SearchBar.css"

const SearchBar = ({ searchTerm, onSearchChange, onSearch, onClear, isActive, isFilterType}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(isFilterType);
      if (searchTerm) {
        onSearch(searchTerm)
      }
      else if (searchTerm === "" && isFilterType === "") {
        handleClear();
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, onSearch])

  const handleInputChange = (e) => {
    onSearchChange(e.target.value)
  }

  const handleClear = () => {
    onClear()
    if (searchTerm !== "" && isFilterType !== "") {
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
        <div onClick={handleClear} className="search-icon">🔍</div>
      </div>
    </div>
  )
}

export default SearchBar
