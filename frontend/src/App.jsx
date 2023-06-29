import "./styles/reset.css";
import "./styles/index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Faq from "./pages/Faq/Faq";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
