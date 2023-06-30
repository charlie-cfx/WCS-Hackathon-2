/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import propTypes from "prop-types";
import SearchOrAdd from "../SearchOrAdd/SearchOrAdd";
import AuthContext from "../../contexts/AuthContext";
import "./NewPhoneModal.scss";

export default function NewPhoneModal({ setIsNewPhoneModalOpen }) {
  const AuthValue = useContext(AuthContext);
  const { userToken, setTogglePhones, togglePhones } = AuthValue;
  const [formStep, setFormStep] = useState(1);
  const [accessories, setAccessories] = useState([]);
  const [inputStates, setInputStates] = useState([]);
  const [basePrice, setBasePrice] = useState(0);

  const [formObject, setFormObject] = useState({
    brand: 0,
    model: 0,
    OSId: 0,
    ram: 0,
    memory: 0,
    network: "",
    accessoryId: 0,
    stateId: 0,
    basePrice: 0,
  });

  const handleOSId = (e) => {
    setFormObject({
      ...formObject,
      OSId: parseInt(e.target.value, 10),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/phone`, formObject, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setIsNewPhoneModalOpen(false);
          setTogglePhones(!togglePhones);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const networks = ["3G", "4G", "5G"];
  const RAMs = [1, 2, 3, 4, 6, 8, 12, 16];
  const memories = [16, 32, 64, 128, 256, 512, 1024];

  const nextFormStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const prevFormStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

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
      setInputStates(dbStates);
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
          {formStep === 1 && (
            <>
              <div className="input-line">
                <SearchOrAdd
                  label="Marque"
                  icon="search"
                  placeholder="Rechercher une marque"
                  id="brand"
                  query="brands"
                  field="brand_name"
                  formObject={formObject}
                  setFormObject={setFormObject}
                />
                <SearchOrAdd
                  label="Modèle du smartphone"
                  icon="search"
                  placeholder="Rechercher un modèle"
                  id="model"
                  query="models"
                  field="model_name"
                  formObject={formObject}
                  setFormObject={setFormObject}
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
                  formObject={formObject}
                  setFormObject={setFormObject}
                />
              </div>

              <div className="radio-group-os">
                <p className="label">OS</p>
                <div className="radios">
                  <input
                    type="radio"
                    name="os"
                    id="iOS"
                    value={2}
                    onChange={handleOSId}
                  />
                  <label htmlFor="iOS">
                    <p>
                      <i className="fi fi-brands-apple" />
                      iOS
                    </p>
                  </label>
                  <input
                    type="radio"
                    name="os"
                    id="android"
                    value={1}
                    onChange={handleOSId}
                  />
                  <label htmlFor="android">
                    <p>
                      <i className="fi fi-brands-android" />
                      Android
                    </p>
                  </label>
                  <input
                    type="radio"
                    name="os"
                    id="HarmonyOS"
                    value={4}
                    onChange={handleOSId}
                  />
                  <label htmlFor="HarmonyOS">
                    <p>
                      <i className="fi fi-brands-huawei" />
                      HarmonyOS
                    </p>
                  </label>
                </div>
              </div>
            </>
          )}

          {formStep === 2 && (
            <>
              <div className="radio-group-features radio-group-full">
                <p className="label">Réseau</p>
                <ul className="radios">
                  {networks.map((network) => (
                    <li key={network}>
                      <input
                        type="radio"
                        name="reseau"
                        id={network}
                        value={network}
                        onChange={(e) => {
                          setFormObject({
                            ...formObject,
                            network: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor={network}>
                        <p>{network}</p>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="radio-group-features">
                <p className="label">Mémoire RAM</p>
                <ul className="radios">
                  {RAMs.map((RAM) => (
                    <li key={RAM}>
                      <input
                        type="radio"
                        name="ram"
                        id={RAM}
                        value={RAM}
                        onChange={(e) => {
                          setFormObject({
                            ...formObject,
                            ram: parseInt(e.target.value, 10),
                          });
                        }}
                      />
                      <label htmlFor={RAM}>
                        <p>{RAM} Go</p>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="radio-group-features">
                <p className="label">Mémoire interne</p>
                <ul className="radios">
                  {memories.map((memory) => (
                    <li key={memory}>
                      <input
                        type="radio"
                        name="memory"
                        id={memory}
                        value={memory}
                        onChange={(e) => {
                          setFormObject({
                            ...formObject,
                            memory: parseInt(e.target.value, 10),
                          });
                        }}
                      />
                      <label htmlFor={memory}>
                        <p>{memory} Go</p>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {formStep === 3 && (
            <>
              <div className="radio-group-features">
                <p className="label">Accessoires</p>
                <ul className="radios">
                  {accessories.map((accessory) => (
                    <li key={accessory.id}>
                      <input
                        type="radio"
                        name="accessory"
                        id={accessory.id}
                        value={accessory.id}
                        onChange={(e) =>
                          setFormObject({
                            ...formObject,
                            accessoryId: parseInt(e.target.value, 10),
                          })
                        }
                      />
                      <label htmlFor={accessory.id}>
                        <p>{accessory.name}</p>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="radio-group-features">
                <p className="label">État</p>
                <ul className="radios">
                  {inputStates.map((state) => (
                    <li key={state.state}>
                      <input
                        type="radio"
                        name="inputState"
                        id={state.state}
                        value={state.id}
                        onChange={(e) =>
                          setFormObject({
                            ...formObject,
                            stateId: parseInt(e.target.value, 10),
                          })
                        }
                      />
                      <label htmlFor={state.state}>
                        <p>{state.state}</p>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="input-line">
                <div className="input-field">
                  <label htmlFor="basePrice">Prix de base</label>
                  <div className="input">
                    <input
                      type="text"
                      placeholder="Saisissez un prix"
                      id="basePrice"
                      value={basePrice}
                      onChange={(e) => {
                        setBasePrice(e.target.value);
                        setFormObject({
                          ...formObject,
                          basePrice: parseInt(e.target.value, 10),
                        });
                      }}
                      onFocus={() => setBasePrice("")}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="actions">
            {formStep > 1 && (
              <button type="button" className="prev" onClick={prevFormStep}>
                <i className="fi fi-rr-angle-small-left" />
                Précédent
              </button>
            )}
            {formStep < 3 && (
              <button type="button" className="next" onClick={nextFormStep}>
                Suivant <i className="fi fi-rr-angle-small-right" />
              </button>
            )}
            {formStep === 3 && (
              <button type="button" className="submit" onClick={handleSubmit}>
                Envoyer <i className="fi fi-rr-paper-plane-top" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

NewPhoneModal.propTypes = {
  setIsNewPhoneModalOpen: propTypes.func.isRequired,
};
