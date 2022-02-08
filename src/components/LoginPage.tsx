import React, { useState, useRef, useEffect } from "react";
import { BsWhatsapp, BsTwitter, BsGithub } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { BsCloudSunFill, BsFillCloudMoonFill } from "react-icons/bs";
import "./LoginPage.css";

const LoginPage = (): JSX.Element => {
  const [isLight, setIsLight] = useState(true);
  const focusPoint = useRef<HTMLInputElement>(null);
  const setLightMode = () => {
    setIsLight(!isLight);
    return document.body.classList.toggle("dark-mode");
  };

  useEffect(() => {
    if (focusPoint.current) {
      focusPoint.current.focus();
      return;
    }
  }, [focusPoint]);

  return (
    <div className="box-container">
      {!isLight && (
        <BsCloudSunFill className="sun fillsun" onClick={setLightMode} />
      )}
      {isLight && (
        <BsFillCloudMoonFill className="sun fillmoon" onClick={setLightMode} />
      )}
      <div className="logo-head">
        <BsWhatsapp />
        <h4>Whatsapp</h4>
      </div>
      <h2>Login</h2>
      <div className="form">
        <div className="format-box">
          <MdEmail className="email-icon" />
          <input type="text" ref={focusPoint} placeholder="Email" />
        </div>
        <div className="format-box">
          <IoIosLock className="lock-pass" />
          <input type="text" placeholder="Password" />
        </div>
        <button>Login</button>
      </div>
      <p>or continue with these social profile</p>
      <div className="social-logins">
        <div className="social-circle">
          <div>
            <FaGoogle />
          </div>
        </div>

        <div className="social-circle">
          <div>
            <GrFacebook />
          </div>
        </div>

        <div className="social-circle">
          <div>
            <BsTwitter />
          </div>
        </div>

        <div className="social-circle">
          <div>
            <BsGithub />
          </div>
        </div>
      </div>
      <p>
        Dont't have an account yet? <a href="/SignUp">Register </a>
      </p>
      <p className="forogt-password">
        <a href="/forgotPassword">Forgot Password ?</a>
      </p>
    </div>
  );
};

export default LoginPage;
