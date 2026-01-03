import { toast } from "react-toastify";
import { auth, db, provider } from "../firebase-config.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const createDoc = async (user, name) => {
  // Make sure that the doc with the uid doesn't exists
  // create a doc
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userData = await getDoc(userRef);

  if (!userData.exists()) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : name,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : "",
        createdAt: new Date(),
      });
      toast.success("doc created");
    } catch (error) {
      toast.error(error.message);
    }
  } else {
    toast.error("Doc already exists");
  }
};

export const handleSignupWithGoogle = (e, setIsLoading, navigate) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        createDoc(user, name);
        toast.success("User authenticated!!");
        setIsLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  } catch (error) {
    setIsLoading(false);
    toast.error(error.message);
  }
};

export const handleLogin = (navigate) => {
  navigate("/login");
};

export const handleSignup = (navigate) => {
  navigate("/signup");
};