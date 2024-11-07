import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import bgImage from "../../public/image/bg.jpg";
const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      dispatch({ type: "USER", payload: true });
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User not registered");
        navigate("/register");
      } else if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid credentials");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[url('https://images.pexels.com/photos/1643403/pexels-photo-1643403.jpeg')] bg-cover bg-center ">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-green-700">
        <h2 className="text-2xl font-bold text-center mb-6">Login Form</h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div class="flex items-center justify-between pb-6">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-500 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              class="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
