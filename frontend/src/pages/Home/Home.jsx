import PhoneCard from "../../components/PhoneCard/PhoneCard";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <div className="navbar">navbar</div>
      <div className="lateral-navbar">navbar lat</div>
      <div className="cards">
        <div className="card">
          <PhoneCard />
        </div>
      </div>
    </div>
  );
}
