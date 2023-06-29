/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import propTypes from "prop-types";
import SearchOrAdd from "../SearchOrAdd/SearchOrAdd";
import AuthContext from "../../contexts/AuthContext";
import "./NewPhoneModal.scss";

export default function NewPhoneModal({ setIsNewPhoneModalOpen }) {
  const AuthValue = useContext(AuthContext);
  const { userToken } = AuthValue;
  const [formStep, setFormStep] = useState(1);
  const [accessories, setAccessories] = useState([]);
  const [states, setStates] = useState([]);

  const Networks = ["3G", "4G", "5G"];
  const RAM = [1, 2, 3, 4, 6, 8, 12, 16];
  const Memory = [16, 32, 64, 128, 256, 512, 1024];

  useEffect(() => {
    const endpoints = [
      `${import.meta.env.VITE_BACKEND_URL}/accessories`,
      `${import.meta.env.VITE_BACKEND_URL}/states`,
    ];
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
      )
    ).then(([{ data: dbAccess }, { data: dbStates }]) => {
      setAccessories(dbAccess);
      setStates(dbStates);
    });
  }, []);

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
        </div>
      </div>
    </div>
  );
}

NewPhoneModal.propTypes = {
  setIsNewPhoneModalOpen: propTypes.func.isRequired,
};