import Navbar from "../navbar/Navbar"
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ads.css"


function Ads(props){


    const params = useParams()
    const [data, setData] = useState();
    
    useEffect(async () => {
        const result = await axios(
          `http://localhost:8081/api/ads/${params.adsId}`,
        );

        setData(result.data);
      },[]);


     
    return(
               
        <div>
            <Navbar/>
            { data && (
        <div className="ads-card">
            <div className="adsImage">
                <img className="ads-img" src={data.image}  alt="..." />
            </div>
            <div className="ads-body">
                <h5 className="ads-title">{data.title}</h5>
                <p className="ads-text">{data.description}</p>
                <p className="ads-text"><small className="text-muted">{data.location}</small></p>
            </div>
            
        </div>
            ) } 
        </div>
    )

}

export default Ads;