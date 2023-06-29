import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import AuthContext from "../../contexts/AuthContext";

import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [userToken]);

  return (
    userToken && (
      <div className="home">
        {" "}
        <Navbar />
        <SideBar />
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
      </div>
    )
  );
}
