import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grant } from "../assets";
import { LoginComponent } from "../components";
import { setLoading } from "../redux/loading";
import "./style.scss";
import { LuSunDim } from "react-icons/lu";
import { IoMoonSharp } from "react-icons/io5";



const Login = () => {
  const location = useLocation();

  const [auth, setAuth] = useState(false);

  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (location?.pathname === "/login/auth") {
        setAuth(true);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      } else {
        setAuth(false);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      }
    }
  }, [location]);

  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'))
  }


  return (
    <div className={`Auth ${theme}`}>
      <div className="inner ">
        {auth ? (
          <LoginComponent />
        ) : (
          <div className="suggection">
            <div>
              <Grant />
            </div>

            <div>
              <p>Welcome to GE CoPilot™</p>
              <p>Log in or Sign up with your account to continue</p>
            </div>

            <div className="btns">
              <button
                onClick={() => {
                  navigate("/login/auth");
                }}
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </button>
            </div>
          </div>

        )}
        <div className="theme" onClick={toggleTheme}>

          {theme === 'dark' ? <>Light<LuSunDim className="symbol" /></>
            : <>Dark<IoMoonSharp className="symbol" /></>}
        </div>



        <div className="bottum">

        </div>
      </div>
    </div>
  );
};

export default Login;
