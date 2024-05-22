import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import Nav from "./Pages/Nav";
import Footer from "./Pages/Footer";
import RegisterPage from "./Pages/RegisterPage";
import Page404 from "./Pages/Page404";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/*" element={<Page404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
