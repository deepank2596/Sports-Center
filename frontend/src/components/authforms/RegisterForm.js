import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import { createMessage } from "../../actions/messageActions";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, password2, email } = this.state;
    if (password == password2) {
      const newUser = { username, password, email };
      console.log(newUser);
      this.props.register(newUser);
    } else {
      this.props.createMessage({
        passwordMismatch: "Password didn't match !!",
      });
    }
  };

  render() {
    const {
      first_name,
      last_name,
      username,
      password,
      password2,
      email,
    } = this.state;
    if (this.props.isAuthenticated) {
      return <Redirect to="/sports-center/" />;
    }
    return (
      <React.Fragment>
        <div className="container w-50 mt-5 text-center">
          <div className="modal-content p-3 border border-primary rounded">
            <form onSubmit={this.handleSubmit}>
              <h2>Register</h2>
              <p className="hint-text">
                Create your account. It's free and only takes a minute.
              </p>
              <div className="form-group">
                <div className="row justify-content-around">
                  <div className="col-xs-6">
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      onChange={this.handleChange}
                      value={first_name}
                      placeholder="First Name"
                      required="required"
                    />
                  </div>
                  <div className="col-xs-6">
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      onChange={this.handleChange}
                      value={last_name}
                      placeholder="Last Name"
                      required="required"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="username"
                  className="form-control"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  placeholder="Username"
                  required="required"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  placeholder="Email"
                  required="required"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                  placeholder="Password"
                  required="required"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  onChange={this.handleChange}
                  value={password2}
                  placeholder="Confirm Password"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label className="checkbox-inline">
                  <input type="checkbox" required="required" /> I accept the{" "}
                  <a href="#">Terms of Use</a> &amp;{" "}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-block"
                >
                  Register Now
                </button>
              </div>
            </form>
            <div className="text-center">
              Already have an account? <a href="#">Sign in</a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createMessage, register })(
  RegisterForm
);
