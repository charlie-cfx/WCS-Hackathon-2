import React from "react";
import Authentication from "../../components/Authentication/Authentication";
import "./AuthenticationPage.scss";

function AuthenticationPage() {
  return (
    <div className="authentication-container">
      <div className="page-content">
        <div className="form">
          <h1>Connectez vous à votre compte</h1>

          <Authentication />
        </div>
      </div>
      <div className="image">
        <img src="../src/assets/Logo.svg" alt="Logo Emmaus Connect" />
      </div>
    </div>
  );
}

export default AuthenticationPage;
