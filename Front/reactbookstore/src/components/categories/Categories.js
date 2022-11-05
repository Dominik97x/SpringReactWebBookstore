import React, { Component } from "react";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import {
  Card,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import BookToast from "../toast/BookToast";
import axios from "axios";
// let tabGenre;
export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
    this.state = {
      currentUseser: { id: 0 },
      content: "",
      books: [],
      currentPage: 1,
      booksPerPage: 40,
      sortDir: "asc",
      booksSortedByGenre: [],
      titleButton: "Category",
      show: false,
      method: "",
      // isFilter: false,
      // categoryHandler: "",
    };
  }

  initialState = {
    id: "",
    price: "",
    quantity: "",
    availability: "",
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({
      currentUser: currentUser,
    });

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

  findBookById = (bookId) => {
    axios
      .get("http://localhost:8080/books/" + bookId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            price: response.data.price,
            quantity: response.data.quantity,
            availability: response.data.availability,
          });
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  // addBookToCart = () => {
  //   axios.post("http://localhost:8080/api/addtocart/addProduct")
  // }

  addToCart = (productObj) => {
    let obj = {
      productId: productObj.id,
      qty: "1",
      price: productObj.price,
      userId: this.state.currentUser.id,
    };
    axios
      .post("http://localhost:8080/api/addtocart/addProduct", obj)
      .then((response) => {
        response.json().then((data) => {
          if (response.data != null) {
            this.setState({ show: true, method: "post" });
            setTimeout(() => this.setState({ show: false }), 2500);
          } else {
            this.setState({ show: false });
          }
        });
      })
      .catch(function (response) {
        console.log("Error ", response);
        //alert(error.message);
      });
  };

  genreComedy() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Comedy")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreRomance() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Romance")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreHorror() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Horror")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreAction() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Action")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreWestern() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Western")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreMystery() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Mystery")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreSCI_FI() {
    axios
      .get("http://localhost:8080/books/searchByGenre/SCI-FI")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreFantasy() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Fantasy")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreDrama() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Drama")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  genreHistorical() {
    axios
      .get("http://localhost:8080/books/searchByGenre/Historical")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: [],
          books: data.content,
        });
      });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="container">
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <BookToast
            show={this.state.show}
            message={"Managed to add a book."}
            type={"success"}
          />
        </div>
        <DropdownButton
          id="dropdown-item-button"
          title={this.state.titleButton}
        >
          <Dropdown.Item
            onClick={this.genreComedy.bind(this)}
            as="button"
            value="Comedy"
          >
            Comedy
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreRomance.bind(this)}
            as="button"
            value="Romance"
          >
            Romance
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreHorror.bind(this)}
            as="button"
            value="Horror"
          >
            Horror
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreAction.bind(this)}
            as="button"
            value="Action"
          >
            Action
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreWestern.bind(this)}
            as="button"
            value="Western"
          >
            Western
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreMystery.bind(this)}
            as="button"
            value="Mystery"
          >
            Mystery
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreSCI_FI.bind(this)}
            as="button"
            value="SCI-FI"
          >
            SCI-FI
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreFantasy.bind(this)}
            as="button"
            value="Fantasy"
          >
            Fantasy
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreDrama.bind(this)}
            as="button"
            value="Drama"
          >
            Drama
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.genreHistorical.bind(this)}
            as="button"
            value="Historical"
          >
            Historical
          </Dropdown.Item>
        </DropdownButton>
        <Container fluid className="row">
          {books.map((book) => (
            <Card
              className="d-inline-block"
              key={book.id}
              style={{ width: "20rem" }}
            >
              <Card.Img
                variant="top"
                style={{ width: "250px", height: "350px" }}
                src={book.covers}
              />
              <Card.Body
                variant="right"
                style={{ width: "250px", height: "260px" }}
              >
                <Card.Title
                  className="row "
                  style={{ width: "250px", height: "100px" }}
                >
                  {book.title}
                </Card.Title>
                <Card.Text
                  className="row"
                  style={{ width: "250px", height: "50px" }}
                >
                  {book.authors}
                </Card.Text>
                <Card.Text
                  className="row text-center text-danger"
                  style={{ width: "250px", height: "50px" }}
                >
                  <div className="col-6 text-center">{book.genre}</div>
                  <div className="col-6 text-center">Price: {book.price}$</div>
                </Card.Text>
              </Card.Body>
              <div className="row">
                <div className="col-6">
                  <Button className="" variant="info">
                    More..
                  </Button>
                </div>
                <div className="col-6">
                  <Button
                    onClick={() => this.addToCart(book)}
                    className=""
                    variant="warning"
                  >
                    Add to Cart
                  </Button>
                </div>
                {/* <Form class="col-2">
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control style={{ width: "48px" }} as="select" custom>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Control>
                  </Form.Group>
                </Form> */}
              </div>
            </Card>
          ))}
        </Container>
      </div>
    );
  }
}

