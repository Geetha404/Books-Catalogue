import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

class Header extends Component {
	render() {
		return (
			<header className="container">
				<Link to="/">
					<h1>Books Catalogue</h1>
				</Link>
				<Search />
			</header>
		);
	}
}

export default Header;
