import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://192.168.0.101:7000/register", {
        email,
        name,
        pass,
      });
      toast.success("Registration successful:", resp.data.message);
      setEmail("");
      setName("");
      setPass("");
      navigate("/Login", { state: { successMessage: resp.data.message } });

    } catch (error) {
        toast.error(error.response.data.error);
        console.log("Error:", error.response.data.error);
        setEmail("");
        setName("");
        setPass("");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="text-3xl font-bold uppercase">Register Form</h1>

        <form
          onSubmit={sendData}
          className="flex items-start gap-5 flex-col bg-slate-100 p-10 mb-10 mt-1o rounded -xl"
        >
          <input
            type="email"
            className="w-[300px] h-[40px] outline-none rounded-md pl-2"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="text"
            className="w-[300px] h-[40px] outline-none rounded-md pl-2"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="password"
            className="w-[300px] h-[40px] outline-none rounded-md pl-2"
            placeholder="Enter Your Password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
          <button
            type="submit"
            className="uppercase hover:text-white bg-green-500 w-[100%] py-2 rounded-xl outline-none text-xl font-bold text-slate-150 hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="text-xl font-semibold">
          If you already have an account, please log in
          <Link to="/login">
            <span className="text-xl font-semibold text-blue-500"> here</span>
          </Link>
          
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
