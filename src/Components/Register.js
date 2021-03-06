import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  CardBody,
  Card,
  CardHeader,
  Grid
} from "mdbreact";
import "./Custom.css";
import loader from "./loader.gif";
import { Link } from "react-router-dom";
var md5 = require("md5");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      obj: {},
      name: "",
      data: "",
      isLoading: false,
      loader: false,
      errors: "",
      signup: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.state.registerFunction = this.registerFunction.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  registerFunction(e) {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errors: "password & confirm password are not same"
      });
      e.preventDefault();
      return;
    }
    e.preventDefault();
    this.setState({
      loader: true
    });

    this.state.obj["email"] = this.state.email;
    this.state.obj["password"] = md5(this.state.password);
    this.state.obj["name"] = this.state.name;

    var postData = this.state.obj;
    var that = this;

    fetch(`https://pure-badlands-16289.herokuapp.com/api/users/sign_up`, {
      method: "post",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        that.setState({
          loader: false
        });
        if (data.error === "Email already registed!") {

          that.setState({
            errors: "Email already registed!"
          })
          return;
        }
        else {

          if (data.data.message === "User saved succesfully") {
            that.setState({
              signup: true,

            });
          }
          else {
            alert("Something went wrong please try again")
          }
        }
      });
  }

  render() {
    if (this.state.loader) {
      return (
        <div class="text-center">
          <img
            className="home-img"
            style={{
              height: "80px",
              width: "100px",
              marginTop: "200px",
              justifyContent: "center",
              alignItems: "center"
            }}
            src={loader}
            className="img-responsive "
          />
        </div>
      );
    }

    return (
      <div class="contact-body">
        <div class="row">
          <div class="col-md-3" />
          <div class="col-md-8" style={{paddingLeft: '0', paddingRight: '0'}}>
            <Container>
              <Row>
                <Col md="10">
                  <Card>
                    <CardBody>
                      {!this.state.signup &&
                        <form onSubmit={this.registerFunction.bind(this)}>
                          <p className="h4 text-center py-4">Sign Up </p>
                          <div className="grey-text">
                            <Input
                              label="Name *"
                              icon="user"
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              name="name"
                              value={this.state.name}
                              onChange={this.handleChange}
                              required
                            />
                            <Input
                              label="Email *"
                              icon="envelope"
                              group
                              type="email"
                              validate
                              error="wrong"
                              success="right"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                              required
                            />
                            <Input
                              label="Password *"
                              icon="lock"
                              group
                              type="password"
                              validate
                              value={this.state.password}
                              name="password"
                              onChange={this.handleChange}
                              required
                            />
                            <Input
                              label="Confirm Password *"
                              icon="lock"
                              group
                              type="password"
                              validate
                              value={this.state.confirmPassword}
                              name="confirmPassword"
                              onChange={this.handleChange}
                              required
                            />
                            <Input
                              label="Mobile"
                              icon="mobile"
                              group
                              type="number"
                              className="quantity"
                              value={this.state.mobile}
                              name="mobile"
                              onChange={this.handleChange}
                            />
                            {this.state.errors != "" &&
                              <div class="alert alert-danger" role="alert">
                                {this.state.errors}
                              </div>}
                          </div>
                          <div className="text-center py-4 mt-3">
                          <Button class="btn" style={{ borderRadius: "25px", width: "125px", height: "50px", backgroundColor: "#2E86C1", color: "white", textTransform: "none"}} type="submit">
                              SignUp
                            </Button>
                         
                          </div>
                          <p className="font-small grey-text d-flex justify-content-center">
                            Already have an account?&nbsp;  
                            <Link to="/login">Sign in</Link>
                          </p>
                        </form>
                      }
                      {this.state.signup &&
                        <div class="text-center">
                          <h3>Account Activation </h3>
                          <div class="alert alert-info" role="alert">
                            Your Account is created, it will activate after you click on verification link you got in email address.
                    </div>
                        </div>

                      }
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
