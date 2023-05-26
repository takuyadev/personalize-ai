"use client";
import React, { useState } from "react";
import SignupForm from "@/components/molecules/Forms/SignUpForm/SignUpForm";
import LoginForm from "@/components/molecules/Forms/LoginForm/LoginForm";
import { AnimatePresence } from "framer-motion";

export default function Onboarding() {
  const [mode, setMode] = useState(true);

  return (
    <AnimatePresence>
      {mode ? (
        <LoginForm onClick={() => setMode(false)} />
      ) : (
        <SignupForm onClick={() => setMode(true)} />
      )}
    </AnimatePresence>
  );
}
