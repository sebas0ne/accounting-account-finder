"use client"

import { useState, useRef } from "react"
import Modal from "../modal/Modal"
import "./TypeSelector.css"

const TypeSelector = ({ onSelectType, selectedType, cuentasData }) => {
  const putinRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterTerm, setFilterTerm] = useState("")

  const filteredTypes = cuentasData.filter(
    (tipo) => tipo.titulo.toLowerCase().includes(filterTerm.toLowerCase()) || tipo.codigoT.includes(filterTerm),
  )

  const handleTypeSelect = (tipoCode) => {
    console.log(filterTerm);
    onSelectType(tipoCode)
    setIsModalOpen(false)
    setFilterTerm("")
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    setTimeout(() => {
      console.log(putinRef.current);
      putinRef.current?.focus();
    }, 200)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFilterTerm("")
  }

  return (
    <>
      <div className="typeSelector">
        <button onClick={handleOpenModal} className="typeSelectorButton">
          <span>{selectedType ? selectedType.titulo : "TIPO DE CUENTA"}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modalHeader">
          <h2>CUENTAS Y SUBCUENTAS</h2>
          <button onClick={handleCloseModal} className="modalClose">
            ✕
          </button>
        </div>

        <div className="modalSearch">
          <input
            ref={putinRef}
            type="text"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            placeholder="Buscar tipos de cuentas..."
            className="search-input"
            id="inputAccounts"
          />
        </div>

        <div className="types-list">
          {filteredTypes.length > 0 ? (
            filteredTypes.map((tipo) => (
              <button key={tipo.codigoT} onClick={() => handleTypeSelect(tipo.codigoT)} className="type-item">
                <span className="type-code">{tipo.codigoT}</span>
                <span className="type-title">{tipo.titulo}</span>
                <span className="accounts-count">
                  {tipo.cuentas.length} subcuenta{tipo.cuentas.length !== 1 ? "s" : ""}
                </span>
              </button>
            ))
          ) : (
            <div className="no-results">
              <p>No se encontraron cuentas contables.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default TypeSelector
