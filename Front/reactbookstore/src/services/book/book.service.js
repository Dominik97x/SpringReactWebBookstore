import axios from "axios";

const API_URL = "http://localhost:8080/";

class BookService {
  getCurrentBook(
    id,
    title,
    authors,
    title_slug,
    isbn13,
    isbn10,
    pirce,
    publisher,
    pubdate,
    subject,
    overview,
    synopsis,
    covers,
    quantity,
    availability
  ) {
    return (
      axios.post(API_URL + "books"),
      {
        id,
        title,
        authors,
        title_slug,
        isbn13,
        isbn10,
        pirce,
        publisher,
        pubdate,
        subject,
        overview,
        synopsis,
        covers,
        quantity,
        availability,
      }
    );
  }
}

export default new BookService();
