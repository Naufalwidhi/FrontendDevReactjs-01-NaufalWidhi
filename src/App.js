import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import DetailItem from "./component/DetailItem";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/detailitem/:id" element={<DetailItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
