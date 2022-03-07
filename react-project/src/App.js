import "bootstrap/dist/css/bootstrap.min.css";
import Back from "./BackEnd/Back.js";
import Front from "./FrontEnd/Front.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Front />} exact />
            <Route path="/home" element={<Front />} />
            <Route path="admin/*" element={<Back />} />
          </Routes>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
