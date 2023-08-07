import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function Layout({ children }) { 
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [activemenu,setActiveMenuItem] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Revenue",
      path: "/revenue",
      icon: "ri-file-list-line",
    }
  ];

  
  const handleMenuItemClick = (menuPath) => {
    setActiveMenuItem(menuPath);
  };
  const menuToBeRendered = userMenu;
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="menu-book">
          <div >
          {collapsed ? (
              <i
                className="ri-menu-2-fill "
                style={{color:"black",fontSize:"40px",paddingLeft:"10px"}}
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill"
                style={{color:"black",fontSize:"40px",paddingLeft:"10px"}}
                onClick={() => setCollapsed(true)}
              ></i>
            )}

          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                  
                >
                  
                  {!collapsed && <Link to={menu.path}>
                  <i className={menu.icon } style={{color:"black"}}></i>
                    {menu.name}
                    </Link>}

                    {collapsed && <Link to={menu.path}>
                  <i className={menu.icon } style={{color:"black"}}></i>
                    </Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              
              {!collapsed && <Link to="/login">
              <i className="ri-logout-circle-line" style={{color:"black"}}></i>
              Logout</Link>}
            </div>
            <div
              className={`d-flex menu-item `}
              style={{marginTop:"-3px"}}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              
              {collapsed && <Link to="/login">
              <i className="ri-logout-circle-line" style={{color:"black"}}></i>
              </Link>}
            </div>
          </div>
        </div>

        <div className="content">
          
          <div className="main-layout">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
