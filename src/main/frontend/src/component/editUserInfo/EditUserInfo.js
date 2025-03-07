import { Button } from "react-bootstrap";
import {icon} from 'bootstrap'
import Navbar from "../navbar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { addUser } from "../../reducers/user/user";
import { Link, useNavigate   } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {removeUser} from "../../reducers/user/action"
import axios from "axios";
import "./editUserInfo.css"

function EditUserInfo(){

     
    const [name, setName] = useState();
    const [PhoneNumber, setUserPhoneNumber] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [data, setData] = useState();
    const navigate = useNavigate();
    let result = false
   const dispatch = useDispatch();
   const successMsg = document.querySelector(".success-msg-edit");

   const state = useSelector((state) => {
    return {
      user: state.userReducer,
      token: state.userReducer.token
    };
  });

   const id = state.user.user.id
   const userToken = state.token
   const config = {
    headers: {Authorization: `Bearer ${userToken}`}
   };

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

    const deleteUser = (e) =>{
        e.preventDefault();

        axios.delete(`http://localhost:8081/api/user/${id}`, config)
        .catch((error) => console.log(error));

        const action = removeUser();
        dispatch(action);
        navigate("/");
    }

    const verificationUserName = (e) =>{

        e.preventDefault();

      
        const data ={
            name: name
        }
        
        axios.put(`http://localhost:8081/api/user/edit/name/${id}`, data, config)
          .catch((error) => console.log(error));


          successMsg.style.opacity = 1;

    }



const verificationUserPhoneNumber = (e) =>{

    e.preventDefault();

  
    const data ={
      
        phone: PhoneNumber      
    }

    
    axios.put(`http://localhost:8081/api/user/edit/phone/${id}`, data, config)
      .catch((error) => console.log(error));

      successMsg.style.opacity = 1;

}    




const verificationUserPassword = (e) =>{

    e.preventDefault();

    if(password1 == password2){
    let data ={

        password: password1
    }

    
    axios.put(`http://localhost:8081/api/user/edit/password/${id}`, data, config)
      .catch((error) => console.log(error));

    
      successMsg.style.opacity = 1;
     

}
    else{
    
    }
}


    return(

        <div>
            <Navbar/>
            <div className="wrapper">
                <div>
                 <button type="submit" className=" btn btn-danger" onClick={deleteUser}>حذف الحساب</button>
                </div>
                <div className="success-msg-edit">
               <p> <b>ممتاز!</b>تم تحديث المعلومات بنجاح</p> 
            </div> 
                <div id="formContent">
                <h2 className="active">اعادة تعيين المعلومات الشخصة</h2>
                <form>                  
                    <input type="text"  placeholder="اسم المستخدم" onChange={userName}/>           
                    <button type="submit" className="button" onClick={verificationUserName}>اعادة تعيين</button>        
                </form>
                <form>                            
                    <input type="text"  placeholder="رقم الجوال" onChange={userPhoneNumber}/>      
                    <button type="submit" className="button" onClick={verificationUserPhoneNumber}>اعادة تعيين</button>               
                   
                </form>
                <form>               
                    <input type="password"  placeholder="الرقم السري" onChange={userPassword1}/>
                    <button type="submit" className="button" onClick={verificationUserPassword}>اعادة تعيين</button>   
                    <input type="password" id="input-password2" placeholder=" اعد كتابة الرقم السري" onChange={userPassword2}/> 
                                
                </form>               
                </div>
            </div>
        </div>
    );
}

export default EditUserInfo;