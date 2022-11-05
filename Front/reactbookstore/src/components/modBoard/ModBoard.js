import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import UserService from "../../services/user.service";
import NavMod from "./NavMod";
import Book from "../book/Book";
import BookList from "../bookList/BookList";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  bookList = () => {
    return this.props.history.push("/bookList");
  };

  addBook = () => {
    return this.props.history.push("/book");
  };

  render() {
    return (
      <div className="container">
        <div>
          <NavMod />
          <Switch>
            <Route path="/mod/book" component={Book} />
            <Route path="/mod/edit/:id" component={Book} />
            <Route
              exact
              path={["/mod", "/mod/bookList"]}
              component={BookList}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
