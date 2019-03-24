import books from "./books-test-collection";
import FuzzySearch from "fuzzy-search";
const booksList = books();

const searcher = new FuzzySearch(booksList, ["title"], {
	caseSensitive: false
});

// window.searcher = searcher;

export const fetchBooks = (pageNo = 1) =>
	new Promise(resolve => {
		const startIndex = (pageNo - 1) * 12;
		const endIndex = pageNo * 12;
		resolve(booksList.slice(startIndex, endIndex));
	});

export const fetchBook = bookTitle =>
	new Promise(resolve => {
		bookTitle = bookTitle.split("_").join(" ");
		resolve(booksList.filter(book => book.title === bookTitle)[0]);
	});

export const searchBooks = text =>
	new Promise(resolve => {
		resolve(searcher.search(text));
	});
