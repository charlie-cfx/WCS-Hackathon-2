import "./Navbar.scss";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userInfo } = useContext(AuthContext);

  const isAdmin = userInfo.is_admin;

  return (
    <>
      <nav id="navbar">
        <div className="logo">
          <img src="../src/assets/Logo.svg" alt="Logo Emmaus Connect" />
        </div>
        <ul className="items">
          {isAdmin === 1 && (
            <li>
              <button className="button-md-blue-solid" type="button">
                <i className="fi fi-rr-plus" /> Ajouter un smartphone
              </button>
            </li>
          )}
          <li>
            <button
              className="button-md-grey-link"
              onClick={() => navigate("/faq")}
              type="button"
            >
              <i className="fi fi-rr-interrogation" /> FAQ
            </button>
          </li>
          {isAdmin === 1 && (
            <li>
              <button className="button-md-grey-link" type="button">
                <i className="fi fi-rr-tags" /> Gérer la pondération
              </button>
            </li>
          )}
          <li>
            <button
              className="button-md-grey-link"
              type="button"
              onClick={() => navigate("/user")}
            >
              <i className="fi fi-rr-user" /> Mon compte
            </button>
          </li>
        </ul>
      </nav>
      <div id="navbar-mobile">
        <nav>
          <div className="logo">
            <img src="../src/assets/Logo.svg" alt="Logo Emmaus Connect" />
          </div>

          <button
            type="button"
            className="burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <i className="fi fi-rr-cross" />
            ) : (
              <i className="fi fi-rr-menu-burger" />
            )}
          </button>
        </nav>
        {isMenuOpen && (
          <ul className="items">
            {isAdmin === 1 && (
              <li>
                <button className="button-md-blue-solid" type="button">
                  <i className="fi fi-rr-plus" /> Ajouter un smartphone
                </button>
              </li>
            )}

            <li>
              <button
                className="button-md-grey-outline"
                onClick={() => navigate("/faq")}
                type="button"
              >
                <i className="fi fi-rr-interrogation" /> FAQ
              </button>
            </li>
            {isAdmin === 1 && (
              <li>
                <button className="button-md-grey-link" type="button">
                  <i className="fi fi-rr-tags" /> Gérer la pondération
                </button>
              </li>
            )}
            <li>
              <button
                className="button-md-grey-outline"
                onClick={() => navigate("/user")}
                type="button"
              >
                <i className="fi fi-rr-user" /> Mon compte
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
