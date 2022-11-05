import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faList } from "@fortawesome/free-solid-svg-icons";

class NavMod extends Component {
  render() {
    return (
      <div className="container">
        <Nav
          fill
          variant="tabs"
          defaultActiveKey="/mod/bookList"
          className="bg-dark"
        >
          <Nav.Item>
            <Link
              to={"/mod/bookList"}
              className="text-center nav-link text-white"
            >
              <FontAwesomeIcon className="mr-1" icon={faList} />
              BookList
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/mod/book"} className="text-center nav-link text-white">
              <FontAwesomeIcon className="mr-1" icon={faPlusSquare} />
              Add Book
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default NavMod;
