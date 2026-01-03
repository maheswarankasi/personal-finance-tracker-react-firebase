import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { createDoc, handleSignup, handleSignupWithGoogle } from "../../utils";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase-config";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User logged in!!");
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
    } else {
      toast.error("All fields are mandatory!!");
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="login-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@email.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Secret@123"}
            />
            <Button
              disabled={isLoading}
              text={isLoading ? "Loading..." : "Login using email and password"}
              onClick={handleLoginWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              text={isLoading ? "Loading..." : "Login using Google"}
              blue={true}
              onClick={(e) => handleSignupWithGoogle(e, setIsLoading, navigate)}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={()=>handleSignup(navigate)}
            >
              or Don't have an Account? Click here
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
