import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import PhoneCard from "../../components/PhoneCard/PhoneCard";
import SideBar from "../../components/SideBar/SideBar";
import AuthContext from "../../contexts/AuthContext";

import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [phonesData, setPhonesData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [filters, setFilters] = useState({
    model: [],
    brand: [],
    state: [],
  });

  useEffect(() => {
    const brandQuery = filters.brand.join(",");
    const modelQuery = filters.model.join(",");
    const stateQuery = filters.state.join(",");

    console.info(brandQuery, modelQuery, stateQuery);

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
  }, [userToken, filters]);

  return (
    userToken && (
      <div className="home">
        {" "}
        <Navbar />
        <SideBar filters={filters} setFilters={setFilters} />
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
