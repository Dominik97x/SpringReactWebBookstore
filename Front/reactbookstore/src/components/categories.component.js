import React, { Component } from "react";

import UserService from "../services/user.service";

import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";
import book3 from "../assets/book3.jpg";
import book4 from "../assets/book4.jpg";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      menuTitle: "Choose the category",
      title: "Category",
      drama: "Drama",
      fantasy: "Fantasy",
      thriller: "Thriller",
      inne: "Other",
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
  }

  ChangeCategoryDrama = () => {
    var index;
    var list = document.getElementsByClassName("book-item");
    var x = document.getElementsByClassName("dropdown-item")[0];
    this.setState({ menuTitle: x.textContent });
    this.setState({ title: x.textContent });

    for (index = 0; index < list.length; ++index) {
      list[index].style.backgroundImage = `url(${book1})`;
    }
  };
  ChangeCategoryFantasy = () => {
    var index;
    var list = document.getElementsByClassName("book-item");
    var x = document.getElementsByClassName("dropdown-item")[1];
    this.setState({ menuTitle: x.textContent });
    this.setState({ title: x.textContent });

    for (index = 0; index < list.length; ++index) {
      list[index].style.backgroundImage = `url(${book2})`;
    }
  };
  ChangeCategoryThiller = () => {
    var index;
    var list = document.getElementsByClassName("book-item");
    var x = document.getElementsByClassName("dropdown-item")[2];
    this.setState({ menuTitle: x.textContent });
    this.setState({ title: x.textContent });

    for (index = 0; index < list.length; ++index) {
      list[index].style.backgroundImage = `url(${book3})`;
    }
  };
  ChangeCategoryInne = () => {
    var index;
    var list = document.getElementsByClassName("book-item");
    var x = document.getElementsByClassName("dropdown-item")[3];
    this.setState({ menuTitle: x.textContent });
    this.setState({ title: x.textContent });

    for (index = 0; index < list.length; ++index) {
      list[index].style.backgroundImage = `url(${book4})`;
    }
  };

  render() {
    return (
      <div className="container body">
        <div className="dropdown show ml-3 mb-3">
          <a
            className="btn btn-dark dropdown-toggle w-25"
            href=""
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="mainText">{this.state.menuTitle}</div>
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a
                onClick={this.ChangeCategoryDrama}
                className="dropdown-item"
                href="#"
              >
                {this.state.drama}
              </a>
            </li>
            <li>
              <a
                onClick={this.ChangeCategoryFantasy}
                className="dropdown-item"
                href="#"
              >
                {this.state.fantasy}
              </a>
            </li>
            <li>
              <a
                onClick={this.ChangeCategoryThiller}
                className="dropdown-item"
                href="#"
              >
                {this.state.thriller}
              </a>
            </li>
            <li>
              <a
                onClick={this.ChangeCategoryInne}
                className="dropdown-item"
                href="#"
              >
                {this.state.inne}
              </a>
            </li>
          </div>
        </div>
        <div className="category-title">
          <h2 className="display-4 mb-4 mainText">
            <strong>{this.state.title}</strong>
          </h2>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-10">
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
