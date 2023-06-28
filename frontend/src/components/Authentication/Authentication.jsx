import React, { useState, useContext } from "react";
import axios from "axios";
import "./Authentication.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Authentication() {
  const { setUser, setUserInfo } = useContext(AuthContext);

  // regex definition for mail user
  // const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // useState definition
  const [mail, setMail] = useState("");
  // const [warningMail, setWarningMail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [failAuth, setFailAuth] = useState(false);

  const navigate = useNavigate();

  // submit handler for the form
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, dataFromForm)
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfo(response.data.user);
          navigate("/home");
        } else {
          console.info(response);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setFailAuth(true);
      });
  };

  // handler for change in input mail
  const handleMailChange = (event) => {
    setMail(event.target.value);
  };

  // handler for change in password input
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // toggle to change type input for password to show it if user click on the SHOW button
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="connection">
        <div className="connection-input">
          <label htmlFor="mail">Mail</label>
          <input
            name="mail"
            id="mail"
            type="text"
            autoComplete="true"
            value={mail}
            onChange={handleMailChange}
          />
          <p className="description-username">
            Votre nom d'utilisateur est votre mail fournit à votre inscription
          </p>
        </div>
        <div className="password-input">
          <label htmlFor="password">Mot de passe</label>
          <div className="password-input-and-show">
            <input
              name="password"
              id="password"
              autoComplete="current-password"
              type={!passwordShown ? "password" : "text"}
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              onClick={togglePassword}
              type="button"
              className="hide-or-show-button"
            >
              <i
                id="pw-icon-show-hide"
                className={
                  passwordShown ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"
                }
                alt="button to show or hide password"
              />
            </button>
          </div>
        </div>
        <button type="submit" className="connection-button">
          SE CONNECTER
        </button>
      </form>
      {failAuth && (
        <div>
          <button
            className="bg-fail-auth-modal"
            type="button"
            onClick={() => setFailAuth(false)}
            label="close fail authentication modal"
          />
          <div className="fail-auth-modal">
            <button
              className="exit-modal-fail-button"
              type="button"
              onClick={() => setFailAuth(false)}
            >
              <i className="fi fi-rr-cross-small" />
            </button>
            <p>Les champs renseignés ne correspondent pas.</p>
            <p>Veuillez réessayer.</p>
          </div>
        </div>
      )}
    </div>
  );
}
