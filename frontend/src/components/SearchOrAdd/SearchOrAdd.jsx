/* eslint-disable camelcase */

import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/AuthContext";

import "./SearchOrAdd.scss";

export default function SearchOrAdd({
  label,
  icon,
  placeholder,
  id,
  query,
  field,
  formObject,
  setFormObject,
}) {
  const { userToken } = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [areResultsVisible, setAreResultsVisible] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleFormObject = (item_id) => {
    setFormObject({
      ...formObject,
      [id]: item_id,
    });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/${query}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setSearchData(response.data);
        setDisplayedData(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const filterResults = (value) => {
    if (value !== fieldValue)
      if (value.length >= 2) {
        const filteredData = searchData.filter((item) => {
          return item[field].toLowerCase().includes(value.toLowerCase());
        });
        if (filteredData.length === 0) {
          setIsButtonVisible(true);
        } else {
          setIsButtonVisible(false);
        }
        setDisplayedData(filteredData.splice(0, 4));
        setAreResultsVisible(true);
      } else {
        setAreResultsVisible(false);
        setDisplayedData(searchData);
      }
  };

  useEffect(() => {
    filterResults(fieldValue);
  }, [fieldValue]);

  return (
    <div className="input-field search-or-add">
      <label htmlFor={id}>{label}</label>
      <div className="input">
        <i className={`fi fi-rr-${icon}`} />
        <input
          type="text"
          placeholder={placeholder}
          id={id}
          onChange={(e) => {
            setFieldValue(e.target.value);
            filterResults(e.target.value);
          }}
          value={fieldValue}
        />
        {isButtonVisible && <button type="button">Ajouter à la base</button>}
      </div>
      {areResultsVisible && displayedData.length > 0 && (
        <ul className="results">
          {displayedData.map((item) => (
            <li
              className="result"
              key={item.id}
              onClick={() => {
                setFieldValue(item[field]);
                setAreResultsVisible(false);
                handleFormObject(item.id);
              }}
              aria-hidden="true"
            >
              {item[field]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
SearchOrAdd.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  formObject: PropTypes.shape({
    brand: PropTypes.number.isRequired,
    model: PropTypes.number.isRequired,
    OSId: PropTypes.number.isRequired,
    ram: PropTypes.number.isRequired,
    memory: PropTypes.number.isRequired,
    network: PropTypes.string.isRequired,
    accessoryId: PropTypes.number.isRequired,
    stateId: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
  }).isRequired,
  setFormObject: PropTypes.func.isRequired,
};
