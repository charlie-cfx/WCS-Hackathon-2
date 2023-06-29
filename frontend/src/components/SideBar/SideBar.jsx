import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import "./SideBar.scss";

function SideBar({ filters, setFilters }) {
  // -------------------------------------------context ans states--------------------------------------------------
  const AuthValue = useContext(AuthContext);
  const { userToken } = AuthValue;

  // state to manage the search
  const [search, setSearch] = useState("");

  // states to store the checkboxes fetched data
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [states, setStates] = useState([]);

  // state to get all the inputs values and set them in the dynamic fetch
  const [brandValues] = useState([]);
  const [modelValues] = useState([]);
  const [stateValues] = useState([]);

  // function to add a checked state in each array
  const addCheckedValue = (arr) => {
    const newArr = arr.map((item) => {
      return { ...item, checked: false };
    });
    return newArr;
  };

  //   ----------------------------------------------useEffects----------------------------------------------------------

  //   fetch the data for the checkboxes
  useEffect(() => {
    const endpoints = [
      `${import.meta.env.VITE_BACKEND_URL}/models`,
      `${import.meta.env.VITE_BACKEND_URL}/brand`,
      `${import.meta.env.VITE_BACKEND_URL}/state`,
    ];
    Promise.all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
      )
    ).then(([{ data: dbModels }, { data: dbBrands }, { data: dbStates }]) => {
      setModels(addCheckedValue(dbModels));
      setBrands(addCheckedValue(dbBrands));
      setStates(addCheckedValue(dbStates));
    });
  }, []);

  //   ------------------------------------------------handlers for inputs------------------------------------------------------

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleBrandChange = (event, index) => {
    if (event.target.checked) {
      brandValues.push(event.target.value);
    } else {
      brandValues.splice(brandValues.indexOf(event.target.value), 1);
    }
    setFilters({
      ...filters,
      brand: brandValues,
    });

    brands[index].checked = !brands[index].checked;
  };

  const handleModelChange = (event, index) => {
    if (event.target.checked) {
      modelValues.push(event.target.value);
    } else {
      modelValues.splice(modelValues.indexOf(event.target.value), 1);
    }
    setFilters({
      ...filters,
      model: modelValues,
    });

    models[index].checked = !models[index].checked;
  };

  const handleStateChange = (event, index) => {
    if (event.target.checked) {
      stateValues.push(event.target.value);
    } else {
      stateValues.splice(stateValues.indexOf(event.target.value), 1);
    }
    setFilters({
      ...filters,
      state: stateValues,
    });

    states[index].checked = !states[index].checked;
  };

  //   ---------------------------------------------------return------------------------------------------------------------

  return (
    <div className="side-bar">
      <div className="input-field">
        <label htmlFor="search">
          <div className="input">
            <i className="fi fi-rr-search" />
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search"
              value={search}
              id="search"
            />
          </div>
        </label>
        <div className="tags" />
      </div>

      <hr />
      <div className="brand">
        <h3>
          <span className="brand-color-red">•</span> Marque
        </h3>
        <div className="brand-inputs">
          {brands.map((brand, index) => (
            <div className="input-checkbox input-checkbox--sm" key={brand.id}>
              <label htmlFor={brand.brand_name}>
                <input
                  type="checkbox"
                  onChange={(e) => handleBrandChange(e, index)}
                  id={brand.brand_name}
                  name={brand.brand_name}
                  value={brand.id}
                  checked={brand.checked}
                />
                <div className="checkbox checkbox-red" /> {brand.brand_name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="model">
        <h3>
          <span className="brand-color-yellow">•</span> Modèle
        </h3>
        <div className="model-inputs">
          {" "}
          {models.map((model, index) => (
            <div className="input-checkbox input-checkbox--sm" key={model.id}>
              <label htmlFor={model.model_name}>
                <input
                  type="checkbox"
                  id={model.model_name}
                  name={model.name}
                  value={model.id}
                  onChange={(e) => handleModelChange(e, index)}
                />
                <div className="checkbox checkbox-yellow" /> {model.model_name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="state">
        <h3>
          <span className="brand-color-green">•</span> État
        </h3>
        <div className="state-inputs">
          {states.map((state, index) => (
            <div className="input-checkbox input-checkbox--sm" key={state.id}>
              <label htmlFor={state.state}>
                <input
                  type="checkbox"
                  id={state.state}
                  name={state.state}
                  value={state.id}
                  onChange={(e) => handleStateChange(e, index)}
                />
                <div className="checkbox checkbox-green" /> {state.state}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  filters: PropTypes.shape({
    model: PropTypes.arrayOf(PropTypes.string),
    brand: PropTypes.arrayOf(PropTypes.string),
    state: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default SideBar;
