import React, { Component } from "react";

import UserService from "../services/user.service";
import { Card, Container } from "react-bootstrap";

import axios from "axios";

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      books: [],
      books2: [],
      books3: [],
      currentPage: 1,
      booksPerPage: 4,
      sortDir: "asc",
      titleBestsellers1: "Bestsellers World 2021",
      titleBestsellers2: "Bestsellers Europe 2021",
      titleBestsellers3: "Bestsellers Poland 2021",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
    this.findAllBooks(this.state.currentPage);
    this.findAllBooks2(this.state.currentPage);
    this.findAllBooks3(this.state.currentPage);
  }

  findAllBooks(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/books?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.booksPerPage +
          "&sortBy=id&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  findAllBooks2(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/books?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.booksPerPage +
          "&sortBy=title&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books2: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  findAllBooks3(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/books?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.booksPerPage +
          "&sortBy=price&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books3: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  render() {
    const { books, books2, books3 } = this.state;
    return (
      <div className="container bg-dark">
        <h2 className="text-light text-center m-5">
          {this.state.titleBestsellers1}
        </h2>
        <Container className="row">
          {books.map((book) => (
            <div className="col">
              <Card.Img
                style={{ width: "191px", height: "210px" }}
                src={book.covers}
              />
              <Card.Title style={{ color: "#fff", width: "171px" }}>
                {book.title}
              </Card.Title>
            </div>
          ))}
        </Container>

        <h2 className="text-light text-center m-5">
          {this.state.titleBestsellers2}
        </h2>
        <Container className="row">
          {books2.map((book) => (
            <div className="col">
              <Card.Img
                style={{ width: "191px", height: "210px" }}
                src={book.covers}
              />
              <Card.Title style={{ color: "#fff", width: "171px" }}>
                {book.title}
              </Card.Title>
            </div>
          ))}
        </Container>

        <h2 className="text-light text-center m-5">
          {this.state.titleBestsellers3}
        </h2>
        <Container className="row">
          {books3.map((book) => (
            <div className="col">
              <Card.Img
                style={{ width: "191px", height: "210px" }}
                src={book.covers}
              />
              <Card.Title style={{ color: "#fff", width: "171px" }}>
                {book.title}
              </Card.Title>
            </div>
          ))}
        </Container>
      </div>
    );
  }
}
