import React, { Component } from "react";
import { Link } from "react-router-dom";

// styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import {
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

// auth
import AuthService from "../services/auth.service";

// components & assets
import Logo from "../assets/logo.png";

class Navba extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="body mb-5">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Link to="/" className="navbar-brand">
            <img href="/" src={Logo} className="toolbar_logo" alt="logo" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/categories"} className="nav-link">
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/news"} className="nav-link">
                  News
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/aboutUs"} className="nav-link">
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/contact"} className="nav-link">
                  Contact
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item=">
                  <Link to={"/mod"} className="nav-link text-info">
                    Moderator
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link text-info">
                    Admin
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                {currentUser && (
                  <li className="nav-item mr-5">
                    <Link to={"/user"} className="nav-link text-warning">
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                      Cart
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link text-primary">
                    <FontAwesomeIcon icon={faUser} className="mr-1" />
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="/login"
                    className="nav-link text-danger"
                    onClick={this.logOut}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                    Log out
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
                    Log in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
                    Create New Account
                  </Link>
                </li>
              </div>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navba;
