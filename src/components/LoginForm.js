import React, { Component } from "react";
import "../styles/LoginForm.css";

// SOURCE https://codepen.io/brianmontanaweb/pen/ZQojEd
export default class LoginForm extends Component {
  handleHomeClick = () => {
    this.props.history.push("/");
  };

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      current_user: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  // Authorization: `Bearer <token>`,

  handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: this.state
      })
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState(
          {
            current_user: data["user"]
          },
          () => {
            localStorage.setItem("current_user", data["jwt"]);
            this.props.history.push({
              pathname: "/profile",
              userType: Object.keys(data["user"])[0]
            });
          }
        );
      });
  };

  render() {
    return (
      <div>
        <div className="login-container">
          <form
            onSubmit={event => this.handleSubmit(event)}
            className="form-login"
          >
            <ul className="login-nav">
              <li className="login-nav__item active">
                <a>Sign In</a>
              </li>
              <li className="login-nav__item">
                <a onClick={this.handleHomeClick}>Sign Up</a>
              </li>
            </ul>
            <label className="login__label">Username</label>
            <input
              id="login-input-user"
              value={this.state.username}
              className="login__input"
              name="username"
              onChange={this.handleChange}
              type="text"
            />
            <label className="login__label">Password</label>
            <input
              id="login-input-password"
              value={this.state.password}
              className="login__input"
              name="password"
              onChange={this.handleChange}
              type="password"
            />
            <label className="login__label--checkbox">
              <input
                id="login-sign-up"
                type="checkbox"
                className="login__input--checkbox"
              />
              Remember me
            </label>
            <button
              onClick={event => this.handleSubmit(event)}
              className="login__submit"
            >
              Sign in
            </button>
          </form>
          {/* TODO */}
          <a className="login__forgot">Forgot Password?</a>
        </div>
      </div>
    );
  }
}