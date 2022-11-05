import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// auth
import AuthService from "./services/auth.service";

// components & assets
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/modBoard/ModBoard";
import BoardAdmin from "./components/board-admin.component";
import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
// import Categories from "./components/categories.component";
import News from "./components/news.component";
import AboutUs from "./components/aboutUs.component";
import Contact from "./components/contact.component";
import Book from "./components/addBook/AddBook";
import BookList from "./components/bookList/BookList";
import Categories from "./components/categories/Categories";

class App extends Component {
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
        <Navbar />
        <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/categories" component={Categories} />
            <Route path="/news" component={News} />
            <Route path="/aboutUs" component={AboutUs} />
            <Route path="/contact" component={Contact} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/book" component={Book} />
            <Route path="/edit/:id" component={Book} />
            <Route path="/bookList" component={BookList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
