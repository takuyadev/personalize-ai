"use client";
import firebase from "@/services/firebase";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { FaGoogle } from "react-icons/fa";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// @desc Allows user to be able to view and import their Google Files
export const GoogleApiForm = ({
  label = "Login to Google",
  scope = "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets",
  onSubmit = console.log,
}) => {
  
  // Handle login usign Firebase Google
  const login = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope(scope);

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        onSubmit({ access_token: token });
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <PrimaryButton type="button" onClick={login}>
      <FaGoogle />
      {label && <span>{label}</span>}
    </PrimaryButton>
  );
};
