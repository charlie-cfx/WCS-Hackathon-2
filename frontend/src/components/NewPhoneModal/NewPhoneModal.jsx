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
              field="brand_name"
            />
            <SearchOrAdd
              label="Modèle du smartphone"
              icon="search"
              placeholder="Rechercher un modèle"
              id="model"
              query="models"
              field="model_name"
            />
          </div>

          <div className="input-line">
            <SearchOrAdd
              label="Couleur du smartphone"
              icon="search"
              placeholder="Rechercher la couleur"
              id="color"
              query="colors"
              field="color_name_fr"
            />
          </div>

          <div className="radio-group-os">
            <p className="label">OS</p>
            <div className="radios">
              <input type="radio" name="os" id="iOS" />
              <label htmlFor="iOS">
                <p>
                  <i className="fi fi-brands-apple" />
                  iOS
                </p>
              </label>
              <input type="radio" name="os" id="android" />
              <label htmlFor="android">
                <p>Android</p>
              </label>
              <input type="radio" name="os" id="HarmonyOS" />
              <label htmlFor="HarmonyOS">
                <p>HarmonyOS</p>
              </label>
            </div>
          </div>

          <div className="actions">
            <button type="button" className="next">
              Suivant <i className="fi fi-rr-angle-small-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NewPhoneModal.propTypes = {
  setIsNewPhoneModalOpen: propTypes.func.isRequired,
};
