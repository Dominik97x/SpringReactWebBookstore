import React, { Component } from "react";

import UserService from "../services/user.service";

import { Card } from "react-bootstrap";

import axios from "axios";

// components & assets
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      books: [],
      currentPage: 1,
      booksPerPage: 12,
      sortDir: "asc",
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
  }

  findAllBooks(currentPage) {
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

  render() {
    const { books } = this.state;
    return (
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-interval="5000"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={Banner1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={Banner2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={Banner3} alt="Third slide" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <h2 className="display-4">
          <strong>This summer bestsellers</strong>
        </h2>
        <div className="row-fluid">
          <div className="col-lg-12">
            <div className="book-container">
              {books.map((book) => (
                <Card.Img
                  style={{
                    width: "300px",
                    height: "410px",
                    marginRight: "10px",
                  }}
                  src={book.covers}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
