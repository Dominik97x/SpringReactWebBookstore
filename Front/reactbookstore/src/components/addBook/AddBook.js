import React, { Component } from "react";
import { Card, Form, Col, Button } from "react-bootstrap";
import UserService from "../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faList,
  faUndo,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BookToast from "../toast/BookToast";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      content: "",
      show: false,
    };
    this.bookChange = this.bookChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }

  initialState = {
    id: "",
    title: "",
    authors: "",
    title_slug: "",
    isbn13: "",
    isbn10: "",
    price: "",
    publisher: "",
    pubdate: "",
    genre: "",
    overview: "",
    synopsis: "",
    covers: "",
    quantity: "",
    availability: "",
  };

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
    const bookId = +this.props.match.params.id;
    if (bookId) {
      this.findBookById(bookId);
    }
  }

  findBookById = (bookId) => {
    axios
      .get("http://localhost:8080/books/" + bookId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            authors: response.data.authors,
            title_slug: response.data.title_slug,
            isbn13: response.data.isbn13,
            isbn10: response.data.isbn10,
            price: response.data.price,
            publisher: response.data.publisher,
            pubdate: response.data.pubdate,
            genre: response.data.genre,
            overview: response.data.overview,
            synopsis: response.data.synopsis,
            covers: response.data.covers,
            quantity: response.data.quantity,
            availability: response.data.availability,
          });
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  submitBook = (event) => {
    const book = {
      title: this.state.title,
      authors: this.state.authors,
      title_slug: this.state.title_slug,
      isbn13: this.state.isbn13,
      isbn10: this.state.isbn10,
      price: "$" + this.state.price,
      publisher: this.state.publisher,
      pubdate: this.state.pubdate,
      genre: this.state.genre,
      overview: this.state.overview,
      synopsis: this.state.synopsis,
      covers: this.state.covers,
      quantity: this.state.quantity,
      availability: this.state.availability,
    };
    event.preventDefault();

    axios.post("http://localhost:8080/books", book).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 2500);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  updateBook = (event) => {
    const book = {
      id: this.state.id,
      title: this.state.title,
      authors: this.state.authors,
      title_slug: this.state.title_slug,
      isbn13: this.state.isbn13,
      isbn10: this.state.isbn10,
      price: this.state.price,
      publisher: this.state.publisher,
      pubdate: this.state.pubdate,
      genre: this.state.genre,
      overview: this.state.overview,
      synopsis: this.state.synopsis,
      covers: this.state.covers,
      quantity: this.state.quantity,
      availability: this.state.availability,
    };
    event.preventDefault();

    axios.put("http://localhost:8080/books", book).then((response) => {
      if (response.data != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 2500);
        setTimeout(() => this.bookList(), 2500);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  resetBook = () => {
    this.setState(() => this.initialState);
  };

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  bookList = () => {
    return this.props.history.push("/mod/bookList");
  };

  render() {
    const {
      title,
      authors,
      title_slug,
      isbn13,
      isbn10,
      price,
      publisher,
      pubdate,
      genre,
      overview,
      synopsis,
      covers,
      quantity,
      availability,
    } = this.state;

    return (
      <div className="container">
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <BookToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Book Updated Successfully."
                : "Book Saved Successfully."
            }
            type={"success"}
          />
        </div>

        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon
              className="mr-1"
              icon={this.state.id ? faEdit : faPlusSquare}
            />
            {this.state.id ? "Update Book" : "Add Book"}
          </Card.Header>

          <Form
            onReset={this.resetBook}
            onSubmit={this.state.id ? this.updateBook : this.submitBook}
            id="bookFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={title}
                    onChange={this.bookChange}
                    name="title"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź tytuł ksiązki"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAuthors">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={authors}
                    onChange={this.bookChange}
                    name="authors"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź autora książki"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle_slug">
                  <Form.Label>Title slug</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    value={title_slug}
                    onChange={this.bookChange}
                    name="title_slug"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź title slug ksiązki"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridISBN13">
                  <Form.Label>ISBN13 number</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={isbn13}
                    onChange={this.bookChange}
                    name="isbn13"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź numer ISBN13 książki"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridISBN10">
                  <Form.Label>ISBN10 number</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    value={isbn10}
                    onChange={this.bookChange}
                    name="isbn10"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź numer ISBN10 książki"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={price}
                    onChange={this.bookChange}
                    name="price"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź cenę książki"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPublisher">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={publisher}
                    onChange={this.bookChange}
                    name="publisher"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź wydawcę książki"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPubDate">
                  <Form.Label>Publication date</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={pubdate}
                    onChange={this.bookChange}
                    name="pubdate"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź miesiąć i rok wydania książki"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridGenre">
                  <Form.Label>Gener</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={genre}
                    onChange={this.bookChange}
                    name="genre"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź temat książki"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridOverview">
                  <Form.Label>Overview</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    value={overview}
                    onChange={this.bookChange}
                    name="overview"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź opis książki"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridSynopsis">
                  <Form.Label>Synopsis</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    value={synopsis}
                    onChange={this.bookChange}
                    name="synopsis"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź streszczenie książki"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCovers">
                  <Form.Label>Cover Photo URL</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={covers}
                    onChange={this.bookChange}
                    name="covers"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź URL okładki książki"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={quantity}
                    onChange={this.bookChange}
                    name="quantity"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź ilość dostępnych książek"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAvailability">
                  <Form.Label>Availability</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    value={availability}
                    onChange={this.bookChange}
                    name="availability"
                    className={"bg-dark text-white"}
                    placeholder="Wprowadź dostępność książki (1 lub 0)"
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon className="mr-1" icon={faSave} />
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon className="mr-1" icon={faUndo} />
                Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={this.bookList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> Book List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
