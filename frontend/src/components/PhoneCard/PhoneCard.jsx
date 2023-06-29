/* eslint-disable camelcase */
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./PhoneCard.scss";
import Badge from "../Badge/Badge";

const getBasePrice = (price, state, accessory) => {
  const statePrice = Math.round(price - price * state * 0.01);
  let estimatedPrice = 0;
  if (statePrice) estimatedPrice = statePrice - accessory;
  if (estimatedPrice < 0) estimatedPrice = 0;
  return estimatedPrice;
};

const definePriceCategory = (price) => {
  const categoryPriceObject = { price, category: "" };
  switch (true) {
    case price < 90:
      categoryPriceObject.category = "HC";
      break;
    case price < 165:
      categoryPriceObject.category = "C";
      break;
    case price < 255:
      categoryPriceObject.category = "B";
      break;
    default:
      categoryPriceObject.category = "Premium";
      break;
  }
  return categoryPriceObject;
};

export default function PhoneCard({ phone }) {
  const {
    brand_name,
    model_name,
    state,
    color_name_en,
    color_name_fr,
    screen_size_inch,
    ram,
    memory,
    accessory_name,
    base_price,
    state_weighting,
    accessory_weighting,
  } = phone;
  const phonePriceCalculated = getBasePrice(
    base_price,
    state_weighting,
    accessory_weighting
  );
  const priceCategoryCalculated = definePriceCategory(phonePriceCalculated);
  const phonePrice = priceCategoryCalculated.price;
  const priceCategory = priceCategoryCalculated.category;
  const modelImage = model_name.split(" ").join("+").toLowerCase();
  const brandImage = brand_name.toLowerCase();

  const [phoneImageURL, setPhoneImageURL] = useState("");
  let stateColor = "";
  const screeSizeCm = (screen_size_inch * 2.54).toFixed(1);

  switch (state.toLowerCase()) {
    case "deee":
      stateColor = "red";
      break;
    case "réparable":
      stateColor = "orange";
      break;
    case "bloqué":
      stateColor = "yellow";
      break;
    case "reconditionnable":
      stateColor = "green";
      break;
    case "reconditionné":
      stateColor = "blue";
      break;
    default:
      stateColor = "red";
      break;
  }

  useEffect(() => {
    axios
      .get(
        `https://daisycon.io/images/mobile-device/?width=500&height=500&color=ffffff&mobile_device_brand=${brandImage}&mobile_device_model=${modelImage}+${memory}gb&mobile_device_color=${color_name_en}`,
        { responseType: "blob" }
      )
      .then((response) => {
        setPhoneImageURL(response.data);
      });
  }, []);

  return (
    <div className="phone-card">
      <div className="card-header">
        {phoneImageURL ? (
          <img src={URL.createObjectURL(phoneImageURL)} alt={brand_name} />
        ) : (
          <div className="no-image">
            <i className="fi fi-tr-mobile-notch" />
          </div>
        )}
        <div className={`cat-price cat-price-${priceCategory}`}>
          <p>
            {priceCategory} • {phonePrice} €
          </p>
        </div>
      </div>
      <div className="card-info">
        <div className="card-top">
          <div className="card-info-header">
            <h2>
              {brand_name} {model_name}
            </h2>
            {}
            <Badge color={stateColor}>{state}</Badge>
          </div>
          <ul className="caracteristics">
            <li>
              <span className="bold">Mémoire interne :</span> {memory} Go
            </li>
            <li>
              <span className="bold">Mémoire RAM :</span> {ram} Go
            </li>
            <li>
              <span className="bold">Écran :</span>{" "}
              {`${screen_size_inch}" soit 
              ${screeSizeCm} cm`}
            </li>
            <li>
              <span className="bold">Couleur :</span>
              <span className="capitalize"> {color_name_fr}</span>
            </li>
            <li>
              <span className="bold">Accessoires :</span>
              <span className="capitalize"> {accessory_name}</span>
            </li>
          </ul>
        </div>
        <button className="more-info" type="button">
          En savoir plus
        </button>
      </div>
    </div>
  );
}

PhoneCard.propTypes = {
  phone: PropTypes.shape({
    brand_name: PropTypes.string.isRequired,
    model_name: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    color_name_en: PropTypes.string.isRequired,
    color_name_fr: PropTypes.string.isRequired,
    screen_size_inch: PropTypes.string.isRequired,
    OS_name: PropTypes.string.isRequired,
    ram: PropTypes.number.isRequired,
    memory: PropTypes.number.isRequired,
    network: PropTypes.string.isRequired,
    accessory_name: PropTypes.string.isRequired,
    base_price: PropTypes.number.isRequired,
    state_weighting: PropTypes.number.isRequired,
    accessory_weighting: PropTypes.number.isRequired,
  }).isRequired,
};
