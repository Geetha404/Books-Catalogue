import React, { Component } from "react";
import { Link } from "react-router-dom";
import { searchBooks } from "./api";

class Search extends Component {
  state = {
    bookList: null
  };

  searchCoins = event => {
    if (!event.target.value) return;
    searchBooks(event.target.value).then(bookList => {
      this.setState({
        bookList
      });
    });
  };

  clearCoins = () => {
    this.setState({
      bookList: null
    });
  };

  render() {
    const { bookList } = this.state;
    return (
      <div className="field">
        <p className="control has-icons-left ">
          <input
            className="input"
            type="email"
            placeholder="Search Books"
            onChange={this.searchCoins}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check" />
          </span>
        </p>
        {bookList && (
          <div className="autocomplete-list">
            {bookList.map(book => (
              <Link
                to={`/book/${book.title.split(" ").join("_")}`}
                key={book.bookKey}
                onClick={this.clearCoins}
              >
                {book.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
