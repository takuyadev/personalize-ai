import styles from "./LoginForm.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authGoogle, login } from "@/services/auth";
import { PrimaryButton } from "@/components/atoms/Button/PrimaryButton";
import { Input } from "@/components/atoms/Input/Input";
import { Form } from "@/components/atoms/Form/Form";
import { Message } from "@/components/atoms/Message/Message";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { GoogleApiForm } from "../GoogleApiForm/GoogleApiForm";
import { Divider } from "@/components/atoms/Divider/Divider";
import { motion } from "framer-motion";
import { fadeDown } from "@/data/animations/fadeDown";

function LoginForm({ onClick }) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();

  // @desc Handles google signup
  const handleGoogle = async (token) => {
    const data = await authGoogle(token);
    if (data) {
      setIsLoggedIn(data);
      push("/dashboard");
    }
  };

  // Handle Login form logic
  const submitForm = async (formData) => {
    const res = await login(formData);
    const data = await res.json();

    // If response returned ok, redirect
    if (res.ok) {
      setIsLoggedIn(data);
      return push("/dashboard");
    }

    // Set error message from server if returned
    setError(data.error);
  };

  return (
    <motion.div
      variants={fadeDown}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.signup_container}
    >
      <Form onSubmit={handleSubmit(submitForm)}>
        <div className={styles.form_wrapper}>
          <h2>Log In</h2>
          {error && <Message danger message={error} />}
          <Input
            type="email"
            placeholder="Email"
            danger={errors.email?.type}
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            placeholder="Password"
            danger={errors.password?.type}
            {...register("password", { required: true })}
          />
          <PrimaryButton type="submit">Log In</PrimaryButton>
          <Divider />
          <GoogleApiForm
            onSubmit={handleGoogle}
            scope="https://www.googleapis.com/auth/userinfo.profile"
            label="Login with Google"
          />
          <p className={styles.switch_text} onClick={onClick}>
            Don't have an account? Sign Up
          </p>
        </div>
      </Form>
    </motion.div>
  );
}

export default LoginForm;
