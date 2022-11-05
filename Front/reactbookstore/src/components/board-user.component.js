import React, { Component } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import axios from "axios";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.state = this.book;
    this.state = {
      content: "",
      currentUser: { id: 0 },
      cart: [],
      booksList: [],
      currentPage: 1,
      booksPerPage: 10,
      sortDir: "asc",
    };
  }

  book = {
    id: "",
    title: "",
    authors: "",
    price: "",
    genre: "",
    covers: "",
    quantity: "",
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({ currentUser: currentUser });

    UserService.getUserBoard().then(
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
    this.getCart(currentUser);
  }

  findBooksById = (bookId) => {
    axios
      .get("http://localhost:8080/books/" + bookId)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.id);
        this.setState({
          id: data.id,
          title: data.title,
          authors: data.authors,
          price: data.price,
          genre: data.genre,
          covers: data.covers,
          quantity: data.quantity,
        });
        console.log(this.state.title);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  };

  getCart = (userObj) => {
    let obj = {
      userId: userObj.id,
    };
    axios
      .post("http://localhost:8080/api/addtocart/getCartsByUserId", obj)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            cart: response.data,
          });
          console.log(response.data);
        } else {
          console.log("data === null");
        }
      })
      .catch(function (response) {
        console.log("Error ", response);
      });
  };

  render() {
    const { cart } = this.state;

    return (
      <div className="container">
        <strong className="text-warning text-center">
          Tu miałbyć koszyk :(
        </strong>
        {/* {cart.map((c) => (
          <div key={c.id}>
            <div>Book id: {c.book_id}</div>
          </div>
        ))} */}
      </div>
    );
  }
}
