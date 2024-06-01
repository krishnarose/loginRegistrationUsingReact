import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Home from "./Pages/Home";
import Nav from "./Pages/Nav";
import Footer from "./Pages/Footer";
import RegisterPage from "./Pages/RegisterPage";
import Page404 from "./Pages/Page404";
import Login from "./Pages/Login";
import Display from "./Pages/Display";
import Dependend from "./Pages/Dependend";

function App() {
  return (
    <>
     <Toaster />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/*" element={<Page404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/display" element={<Display />} />
          <Route path="/dependend" element={< Dependend />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
