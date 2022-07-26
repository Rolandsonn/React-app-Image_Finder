import React, { Component } from "react";

import { createPortal } from "react-dom";
// axios.defaults.headers.common["Authorization"] =
//   "Bearer  28598653-ac578a657988498e7082adc71";
const header = document.getElementById("header");

export default class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { props, state } = this;
    props.onSubmit(state);

    this.setState({ query: "" });
    this.reset();
  };

  reset = () => {
    this.setState({
      query: "",
    });
  };

  render() {
    return createPortal(
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </form>
      </header>,
      header
    );
  }
}
