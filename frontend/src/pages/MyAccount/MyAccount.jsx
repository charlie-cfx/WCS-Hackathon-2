import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../contexts/AuthContext";

import "./MyAccount.scss";

export default function MyAccount() {
  const navigate = useNavigate();
  const { userToken, userInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { id } = userInfo;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
    if (!userToken) {
      navigate("/");
    }
  }, [userToken]);

  return (
    userToken && (
      <div className="home">
        <Navbar />
        {isDataLoaded ? (
          <div className="cards-list">
            {userData.map((user) => (
              <userAccount key={user.user_id} />
            ))}
          </div>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    )
  );
}
