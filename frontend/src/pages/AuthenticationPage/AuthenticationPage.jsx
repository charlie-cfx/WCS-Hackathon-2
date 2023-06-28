import React from "react";
import Authentication from "../../components/Authentication/Authentication";
import "./AuthenticationPage.scss";

function AuthenticationPage() {
  return (
    <div className="authentication-container">
      <h1 className="title-connection">
        <p>Connectez vous à</p>
        <p>votre compte</p>
      </h1>
      <div className="auth">
        <Authentication />
      </div>
    </div>
  );
}

export default AuthenticationPage;
