import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import PhoneCard from "../../components/PhoneCard/PhoneCard";
import AuthContext from "../../contexts/AuthContext";

import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [phonesData, setPhonesData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/phones?brand_id=2`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setPhonesData(response.data);
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
            {phonesData.map((phone) => (
              <PhoneCard key={phone.phone_id} phone={phone} />
            ))}
          </div>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    )
  );
}
