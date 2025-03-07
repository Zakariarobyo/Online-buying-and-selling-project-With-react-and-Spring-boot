import Navbar from "../navbar/Navbar";
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { Link, useNavigate   } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

function EditCard(props){

    const params = useParams() //params.adsId
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const [adsTitle, setadsTitle] = useState();
    const [adsLocation, setadsLocation] = useState();
    const [adsDescription, setadsDescription] = useState();
    const [category, setCategory] = useState(1);
    const [adsImage, setadsImage] = useState();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("")
    const navigate = useNavigate();
    let file
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
        const result = await axios.get(`http://localhost:8081/api/ads/${params.adsId}`);
        setData(result.data);
        setadsTitle(result.data.title)
        setadsLocation(result.data.location)
        setadsDescription(result.data.description)
        setImage(result.data.image)
        setCategory(result.data.category.id)


      },[]);


      const title = (e) =>{
        setadsTitle(e.target.value);
    }

    const location = (e) =>{
        setadsLocation(e.target.value);
    }
    
    const description = (e) =>{
        setadsDescription(e.target.value);
    }

    const categoryRealEstate = (e) => {
      e.preventDefault();

      setCategory(2)
      document.querySelector('#categoryTitle').innerHTML = "عقار"
    }

    const categoryCar = (e) => {
      e.preventDefault();

      setCategory(3)
      document.querySelector('#categoryTitle').innerHTML = "مركبة"
    }

    const categoryDevices = (e) => {
      e.preventDefault();

      setCategory(4)
      document.querySelector('#categoryTitle').innerHTML = "اجهزة"
    }

    const uploadImage = async (e) =>{
 
        const files = e.target.files
        const data = new FormData()
        data.append('file',files[0])
        data.append('upload_preset', 'adsimage')
        setLoading(true)

        const res = await axios.post("https://api.cloudinary.com/v1_1/elmelm/image/upload", data)
        .then((res) =>{
        file = true
        setImage(res.data.secure_url)
        setLoading(false)
        
        });
    }

    const postAds = (e) =>{
        e.preventDefault();
        const data ={
            "title": adsTitle,
            "description": adsDescription,
            "image": image,
            "location":adsLocation,
            "user":{
                "id":id
            },
            "category":{

                "id":category
            }

        };

        axios
          .put(`http://localhost:8081/api/ads/${params.adsId}`, data, config)
          .then((response) => {
            navigate("/editAds");
          })
          .catch((error) => {console.log(error)
        });
    };
  

    return(

        <div>
            <Navbar/>
            { data && (
            <form>
           
          <div className="ads-from">
          <label>عنوان الاعلان</label>
          <input  className="form-control" placeholder={data.title} onChange={title}/>
          <label>المنطقة</label>
          <input  className="form-control" placeholder={data.location} onChange={location}/>
          <label>وصف الاعلان</label>
          <input  className="form-control" placeholder={data.description}  onChange={description}/>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              التصنيف
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item" type="button" onClick={categoryRealEstate}>عقار</button>
              <button className="dropdown-item" type="button" onClick={categoryCar}>مركبة</button>
              <button className="dropdown-item" type="button" onClick={categoryDevices}>اجهزة</button>
              </ul>
              <h5 id="categoryTitle"></h5>
            </div>
          <label>اضف الصور</label>
          <input type="file" className="form-control-file image-upload" onChange={uploadImage}/>
        <button type="submit" className="btn btn-primary" onClick={postAds}>ارسال</button>
        </div>
      
      </form>
         ) } 
        </div>
    )
}

export default EditCard;