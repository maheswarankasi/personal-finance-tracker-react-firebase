import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { createDoc, handleLogin, handleSignupWithGoogle } from "../../utils";
import { auth } from "../../firebase-config";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignupWithEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Authenticate the user, or create a new account using email and password
    // checking the fields are not empty
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      // checking the password and confirm password is same
      if (password === confirmPassword) {
        // creating a new user with email and password in firebase authenticate
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const users = userCredential.user;
            toast.success("user created");
            setIsLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(users, name);
            navigate("/dashboard");
            // create a doc with user id as the following id
          })
          .catch((error) => {
            // checking the error
            setIsLoading(false);
            toast.error(error.message);
          });
      } else {
        setIsLoading(false);
        toast.error("Password and Confirm Password should match!!");
      }
    } else {
      setIsLoading(false);
      toast.error("All fields are mandatory!!!");
    }
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        <div className="signup-wrapper">
          <h2 className="title">
            Sign up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input
              type={"text"}
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
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
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Secret@123"}
            />
            <Button
              disabled={isLoading}
              text={
                isLoading ? "Loading..." : "Signup using email and password"
              }
              onClick={handleSignupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              text={isLoading ? "Loading..." : "Signup using Google"}
              blue={true}
              onClick={(e) => handleSignupWithGoogle(e, setIsLoading, navigate)}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => handleLogin(navigate)}
            >
              or Already have an Account? Click here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
