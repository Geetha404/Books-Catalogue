import React, { Component } from "react";
import booksList from "./books-test-collection";
import { fetchBooks } from "./api";
import { Link } from "react-router-dom";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      currentPage: 1,
      books: []
    };
  }

  updatePage = () => {
    fetchBooks(this.state.currentPage).then(booksList => {
      this.setState({
        books: booksList
      });
    });
  };

  componentDidMount() {
    if (!document.location.search) {
      this.updatePage();
    } else {
      this.setState(
        {
          currentPage: parseInt(document.location.search.split("=")[1])
        },
        () => {
          this.updatePage();
        }
      );
    }
  }

  componentDidUpdate() {
    //this.updatePage();
  }

  nextPage = () => {
    const { currentPage } = this.state;
    this.setState(
      {
        currentPage: currentPage + 1
      },
      () => {
        this.updatePage();
      }
    );
    window.scrollTo(0, 0);
  };
  previousPage = () => {
    const { currentPage } = this.state;
    this.setState(
      {
        currentPage: currentPage - 1
      },
      () => {
        this.updatePage();
      }
    );
    window.scrollTo(0, 0);
  };

  render() {
    const { books, currentPage } = this.state;

    return (
      <div className="container">
        <div className="columns is-multiline">
          {books.map((book, key) => {
            return (
              <Link
                to={`/book/${book.title.split(" ").join("_")}`}
                key={key}
                className="column is-one-third"
              >
                <div className="box">
                  <div>
                    <h3>{book.title}</h3>
                  </div>
                  <div>
                    <strong>Amazon Rank</strong>: {book.amazon_rank}{" "}
                  </div>
                  <div>
                    <strong>Book Key</strong>:{book.bookkey}{" "}
                  </div>
                  <br />
                  {book.image ? (
                    <img
                      src={
                        book.image.substring(0, 4) == "http"
                          ? book.image
                          : `https://${book.image}`
                      }
                      alt="Book Logo"
                    />
                  ) : (
                    <h3>No image available</h3>
                  )}

                  {/* <div>{books.isbns} </div> */}

                  <div>
                    <br />
                    <strong>Price: </strong>
                    <span className="button is-success is-outlined is-rounded">
                      ${book.price}
                    </span>
                  </div>
                  <div>
                    <strong>Publisher: </strong> <span>{book.publisher}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <footer>
          <Link
            to={`/?page=${currentPage - 1}`}
            className="button"
            onClick={this.previousPage}
            disabled={currentPage < 2}
          >
            prev
          </Link>
          <strong>Page {this.state.currentPage} of 9</strong>
          <Link
            to={`/?page=${currentPage + 1}`}
            className="button"
            onClick={this.nextPage}
            disabled={currentPage > 8}
          >
            next
          </Link>
        </footer>
      </div>
    );
  }
}

export default Books;
