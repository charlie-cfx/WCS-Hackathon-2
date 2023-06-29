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
}) {
  const { userToken } = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [areResultsVisible, setAreResultsVisible] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

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

  // handleAddClick = () => {
  //   axios.post;
  // };

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
};
