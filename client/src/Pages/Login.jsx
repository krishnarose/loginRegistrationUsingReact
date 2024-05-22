import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false); // New state variable
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://192.168.0.101:7000/verify-email", { email });
      console.log("Email verification successful:", resp.data);
      setIsEmailVerified(true);
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
      console.log("Error:", error.response.data.error);
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://192.168.0.101:7000/login", { email, pass });
      console.log("Login successful:", resp.data);
      // Setting local storage
      localStorage.setItem("resp", JSON.stringify(resp.data));
      setEmail("");
      setPass("");
      navigate("/", { state: { successMessage: resp.data.message } });

      setTimeout(()=>{
        window.location.reload(); 
      },3000)
     // Force reload to update Nav component
    } catch (error) {
      toast.error(error.response.data.error);
      console.log("Error:", error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold uppercase">Login Form</h1>
      <form onSubmit={isEmailVerified ? sendData : verifyEmail} className="flex items-start gap-5 flex-col bg-slate-100 p-10 mb-10 mt-10 rounded-xl">
        <input
          type="email"
          className="w-[300px] h-[40px] outline-none rounded-md pl-2"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        {isEmailVerified && (
          <input
            type="password"
            className="w-[300px] h-[40px] outline-none rounded-md pl-2"
            placeholder="Enter Your Password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required
          />
        )}
        <button
          type="submit"
          className="uppercase hover:text-white bg-green-500 w-[100%] py-2 rounded-xl outline-none text-xl font-bold text-slate-150 hover:bg-green-600"
        >
          {isEmailVerified ? 'Login' : 'Next-->'}
        </button>
      </form>
      <p className="text-xl font-semibold">
        If you don't have an account, please register yourself{" "}
        <Link to="/register">
          <span className="text-xl font-semibold text-blue-500">Here</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
