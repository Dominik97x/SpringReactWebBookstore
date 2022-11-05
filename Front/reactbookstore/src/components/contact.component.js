import React from "react";
import emailjs from "emailjs-com";

// styling
import "../App.css";

// auth
// import UserService from "../services/user.service";

// components & assets
import Rocket from "../assets/rocket_contact.png";

export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_bookstore",
        e.target,
        "user_dCoS9QNVE44mbKqtLhdJO"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div className="container contact-form">
      <div className="contact-image">
        <img src={Rocket} alt="rocket_contact" />
      </div>
      <form onSubmit={sendEmail}>
        <h3>Ask Us A Question</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your name *"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email *"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Your Phone Number *"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Topic *"
              />
            </div>
            <div class="form-group">
              <input
                type="submit"
                className="btnContact"
                value="Send A Message"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <textarea
                rows="8"
                name="message"
                className="form-control"
                placeholder="Your Message... *"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
