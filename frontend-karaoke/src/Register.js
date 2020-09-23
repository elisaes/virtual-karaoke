import React, { Component } from "react";

class Register extends Component {
  state = {
    name: "",
    artistName: "",
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  clicked = () => {
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label for="artistName">Artist Name</label>
            <input
              type="text"
              className="form-control"
              id="artistName"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="form-group col-md-6">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.clicked}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
