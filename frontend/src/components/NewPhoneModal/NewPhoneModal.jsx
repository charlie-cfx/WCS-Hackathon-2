/* eslint-disable no-unused-vars */
import { useState } from "react";
import propTypes from "prop-types";
import SearchOrAdd from "../SearchOrAdd/SearchOrAdd";
import "./NewPhoneModal.scss";

export default function NewPhoneModal({ setIsNewPhoneModalOpen }) {
  const [formStep, setFormStep] = useState(1);

  return (
    <div className="modal new-phone-modal">
      <div
        className="filter"
        onClick={() => setIsNewPhoneModalOpen(false)}
        aria-hidden="true"
      />
      <div className="container">
        <div className="header">
          <div className="content">
            <h3>Nouveau smartphone</h3>
            <p className="details">Étape {formStep}/3</p>
          </div>
        </div>
        <div className="body">
          <div className="input-line">
            <SearchOrAdd
              label="Marque"
              icon="search"
              placeholder="Rechercher une marque"
              id="brand"
              query="brands"
            />
            <SearchOrAdd
              label="Modèle du smartphone"
              icon="search"
              placeholder="Rechercher un modèle"
              id="model"
              query="models"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

NewPhoneModal.propTypes = {
  setIsNewPhoneModalOpen: propTypes.func.isRequired,
};
