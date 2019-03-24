import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Books from "./Books";
import BookDeatail from "./BookDetail";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header />
					<Route exact path="/" component={Books} />
					<Route exact path="/book/:bookId" component={BookDeatail} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
