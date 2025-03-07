import Navbar from "../navbar/Navbar";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate   } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function EditAds(){

    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const state = useSelector((state) => {
     return {
       user: state.userReducer,
       token: state.userReducer.token
     };
   });
 
    let id = state.user.user.id
    let userToken = state.token
    const config = {
     headers: {Authorization: `Bearer ${userToken}`}
    };


    useEffect(async () => {
      let result = await axios(
        `http://localhost:8081/api/user/${id}`, config,
      );
  
      setData(result.data.ads);
    },[]);

    const deleteAds = (e, index) => {
        e.preventDefault()


        axios
        .delete(`http://localhost:8081/api/ads/${index}`, config)
        .then(() => {
            
            axios
            .get(`http://localhost:8081/api/user/${id}`, config)
            .then((response)=>{setData(response.data.ads)})
            .catch((error)=>{console.log(error);})
            
        })
        .catch((error)=>{console.log(error);})
              

    }
    return(

        <div>
            <Navbar/>
 
        <div class="all-ads">
        { data.map(ads => (
        <div className="ads" >
        <img id="ads-home" src={ads.image} className="card-img-top" alt={ads.title} />
        <div className="card-body">
          <h5 className="card-title ">{ads.title}</h5>
          <p className="card-text">{ads.description}</p>
          <p className="card-text"><small className="text-muted">{ads.location}</small></p>
          <button className="btn btn-danger ms-1"><i  onClick={ (e)=> {deleteAds(e, ads.id) }}>حذف الاعلان</i></button> 
          <Link to={{
            pathname: `/editCard/${ads.id}`
        }} >
             <button className="btn btn-secondary"><i>تعديل الاعلان</i></button> 
              </Link>
        </div>    
        </div>

        ))}
        </div>
 

    </div>
    )
}

export default EditAds;