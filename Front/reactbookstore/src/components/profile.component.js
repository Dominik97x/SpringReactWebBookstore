import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

import { Card, Form, Accordion, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faUser } from "@fortawesome/free-solid-svg-icons";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      daneUzytkownika: "User Data",
      historiaZakupow: "Purchase history",
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron bg-light">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>

        <div>
          <Accordion>
            <Card className={"border border-dark bg-dark text-white"}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <FontAwesomeIcon className="mr-1" icon={faUser} />
                {this.state.daneUzytkownika}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Form onSubmit={this.submitBook} id="bookFormId">
                  <Card.Body>
                    <Row>
                      <Col>
                        <p class="font-weight-normal h5">Nick:</p>
                      </Col>
                      <Col>
                        <p class="font-weight-normal h5">
                          {currentUser.username}
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <p class="font-weight-normal h5">E-mail:</p>
                      </Col>
                      <Col>
                        <p class="font-weight-normal h5">{currentUser.email}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Form>
              </Accordion.Collapse>

              <Accordion.Toggle as={Card.Header} eventKey="1">
                <FontAwesomeIcon className="mr-1" icon={faHistory} />
                {this.state.historiaZakupow}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    );
  }
}
