import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [userType, setUserType] = useState(""); // State for user role
  const navigate = useNavigate();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("userRole", userType); // Store role in localStorage
    if (userType === "Farmer") navigate("/farmer-dashboard");
    else if (userType === "Customer") navigate("/customer-dashboard");
    else if (userType === "Retailer") navigate("/retailer-dashboard");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("userRole", userType); // Store role in localStorage
    if (userType === "Farmer") navigate("/farmer-dashboard");
    else if (userType === "Customer") navigate("/customer-dashboard");
    else if (userType === "Retailer") navigate("/retailer-dashboard");
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* Login Tab */}
            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="Email address *" required />
                  <input type="password" placeholder="Password *" required />
                  <div className="loginSignUpDropdown">
                    <label htmlFor="userType">User Type *</label>
                    <select
                      id="userType"
                      name="userType"
                      required
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select User Type
                      </option>
                      <option value="Farmer">Farmer</option>
                      <option value="Customer">Customer</option>
                      <option value="Retailer">Retailer</option>
                    </select>
                  </div>
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button type="submit">Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Register Tab */}
            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form onSubmit={handleRegister}>
                  <input type="text" placeholder="Username *" required />
                  <input type="email" placeholder="Email address *" required />
                  <input type="password" placeholder="Password *" required />
                  <div className="loginSignUpDropdown">
                    <label htmlFor="userType">User Type *</label>
                    <select
                      id="userType"
                      name="userType"
                      required
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select User Type
                      </option>
                      <option value="Farmer">Farmer</option>
                      <option value="Customer">Customer</option>
                      <option value="Retailer">Retailer</option>
                    </select>
                  </div>
                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>
                  <button type="submit">Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
