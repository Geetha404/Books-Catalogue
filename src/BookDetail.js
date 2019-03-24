import React from "react";
import { fetchBook } from "./api";

class BookDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      book: null,
      error: "",
      loading: false
    };
  }

  componentDidMount() {
    const bookTitle = this.props.match.params.bookId;
    this.fetchBook(bookTitle);
  }

  fetchBook = bookTitle => {
    fetchBook(bookTitle).then(data => {
      this.setState({
        book: data
      });
    });
  };

  createMarkup = html => {
    return {
      __html: html
    };
  };

  componentDidUpdate(props) {
    const updatedBookName = document.URL.split("/").pop();
    if (!this.state.book) return;
    if (this.state.book.title.split(" ").join("_") !== updatedBookName) {
      this.fetchBook(updatedBookName);
    }
  }

  render() {
    const { book, loading, error } = this.state;

    if (!book) {
      return <div className="loading-container">Loading...</div>;
    }
    return (
      <div className="container book-detail-page">
        <div className="box">
          <div className="columns">
            <div className="column is-one-third">
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
            </div>
            <div className="column is-two-thirds has-text-left">
              <h1>{book.title}</h1>
              <p>
                <strong>Primary ISBN:</strong>
                <span>{book.primary_isbn}</span>
              </p>

              <p>
                <strong>Price:</strong>
                <span className="button is-success is-outlined is-rounded">
                  ${book.price}
                </span>
              </p>

              <p>
                <strong>Amazon Rank:</strong>
                <span>${book.amazon_rank}</span>
              </p>

              <p>
                <strong>Publisher:</strong>
                <span>${book.publisher}</span>
              </p>

              <div>
                <strong>Description:</strong>
                {
                  <div
                    dangerouslySetInnerHTML={this.createMarkup(
                      book.description
                    )}
                  />
                }
              </div>
            </div>
          </div>
        </div>

        <button className="button" onClick={() => this.props.history.goBack()}>
          Go back
        </button>
      </div>
    );
  }
}

export default BookDetail;
