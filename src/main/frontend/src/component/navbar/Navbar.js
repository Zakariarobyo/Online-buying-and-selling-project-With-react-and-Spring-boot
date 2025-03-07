import { Link, useNavigate   } from 'react-router-dom';
import './navbar.css'
function Navbar(){

    return(
        <div>
            <div className="header">
            <div className='home-navbar'>
            <Link to="/">
            
                <i class="bi bi-house-door"></i>
                <p className='leble-icon-nav'>الرئيسية</p>
            </Link>
            </div>
            </div>
        </div>

    )

}

export default Navbar;