/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AuthContext from "../../contexts/AuthContext";

import "./SearchOrAdd.scss";

export default function SearchOrAdd({ label, icon, placeholder, id, query }) {
  const { userToken } = useContext(AuthContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);

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
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  //   const handleChange = (e) => {
  //     // const value = e.target.value;
  //     // setDisplayedData(searchData.filter((item) => item[value].includes(value)));
  //     // console.log(displayedData);
  //   };

  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <div className="input">
        <i className={`fi fi-rr-${icon}`} />
        <input
          type="text"
          placeholder={placeholder}
          id={id}
          //   onChange={handleChange}
        />
      </div>
    </div>
  );
}
SearchOrAdd.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};
