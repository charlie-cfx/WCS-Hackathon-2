import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import PhoneCard from "../../components/PhoneCard/PhoneCard";
import AuthContext from "../../contexts/AuthContext";

import "./Home.scss";

import calculatePhonePrice from "../../components/GeneratePhonePrice/GeneratePhonePrice";

export default function Home() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [phonesData, setPhonesData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [phonePrice, setPhonePrice] = useState();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/phones`, {
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

  useEffect(() => {
    // Appeler la fonction calculatePhonePrice et mettre à jour la valeur de phonePrice
    const price = calculatePhonePrice();
    setPhonePrice(price);
  }, []);
  console.info(phonePrice);
  return (
    userToken && (
      <div className="home">
        <Navbar />
        {isDataLoaded ? (
          <div className="cards-list">
            {phonesData.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    )
  );
}
