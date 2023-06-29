import "./Home.scss";
import React, { useState, useEffect } from "react";

import calculatePhonePrice from "../../components/GeneratePhonePrice/GeneratePhonePrice";

export default function Home() {
  const [phonePrice, setPhonePrice] = useState("");

  useEffect(() => {
    // Appeler la fonction calculatePhonePrice et mettre à jour la valeur de phonePrice
    const price = calculatePhonePrice();
    setPhonePrice(price);
  }, []);
  console.error(phonePrice);
  return (
    <header className="App-header">
      <h1>
        Hackathon 2 <i className="fi fi-rr-party-horn" />
      </h1>
      <div className="input-line">
        <div className="input-field">
          <label htmlFor="search">Rechercher</label>
          <div className="input">
            <i className="fi fi-rr-search" />
            <input type="text" placeholder="Search" id="search" />
          </div>
        </div>
        <div className="input-dropdown">
          <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>

        <div className="input-switch input-switch--sm">
          <label htmlFor="switch">
            <input type="checkbox" name="" id="switch" />
            <div className="toggle-switch" />
          </label>
        </div>
        <div className="input-field">
          <label htmlFor="search">Rechercher</label>
          <div className="input">
            <i className="fi fi-rr-search" />
            <input type="text" placeholder="Search" id="search" />
          </div>
        </div>
      </div>
    </header>
  );
}
