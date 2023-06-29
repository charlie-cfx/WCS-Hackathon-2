/* eslint-disable camelcase */
import PropTypes from "prop-types";

import "./UserAccount.scss";
// import Badge from "../Badge/Badge";

export default function UserAccount({ userInfo }) {
  const { mail, hashed_password, lastname, firstname, phone } = userInfo;

  return (
    <div className="account-info">
      {mail} {hashed_password} {lastname} {firstname} {phone}
    </div>
  );
}

UserAccount.propTypes = {
  userInfo: PropTypes.shape({
    mail: PropTypes.string.isRequired,
    hashed_password: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
