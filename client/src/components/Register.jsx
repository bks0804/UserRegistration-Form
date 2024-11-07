import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: { street: "", city: "", state: "", country: "", postalCode: "" },
    profilePicture: null,
  });

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  // const validateForm = () => {
  //   const { password, confirmPassword, dateOfBirth, phoneNumber } = formData;

  //   // Password strength validation
  //   const passwordRegex =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //     return "Password must be at least 8 characters long and include numbers and special characters.";
  //   }

  //   // Confirm password validation
  //   if (password !== confirmPassword) {
  //     return "Passwords do not match.";
  //   }

  //   // Age validation (at least 18 years old)
  //   const birthDate = new Date(dateOfBirth);
  //   const age = new Date().getFullYear() - birthDate.getFullYear();
  //   if (age < 18) {
  //     return "You must be at least 18 years old to register.";
  //   }

  //   // Phone number validation with country code
  //   const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Example for country code validation
  //   if (!phoneRegex.test(phoneNumber)) {
  //     return "Please enter a valid phone number with the country code.";
  //   }

  //   return "";
  // };

  const validateForm = () => {
    const { password, confirmPassword, dateOfBirth, phoneNumber } = formData;

    // Password strength validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and include numbers and special characters.";
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    // Age validation (at least 18 years old)
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      return "You must be at least 18 years old to register.";
    }

    // Phone number validation with country code
    const phoneRegex = /^\+?[1-9]\d{9,14}$/; // Validates phone numbers with a minimum of 10 digits
    if (!phoneRegex.test(phoneNumber)) {
      return "Please enter a valid phone number with the country code.";
    }

    return null; // or return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError({
        validationError,
        message: "error from validation on handle submit",
      });
      return;
    }

    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach((key) => {s
    //   formDataToSend.append(key, formData[key]);
    // });
    // console.log([...formDataToSend.entries()]);

    try {
      // ** Image upload API
      const imgFormData = new FormData();
      imgFormData.append("imgFile", formData.profilePicture);
      const imgRes = await axios.post(
        "http://localhost:8000/api/users/image/upload",
        imgFormData
      );

      // console.log(imgRes.data.url);
      // ** User create API
      const response = await axios.post(
        "http://localhost:8000/api/users/registeruser",
        {
          ...formData,
          profilePicture: imgRes?.data?.url,
        }
      );

      console.log("Registration Response:", response.data);
      if (response.data) {
        setOtpSent(true); // Show OTP input after email OTP is sent
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/verifyotp",
        {
          email: formData.email,
          otp,
        }
      );
      // console.log(response.data);

      if (response.data) {
        setOtpSent(true);
        navigate("/signin");
      } else {
        setError("Invalid OTP, please try again.");
      }
    } catch (error) {
      setError("OTP verification failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-100 shadow-lg rounded-md mt-5">
      {otpSent ? (
        <>
          <h2 className="text-2xl font-bold text-green-600 ">
            Registration Successful!
          </h2>

          <form onSubmit={handleOtpSubmit} className="mt-6">
            <h3 className="text-lg font-bold mb-2">
              Enter OTP sent to your email
            </h3>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Enter OTP"
              required
            />
            <button
              type="submit"
              className="mt-4 p-2 w-full bg-green-600 text-white rounded"
            >
              Verify OTP
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-br from-red-400 to-indigo-500">
            Registration Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number (e.g. +91)"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={formData.address.state}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.address.postalCode}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              />
              <select
                name="country"
                value={formData.address.country}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                {/* Add more countries as needed */}
              </select>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 border rounded col-span-2"
              />
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button
              type="submit"
              className="mt-6 p-2 w-full bg-blue-600 text-white rounded"
            >
              Register
            </button>

            <div className="mt-4 text-center">
              <p>
                if already have an account?{" "}
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => navigate("/signin")}
                >
                  SignIn
                </span>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
