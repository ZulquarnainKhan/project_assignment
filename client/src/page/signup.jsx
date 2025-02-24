import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RegisterPendings, SignupComponent } from "../components";
import instance from "../config/instance";
import { setLoading } from "../redux/loading";
import "./style.scss";
import { LuSunDim } from "react-icons/lu";
import { IoMoonSharp } from "react-icons/io5";

const Signup = () => {
  const { user } = useSelector((state) => state);

  const [pending, setPending] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (
        location?.pathname === "/signup" ||
        location?.pathname === "/signup/"
      ) {
        setPending(false);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      } else {
        const checkPending = async () => {
          let res = null;
          try {
            res = await instance.get("/api/user/checkPending", {
              params: {
                _id: id,
              },
            });
          } catch (err) {
            console.log(err);
            if (err?.response?.status === 404) {
              navigate("/404");
            } else {
              alert(err);
              navigate("/signup");
            }
          } finally {
            if (res?.data?.status !== 208) {
              setPending(true);
              setTimeout(() => {
                dispatch(setLoading(false));
              }, 1000);
            }
          }
        };

        checkPending();
      }
    }
  }, [location]);

  const [theme,setTheme] = useState('light')

  const toggleTheme  = () =>{
    setTheme( (curr)=>(curr==='dark'?'light':'dark') )
  }

  return (
    <div className={`Auth ${theme}`}>
      <div className="inner">
        {pending ? (
          <RegisterPendings _id={id}  />
        ) : (
          <>
            <SignupComponent theme={theme}/>

            <div className="theme" onClick={toggleTheme}>
               
              {theme==='dark'?<>Light<LuSunDim className="symbol"/></>
              :<>Dark<IoMoonSharp className="symbol"/></>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
