import { Link, useNavigate   } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {removeUser} from "../../reducers/user/action"
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'
import axios from 'axios';


function Home(){
    
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const searchKeyword = (e) => {
        setKeyword(e.target.value);
    }


    useEffect(async () => {
      const result = await axios.get('http://localhost:8081/api/ads');
  
      setData(result.data);
    },[]);

    const search = (e) => {
        e.preventDefault();

        axios
        .get(`http://localhost:8081/api/ads/search/${keyword}`)
        .then((response)=>{setData(response.data)})
        .catch((error)=>{console.log(error);})
    }

    const all = (e) => {
        e.preventDefault();

        axios
        .get("http://localhost:8081/api/ads")
        .then((response)=>{setData(response.data)})
        .catch((error)=>{console.log(error);})


    }

    const car = (e) =>{
        e.preventDefault();

        axios
        .get("http://localhost:8081/api/category/byName/car")
        .then((response)=>{setData(response.data[0].ads)})
        .catch((error)=>{console.log(error);})
              
        console.log(data);
    }

    const realEstate = (e) =>{
        e.preventDefault();

        axios
        .get("http://localhost:8081/api/category/byName/real estate")
        .then((response)=>{setData(response.data[0].ads)})
        .catch((error)=>{console.log(error);})

    }

    const devices = (e) =>{
        e.preventDefault();

        axios
        .get("http://localhost:8081/api/category/byName/devices")
        .then((response)=>{setData(response.data[0].ads)})
        .catch((error)=>{console.log(error);})
              
  
    }

    const logout = (e) => {
        const action = removeUser();
        dispatch(action);
        navigate("/");
      };

    return(

    <div>
        
     {console.log(data)}
           <div className="home-header">
                <div className="home">
                <Link to="/">
                    <i class="bi bi-house-door"></i>
                    <p className='leble-icon-home'>الرئيسية</p>
                </Link>
                </div>
                {id ? (
                <>
              
                <div className="edit">
                <Link to="/editUserInfo">
                    <i class="bi bi-person-circle"></i>
                    <p className='leble-icon-edit'>الحساب</p>
                </Link>
                </div>
                <div className="add-ads">
                <Link to="/addAds">
                    <i class="bi bi-plus-lg"></i>
                    <p className='leble-icon-addAds'>اضافة اعلان</p>
                </Link>
                </div>
                <div className="editAds">
                <Link to="/editAds">
                    <i class="bi bi-pencil-square"></i>
                    <p className='leble-icon-editAds'>اعلاناتي</p>
                </Link>
                </div>   
                  <button id="logout" className='btn btn-light' onClick={logout}> Logout </button>     
                </>
                ) : (         
                <div className="home-login">
                <Link to="/login">
                    <i class="bi bi-box-arrow-in-left"></i>
                    <p className='leble-icon-login'>تسجيل دخول</p>
                </Link>
                </div>
             )}   
            </div>
            <div className="search">
                <form className="example">
                <input type="text" placeholder="..ابحث عن سلعة " onChange={searchKeyword} />
                <button><i class="bi bi-search" onClick={search}></i></button>                
                </form>
            </div>
            <div className="category-nav">
                <ul>
                    <button className="btn btn-secondary home-button"><i onClick={all}>الكل</i></button>
                    <button className="btn btn-secondary home-button"><i class="bi bi-truck-flatbed" onClick={car}> مركبات</i></button>
                    <button className="btn btn-secondary home-button"><i class="bi bi-building" onClick={realEstate}> عقار</i></button>
                    <button className="btn btn-secondary home-button"><i class="bi bi-display" onClick={devices}> اجهزة</i></button>
                </ul>
            </div>

        <div class="all-ads">
        { data.map(ads => (
        <Link to={{
            pathname: `/ads/${ads.id}`,
       }} >
            {console.log(ads.id)}
        <div className="ads" >
        <img src={ads.image} id="ads-home" className="card-img-top" alt={ads.title} />
        <div className="card-body">
          <h5 className="card-title ">{ads.title}</h5>
          <p className="card-text">{ads.description}</p>
          <p className="card-text"><small className="text-muted">{ads.location}</small></p>
        </div>    
        </div>
      </Link>
        ))}
        </div>
    </div>

    );

}


export default Home;