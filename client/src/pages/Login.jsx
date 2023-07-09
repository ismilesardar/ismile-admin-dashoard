import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { useStateContext } from "../contexts/ContextProvider";

const URL = "https://admin-dashboard-ismile.cyclic.app/api/v1/login";

const Login = () => {
  const navigate = useNavigate();
  const { setIsToken } = useStateContext();
  const [formValue, setFormValue] = useState({
    phone: "",
    password: "",
  });

  const handelSubmit = async () => {
    if (formValue["phone"] === "") {
      return toast.error("Phone number is invalide!");
    }
    if (formValue["password"] === "") {
      return toast.error("password is required!");
    }

    try {
      const apiData = {
        phone: formValue.phone,
        password: formValue.password,
      };
      const { data } = await axios.post(URL, apiData);
      setFormValue({ phone: "", password: "" });

      if (data.token) {
        toast.success("Login success!");
        localStorage.setItem("token", JSON.stringify(data["token"]));
        setIsToken(true);
        navigate("/ecommerce");
      } else {
        return toast.error("something is wrong!");
      }
    } catch (error) {
      return toast.error("something is wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">
          <FaUserCheck className="inline" /> <span>Login</span>
        </h1>
        <hr className="mt-3" />
        <div className="mt-3">
          <label htmlFor="phone" className="block text-base mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={formValue["phone"]}
            onChange={(e) =>
              setFormValue({ ...formValue, phone: e.target.value })
            }
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="+8801697869548"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="block text-base mb-2">
            Password
          </label>
          <input
            type="password"
            value={formValue["password"]}
            onChange={(e) =>
              setFormValue({ ...formValue, password: e.target.value })
            }
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="Enter Password..."
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div>
            <Link to="/register" className="text-cyan-400 font-semibold">
              Registration
            </Link>
          </div>
          <div>
            <Link to="/register" className="text-red-600 font-semibold">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            onClick={handelSubmit}
            className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
          >
            <BiLogInCircle className="inline" /> Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
