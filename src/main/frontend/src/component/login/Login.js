import { Button } from "react-bootstrap";
import {icon} from 'bootstrap'
import Navbar from "../navbar/Navbar";
import Singin from "../singup/Singup"
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate   } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './login.css';
import jwt_decode from "jwt-decode";
import {addUser, addToken}  from "../../reducers/user/action";

function Login(){

    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    let result = false


   const dispatch = useDispatch();
   const state = useSelector((state) => {
    return {
      user:  state.userReducer //state.user.user,
    };
  });


    const userName = (e) =>{
        setName(e.target.value);
    }

    const userPassword = (e) =>{
        setPassword(e.target.value);
    }


    const verification = (e) =>{
      e.preventDefault();
      const data ={
        name,
        password,
      };
    


      axios
        .post("http://localhost:8081/login", data)
        .then((response) => {
  
          console.log(response.data);
          const token = response.data.access_token
          const decoded = jwt_decode(token);

          const user_action = addUser({
            id: decoded.id,
            name: decoded.sub
          });

          const token_action = addToken(token);

          dispatch(user_action);
          dispatch(token_action);

          navigate("/");

        })
        .catch((error) => {console.log(error)
      });
  };


    return(  

        <div>
            <Navbar/>
            <div className="login-wrapper fadeInDown">
                <div id="login-formContent">
                <h2 className="login-active">تسجيل الدخول</h2>
                <form>
                    <input type="text"  placeholder="اسم المستخدم او رقم الجوال" onChange={userName}/>
                    <input id="input-pass" type="password" placeholder="الرقم السري" onChange={userPassword}/>
                    <div id="error-msg-holder">
                        <p className="error-msg">الرقم السري غير متطابق</p>
                    </div> 
                    <button type="submit" className="button" onClick={verification}>دخول</button>
                </form>
                <div id="login-formFooter">
                    <Link to="/singup">
                        <p className="login-underlineHover">انشاء حساب جديد</p>
                    </Link>
                    <br></br>
                </div>
                </div>
            </div>
        </div>
      
    );
}

export default Login;