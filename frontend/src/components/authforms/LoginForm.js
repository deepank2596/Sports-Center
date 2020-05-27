import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../actions/authActions";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.userLogin(this.state.username, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/sports-center/" />;
    }
    const { username, password } = this.state;
    return (
      <React.Fragment>
        <div className="modal-dialog mt-5">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h4 className="modal-title">Sign In</h4>
            </div>
            <div className="modal-body pt-5">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      name="username"
                      value={username}
                      placeholder="Username"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      className="form-control"
                      name="password"
                      value={password}
                      placeholder="Password"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-lg"
                  >
                    Sign In
                  </button>
                </div>
                <p className="hint-text text-center">
                  <a href="#">Forgot Password?</a>
                </p>
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              Don't have an account? <Link to="/register">Create One</Link>
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

export default connect(mapStateToProps, { userLogin })(LoginForm);
