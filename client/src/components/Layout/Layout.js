import React from 'react';
import "../../styles/Layout.css";
import { recruiterMenu,studentMenu } from './Menus/UserMenu';
import {Link,useLocation,useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
//import {useSelector} from "react-redux";

const Layout = ({children}) => {
  const location = useLocation();
  const navigate=useNavigate();
  const userRole=JSON.parse(localStorage.getItem('user'))?.role;
  const userEmail=JSON.parse(localStorage.getItem('user'))?.email;
  const sidebarMenu=userRole==='recruiter'?recruiterMenu:studentMenu;
  //logout handler
  const handleLogout=()=>{
    localStorage.clear()
    toast.success('Logout Successfully');
    navigate("/login");
  }
  return (
    <>
      <div className="row">
        <div className="col-md-3 sidebar">
            <div className="logo">
                <h6 >JOB PORTAL</h6>
            </div>
            <hr/>
            
            <p className="text-center text-warning username ">Welcome  {userEmail}</p>
            <hr/>
            <div className="menu"> 
          {sidebarMenu.map((menu)=>{
            const isActive=location.pathname === menu.path;
            return (
              <div key={menu.name} className={`menu-item ${isActive? "active":" "}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
})}
          <div className={`menu-item`} onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <Link to='/login'>Logout</Link>
          </div>
          </div>
        </div>
        
        <div className="col-md-9">
            {children}
        </div>
    </div>
    </>
  );
};

export default Layout;
