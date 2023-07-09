import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaRegAddressBook } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";

const URL = "https://admin-dashboard-ismile.cyclic.app/api/v1/register";

const Register = () => {
  const navigate = useNavigate();
  const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/i;
  const [formValue, setFormValue] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handelSubmit = async () => {
    if (formValue["name"] === "") {
      return toast.error("Name is Required!");
    }
    if (formValue["phone"] === "" || !phoneRegex.test(formValue["phone"])) {
      return toast.error("BD number is Required!");
    }
    if (formValue["password"] === "" || formValue["password"].length < 6) {
      return toast.error("password is 6 characters!");
    }

    try {
      const { data } = await axios.post(URL, formValue);
      setFormValue({ name: "", phone: "", password: "" });

      if (data.status === 201 || data["status"]) {
        toast.success("Registrationc success");
        navigate("/login");
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
          <FaRegAddressBook className="inline" /> Registration
        </h1>
        <hr className="mt-3" />
        <div className="mt-3">
          <label htmlFor="username" className="block text-base mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formValue["name"]}
            onChange={(e) =>
              setFormValue({ ...formValue, name: e.target.value })
            }
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            placeholder="full name..."
          />
        </div>
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
            <Link to="/login" className="text-cyan-400 font-semibold">
              Login
            </Link>
          </div>
          <div>
            <Link to="/register" className="text-indigo-800 font-semibold">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
            onClick={handelSubmit}
          >
            <BiLogInCircle className="inline" /> Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
