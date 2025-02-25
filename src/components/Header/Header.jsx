import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Use dispatch and selector
import { logoutUser } from "../../features/users/userSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Import logoutUser action
import "../../styles/header.css";
import { getCartData } from "../../features/cars/carSlice";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const { user } = useSelector((state) => state.user); 
  const { cart, cars } = useSelector((state) => state.cars);

  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  

  const totalItems = () => {
    if (!Array.isArray(cart)) return 0; // Prevent error if cart is not an array
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  const calculateCost = () => {
    if (!Array.isArray(cart) || !Array.isArray(cars)) return 0;
    return cart.reduce((sum, item) => {
      let myCar = cars.find((car) => car._id === item.car_id);
      return myCar ? sum + myCar.car_discounted_rent * item.quantity : sum;
    }, 0);
  };
  
  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +92 318 1904193
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {user?.role == "admin" && (
                  <Link to="/admin">Admin Dashboard</Link>
                )}
                {user ? (
                  <>
                    <span className="user-name">Hello, {user.username}</span>
                    <button
                      onClick={handleLogout}
                      className="btn-logout  text-blue border-0 rounded-3 px-1"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className=" d-flex align-items-center gap-1"
                    >
                      <i className="ri-login-circle-line"></i> Login
                    </Link>

                    <Link
                      to="/register"
                      className=" d-flex align-items-center gap-1"
                    >
                      <i className="ri-user-line"></i> Register
                    </Link>
                  </>
                )}
                <Link to="/cart">
                  <div className="d-flex align-items-center position-relative flex-column gap-1">
                    <div
                      style={{
                        right: "-10%",
                        borderRadius: "50%",
                        width: "15px",
                        height: "15px",
                      }}
                      className="count position-absolute text-sm d-flex justify-content-center align-items-center  bg-warning text-white"
                    >
                      {totalItems()}
                    </div>
                    <ShoppingCartIcon style={{ cursor: "pointer" }} />
                    <h6 className="m-0 text-sm">${calculateCost()}</h6>
                  </div>
                </Link>

                <nav></nav>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Pakistan</h4>
                  <h6>Islamabad City, Pakistan</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu  justify-content-between align-items-center w-100">
              <i className="ri-menu-line menu-icon" onClick={toggleMenu}></i>
              <Link to="/cart" className="cart-icon">
                <div className="cart-wrapper position-relative d-flex flex-column align-items-center">
                  <div className="cart-count bg-warning text-white d-flex justify-content-center align-items-center">
                    {totalItems()}
                  </div>
                  <ShoppingCartIcon className="cart-icon-style" />
                  <h6 className="cart-cost">${calculateCost()}</h6>
                </div>
              </Link>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
