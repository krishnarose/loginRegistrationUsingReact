import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Nav from "./Pages/Nav";
import Footer from "./Pages/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
       <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
