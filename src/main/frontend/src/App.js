import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/home/Home'
import Login from './component/login/Login'
import Singup from './component/singup/Singup'
import EditUserInfo from "./component/editUserInfo/EditUserInfo";
import AddAds from "./component/addAds/AddAds"
import Ads from "./component/ads/Ads"
import EditAds from "./component/editAds/EditAds"
import EditCard from "./component/editCard/EditCard"

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/singup" element = {<Singup />} />
        <Route path = "/editUserInfo" element = {<EditUserInfo />} />
        <Route path = "/addAds" element = {<AddAds />} />
        <Route path = "/ads/:adsId" element = {<Ads />} />
        <Route path = "/editAds" element = {<EditAds />} />
        <Route path = "/editCard/:adsId" element = {<EditCard />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
