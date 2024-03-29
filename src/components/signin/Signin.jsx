import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import css from "./Signin.module.css";

const Signin = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length >= 4 && value.length <= 16) {
      localStorage.setItem("username", value);
      navigate("/prometheus-x-course-task/books", { replace: true });
    }
  };
  return (
    <>
      <Header />

      <div className={css.prototype}>
        <img
          src="https://w7.pngwing.com/pngs/339/876/png-transparent-login-computer-icons-password-login-black-symbol-subscription-business-model.png"
          width="160"
          height="160"
          alt="avatar"
        />
        <h2>Username</h2>
        <form className={css.form} onSubmit={handleSubmit}>
          <label htmlFor="Username"></label>
          <input
            type="text"
            name="name"
            value={value}
            id="Username"
            placeholder="type Username"
            autoComplete="off"
            onChange={handleChange}
          />
          <button
            className={css.button}
            type="submit"
            disabled={value.length < 4 || value.length > 16}
          >
            Sign In
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signin;
