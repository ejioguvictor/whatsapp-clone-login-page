import React, { useState, useRef, useEffect } from "react";
import { BsWhatsapp, BsTwitter, BsGithub } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { BsCloudSunFill, BsFillCloudMoonFill } from "react-icons/bs";
import styles from "./LoginPage.module.scss";
import { UserData } from "./LoginPage.interface";

const url: string = "http://localhost:3050/api/v1/user/login";
const LoginPage = (): JSX.Element => {
  const [isLight, setIsLight] = useState(true);
  const [form, setForm] = useState<UserData>({ email: "", password: "" });
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  // const [rememberMe, setRememberMe] = useState(true);

  const focusPoint = useRef<HTMLInputElement>(null);
  const focusPoint2 = useRef<HTMLInputElement>(null);
  const setLightMode = () => {
    setIsLight(!isLight);
    // return document.body.classList.toggle(styles.darkMode);
    return document.body.classList.toggle(`${styles.darkMode}`);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.email) {
      focusPoint.current!.style.border = "1.5px solid red";
      setTimeout(
        () => (focusPoint.current!.style.border = "1px solid #bdbdbd"),
        3000
      );
    }
    if (!form.password) {
      focusPoint2.current!.style.border = "1.5px solid red";
      setTimeout(
        () => (focusPoint2.current!.style.border = "1px solid #bdbdbd"),
        3000
      );
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.status === 201) {
        const data = await response.json();
        alert(data.message);
      }
      if (response.status === 400) {
        const data = await response.text();
        setErrorMsg(data);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
      if (response.status === 403) {
        const data = await response.json();
        setErrorMsg(data.message);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
      console.log(response);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = e.currentTarget.name;
    let value: string = e.currentTarget.value;
    const newData = { ...form, [name]: value };
    setForm(newData);
  };

  useEffect(() => {
    if (focusPoint.current) {
      focusPoint.current.focus();
      return;
    }
  }, [focusPoint]);

  return (
    <div className={styles["box-container"]}>
      {!isLight && (
        <BsCloudSunFill
          className={`${styles.sun} ${styles.fillsun}`}
          onClick={setLightMode}
        />
      )}
      {isLight && (
        <BsFillCloudMoonFill
          className={`${styles.sun} ${styles.fillmoon}`}
          onClick={setLightMode}
        />
      )}
      <div className={styles["logo-head"]}>
        <BsWhatsapp />
        <h4>Whatsapp</h4>
      </div>
      <h2>Login</h2>
      {showError && <p className={styles["error-class"]}>{errorMsg}</p>}
      <div className={styles.form}>
        <div className={styles["format-box"]}>
          <MdEmail className={styles["email-icon"]} />
          <input
            type="email"
            value={form.email}
            ref={focusPoint}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles["format-box"]}>
          <IoIosLock className={styles["lock-pass"]} />
          <input
            type="password"
            value={form.password}
            ref={focusPoint2}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button onClick={handleSubmit}> Login </button>
      </div>

      <p>or continue with these social profile</p>
      <div className={styles["social-logins"]}>
        <div className={styles["social-circle"]}>
          <div>
            <FaGoogle />
          </div>
        </div>

        <div className={styles["social-circle"]}>
          <div>
            <GrFacebook />
          </div>
        </div>

        <div className={styles["social-circle"]}>
          <div>
            <BsTwitter />
          </div>
        </div>

        <div className={styles["social-circle"]}>
          <div>
            <BsGithub />
          </div>
        </div>
      </div>
      <p>
        Dont't have an account yet? <a href="/SignUp">Register </a>
      </p>
      <p className={styles["forogt-password"]}>
        <a href="/forgotPassword">Forgot Password ?</a>
      </p>
    </div>
  );
};

export default LoginPage;
