import React, { Component } from "react";
import {  NavLink } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="container-fluid text-center">
        <div className="jumbotron jumbotron-fluid">
          <div className="title">WELCOME TO VIRTUAL KARAOKE</div>
        </div>

        <NavLink to="/Register/">
          <div className="button">
            <button type="button" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>
        </NavLink>
        <NavLink to="Login">
          <div className="button">
            <button type="button" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
        </NavLink>
        <NavLink to="Guest">
          <div className="button">
            <button type="button" className="btn btn-primary btn-lg">
              Guest
            </button>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Home;
