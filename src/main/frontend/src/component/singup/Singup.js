import { Button } from "react-bootstrap";
import {icon} from 'bootstrap'
import Navbar from "../navbar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { addUser } from "../../reducers/user/user";
import { Link, useNavigate   } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./singup.css"

function Singup(){


    
    const [name, setName] = useState();
    const [PhoneNumber, setUserPhoneNumber] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [data, setData] = useState();
    const errorMsg = document.querySelector(".error-msg");
    const successMsg = document.querySelector(".success-msg");
    const navigate = useNavigate();
    let result = false


   const dispatch = useDispatch();
   const state = useSelector((state) => {
    return {
      user: state.userReducer,
    };
  });

    const userName = (e) =>{
        setName(e.target.value);
    }

    const userPhoneNumber = (e) =>{
        setUserPhoneNumber(e.target.value);
    }

    const userPassword1 = (e) =>{
        setPassword1(e.target.value);
    }

    const userPassword2 = (e) =>{
        setPassword2(e.target.value);
    }

    const verification = (e) =>{

        e.preventDefault();

        if(password1 == password2){
            let data = {
                "user":{
                "name": name,
                "phone": PhoneNumber,
                "password": password1
                },      
                    "role_id":2
            }

        console.log(name);
        console.log(password1);
        console.log(PhoneNumber);
        console.log(data);

        
        axios.post("http://localhost:8081/api/user", data)
          .catch((error) => console.log(error));

          
            successMsg.style.opacity = 1;
            errorMsg.style.opacity = 0;
            navigate("/login")



    }
    else{
        
        errorMsg.style.opacity = 1;
        successMsg.style.opacity = 0;

    }
}



    return(
        <div>
            <Navbar/>
            <div className="success-msg">
               <p> <b>ممتاز!</b>تم انشاء حساب جديد بنجاح </p> 
            </div>    
            <div className="wrapper fadeInDown">
                <div id="formContent">
                <h2 className="active">التسجيل بالموقع</h2>
                <form>
                    <input type="text"  placeholder="اسم المستخدم" onChange={userName}/>
                    <input type="text"  placeholder="رقم الجوال" onChange={userPhoneNumber}/>
                    <input type="password"  placeholder="الرقم السري" onChange={userPassword1}/>
                    <input type="password"  placeholder=" اعد كتابة الرقم السري" onChange={userPassword2}/>
                    <div id="error-msg-holder">
                        <p className="error-msg">الرقم السري غير متطابق</p>
                    </div> 
                    <button type="submit" className="button" onClick={verification}>انشىْ حساب</button>
                </form>
                <div id="formFooter">
                    <Link to="/login">
                        <p className="underlineHover">تسجيل دخول</p>
                    </Link>
                    <br></br>

                </div>
                </div>
            </div>
        </div>
    )
}


export default Singup;