// filteredCategories() {
//   tabGenre = this.state.books.filter((id) => {
//     return id.genre === this.state.categoryHandler;
//   });
//   this.setState({ isFilter: true });
// }

// getCategoryHandler(event) {
//   this.setState({ categoryHandler: event.target.value });
//   this.filteredCategories();
// }

//   render() {
//     const { books } = this.state;
//     return (
//       <div className="container">
//         <DropdownButton
//           id="dropdown-item-button"
//           title={this.state.titleButton}
//         >
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Comedy"
//           >
//             Comedy
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Black comedy"
//           >
//             Black Comedy
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Horror"
//           >
//             Horror
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Action"
//           >
//             Action
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Western"
//           >
//             Western
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Mystery"
//           >
//             Mystery
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="SCI-FI"
//           >
//             SCI-FI
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Fantasy"
//           >
//             Fantasy
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Drama"
//           >
//             Drama
//           </Dropdown.Item>
//           <Dropdown.Item
//             onClick={this.getCategoryHandler.bind(this)}
//             as="button"
//             value="Historical"
//           >
//             Historical
//           </Dropdown.Item>
//         </DropdownButton>

//         {this.state.isFilter === false ? (
//           <Container fluid className="row">
//             {books.map((book) => (
//               <Card
//                 className="d-inline-block "
//                 key={book.id}
//                 style={{ width: "20rem" }}
//               >
//                 <Card.Img
//                   variant="top"
//                   style={{ width: "250px", height: "350px" }}
//                   src={book.covers}
//                 />
//                 <Card.Body
//                   variant="right"
//                   style={{ width: "250px", height: "260px" }}
//                 >
//                   <Card.Title
//                     className="row "
//                     style={{ width: "250px", height: "100px" }}
//                   >
//                     {book.title}
//                   </Card.Title>
//                   <Card.Text
//                     className="row"
//                     style={{ width: "250px", height: "50px" }}
//                   >
//                     {book.authors}
//                   </Card.Text>
//                   <Card.Text
//                     className="row text-center text-danger jusitfy-content-center"
//                     style={{ width: "250px", height: "50px" }}
//                   >
//                     <div className="col-5">{book.genre}</div>
//                     <strong className="col-7 text-center">
//                       Price: {book.price}
//                     </strong>
//                   </Card.Text>
//                 </Card.Body>
//                 <Button className="col-5" variant="info">
//                   More..
//                 </Button>
//                 <Button className="col-5 float-right" variant="warning">
//                   Add to Cart
//                 </Button>
//               </Card>
//             ))}
//           </Container>
//         ) : (
//           <Container fluid className="row">
//             {tabGenre.map((book) => (
//               <Card
//                 className="d-inline-block "
//                 key={book.id}
//                 style={{ width: "20rem" }}
//               >
//                 <Card.Img
//                   variant="top"
//                   style={{ width: "250px", height: "350px" }}
//                   src={book.covers}
//                 />
//                 <Card.Body
//                   variant="right"
//                   style={{ width: "250px", height: "260px" }}
//                 >
//                   <Card.Title
//                     className="row "
//                     style={{ width: "250px", height: "100px" }}
//                   >
//                     {book.title}
//                   </Card.Title>
//                   <Card.Text
//                     className="row"
//                     style={{ width: "250px", height: "50px" }}
//                   >
//                     {book.authors}
//                   </Card.Text>
//                   <Card.Text
//                     className="row text-center text-danger jusitfy-content-center"
//                     style={{ width: "250px", height: "50px" }}
//                   >
//                     <div className="col-5">{book.genre}</div>
//                     <strong className="col-7 text-center">
//                       Price: {book.price}
//                     </strong>
//                   </Card.Text>
//                 </Card.Body>
//                 <Button className="col-5" variant="info">
//                   More..
//                 </Button>
//                 <Button className="col-5 float-right" variant="warning">
//                   Add to Cart
//                 </Button>
//               </Card>
//             ))}
//           </Container>
//         )}
//       </div>
//     );
//   }
// }
