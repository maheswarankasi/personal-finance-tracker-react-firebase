import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Header.css";
import { auth } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import usersvg from "../../assets/user.svg";
import Button from "../Button/Button";
import { handleLogin, handleSignup } from "../../utils";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const handleLogout = () => {
    try {
      signOut(auth).then(() => {
        toast.success("User logged out successfully");
        navigate("/");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        Financly.
      </Link>
      {user ? (
        <div className="logout">
          <img
            src={user.photoURL ? user.photoURL : usersvg}
            width={user.photoURL ? "32" : "24"}
            height={user.photoURL ? "32" : "24"}
            style={{ borderRadius: "50%" }}
            alt="user profile"
            className="profile-icon"
          />
          <p className="link" onClick={handleLogout}>
            Logout
          </p>
        </div>
      ) : (
        <div className="login-signup-btn">
          <button onClick={() => handleLogin(navigate)} className="login-btn">
            Login
          </button>
          <button onClick={() => handleSignup(navigate)} className="signup-btn">
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
