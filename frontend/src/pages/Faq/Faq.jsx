import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../contexts/AuthContext";
import "./Faq.scss";

export default function Faq() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [question, setQuestion] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/faq`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setQuestion(response.data);
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
    // userToken && (
    <div className="faq">
      <Navbar />
      {isDataLoaded ? (
        <div className="faq-list">
          {question.map((el) => (
            <ul>
              <li key={el.id}>
                <p>{el.question}</p>
                <p>{el.answer}</p>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
  // );
}
