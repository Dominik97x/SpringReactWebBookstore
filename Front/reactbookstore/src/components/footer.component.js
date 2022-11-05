import React, { Component } from "react";

// styling
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// auth
import AuthService from "../services/auth.service";

// components & assets
// import Login from "./login.component";
// import Register from "./register.component";
// import Home from "./home.component";
// import Profile from "./profile.component";
// import BoardUser from "./board-user.component";
// import BoardModerator from "./board-moderator.component";
// import BoardAdmin from "./board-admin.component";

class Footer extends Component {
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
    // const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="body">
        <div className="container-fluid pb-0 mb-0 justify-content-center text-light">
          <footer>
            <div className="row my-5 justify-content-center py-5">
              <div className="col-11">
                <div className="row ">
                  <div className="col-xl-7 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                    <h3 className="text-muted mb-md-0 mb-5 bold-text">
                      Book Store Online
                    </h3>
                  </div>
                  <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                    <h6 className="mb-3 mb-lg-4 text-muted bold-text">
                      <b>MENU</b>
                    </h6>
                    <ul className="list-unstyled">
                      <li>
                        <a href="/home" className="text-light">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="/categories" className="text-light">
                          Categories
                        </a>
                      </li>
                      <li>
                        <a href="/news" className="text-light">
                          News
                        </a>
                      </li>
                      <li>
                        <a href="/aboutUs" className="text-light">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="text-light">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-xl-3 col-md-4 col-sm-4 col-12">
                    <h6 className="mb-3 mb-lg-4 text-muted bold-text">
                      <b>ADDRESS</b>
                    </h6>
                    <div className="text-light">
                      <p className="mb-1">Konstantynów 1H, 20-708</p>
                      <p>Lublin</p>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-xl-7 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                    <p className="social text-muted mb-0 pb-0 bold-text">
                      <span className="mx-3">
                        <a
                          href="https://www.facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                      </span>
                      <span className="mx-3">
                        <a
                          href="https://www.youtube.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa fa-youtube-play"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </span>
                      <span className="mx-3">
                        <a
                          href="https://www.twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                      </span>
                      <span className="mx-3">
                        <a
                          href="https://www.instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                      </span>
                    </p>
                    <small className="text-light">
                      All rights reserved &copy; Sebastian Kozak, Daniel Koter,
                      Dominik Halista
                    </small>
                  </div>
                  <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end">
                    <h6 className="text-muted bold-text">
                      <b>Phone Number</b>
                    </h6>
                    <small className="text-light">
                      <span className="mr-1">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                      </span>
                      +48-501-502-503
                    </small>
                  </div>
                  <div className="col-xl-3 col-md-4 col-sm-4 col-auto order-2 align-self-end">
                    <h6 className="text-muted bold-text">
                      <b>E-mail</b>
                    </h6>
                    <small className="text-light">
                      <span className="mr-1">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      ksiegarniaonlinehkk@gmail.com
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Footer;
