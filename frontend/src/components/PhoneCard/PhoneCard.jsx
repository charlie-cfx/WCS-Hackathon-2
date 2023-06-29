import "./PhoneCard.scss";
import Badge from "../Badge/Badge";

function PhoneCard() {
  const phonePrice = "250";
  const priceCategory = "HC";

  return (
    <div className="phone-card">
      <div className="card-header">
        <img
          src="https://daisycon.io/images/mobile-device/?width=500&height=500&color=ffffff&mobile_device_brand=xiaomi&mobile_device_model=12t+128gb"
          alt="smartphone"
        />
        <div className={`cat-price cat-price-${priceCategory}`}>
          <p>
            {priceCategory} • {phonePrice} €
          </p>
        </div>
      </div>
      <div className="card-info">
        <div className="card-info-header">
          <h2>Smartphone</h2>
          <Badge color="grey">Très bon état</Badge>
        </div>
        <div className="caracteristics">
          <p>
            <span>Marque :</span> marque
          </p>
          <p>
            <span>Modèle :</span> Modèle
          </p>
          <p>
            <span>OS :</span> OS
          </p>
          <p>
            <span>Accessoires :</span> accessoires
          </p>
        </div>
        <button className="more-info" type="button">
          En savoir plus
        </button>
      </div>
    </div>
  );
}

export default PhoneCard;
