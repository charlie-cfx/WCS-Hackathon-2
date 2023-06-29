import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../contexts/AuthContext";

import "./Home.scss";

import calculatePhonePrice from "../../components/GeneratePhonePrice/GeneratePhonePrice";

export default function Home() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [phonePrice, setPhonePrice] = useState("");

  useEffect(() => {
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
      </div>
    )
  );
}
