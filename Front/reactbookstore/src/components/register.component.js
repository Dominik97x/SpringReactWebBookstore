import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Niepoprawny format adresu email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Nazwa użytkownika musi zawierać od 3 do 20 znaków.
      </div>
    );
  }
};

// const vconfirmpassword = (value) => {
//   if (value != vpassword.value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Hasła muszą być identyczne
//       </div>
//     );
//   }
// };

// const vconfirmpassword = (value) => {
//   return (
//     <div className="alert alert-danger" role="alert">
//       {value}
//     </div>
//   );
// };

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Hasło musi zawierać od 6 do 40 znaków.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeconfirmPassword = this.onChangeconfirmPassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      confSuccess: false,
      message: "",
      input: {},
      msg: {},
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeconfirmPassword(e) {
    var inputpwd = this.state.input;
    inputpwd[e.target.name] = e.target.value;
    this.setState({
      inputpwd,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  valid2() {
    var msg = {};
    if (this.state.password !== this.state.input["confirmPassword"]) {
      msg["password"] = "Passwords are not matching!";
    } else {
      msg["confirmPassword"] = "Password are same.";
    }
    this.setState({
      msg: msg,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      confSuccess: false,
    });

    this.form.validateAll();

    if (this.valid2()) {
      var input = {};
      input["password"] = "";
      input["confirmPassword"] = "";
    } else {
      this.setState({
        confSuccess: true,
      });
    }

    if (
      this.checkBtn.context._errors.length === 0 &&
      this.state.confSuccess !== false
    ) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label>Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={this.state.input.confirmPassword}
                    onChange={this.onChangeconfirmPassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <strong>
                  <div className="text-danger">{this.state.msg.password}</div>
                </strong>

                <div className="form-group mt-2">
                  <button className="btn btn-primary btn-block">
                    Create account
                  </button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
