import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addContactData, contactReset } from "../features/contact/contactSlice";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const [formFields, setFormFields] = useState({
    contact_username: "",
    contact_email: "",
    contact_message: "",
  });

  const { contact_username, contact_email, contact_message } = formFields;
  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    contact,
    contactError,
    contactSuccess,
    contactMessage,
    contactLoading,
  } = useSelector((state) => state.contact);
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      toast.error("User not authenticated");
      return;
    }

    const contactData = {
      ...formFields,
      user: user._id,
    };

    dispatch(addContactData(contactData));
  };

  useEffect(() => {
    if (contactSuccess) {
      toast.success("Request added successfully");
      dispatch(contactReset());
    } else if (contactError) {
      toast.error(contactMessage);
      dispatch(contactReset());
    }
  }, [contactSuccess, contactError, dispatch]);

  return (
    <>
      <Header />
      <Helmet title="Contact">
        <CommonSection title="Contact" />
        <section>
          <Container>
            <Row>
              <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Get In Touch</h6>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Your Name"
                      name="contact_username"
                      value={contact_username}
                      onChange={handleChange}
                      type="text"
                      style={{
                        backgroundColor: "#141414",
                        color: "white",
                        border: "none",
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="contact__form">
                    <Input
                      placeholder="Email"
                      name="contact_email"
                      value={contact_email}
                      onChange={handleChange}
                      type="email"
                      style={{
                        backgroundColor: "#141414",
                        color: "white",
                        border: "none",
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="contact__form">
                    <textarea
                      rows="5"
                      placeholder="Message"
                      name="contact_message"
                      value={contact_message}
                      onChange={handleChange}
                      className="textarea"
                      style={{
                        backgroundColor: "#141414",
                        color: "white",
                        border: "none",
                      }}
                    ></textarea>
                  </FormGroup>

                  <button className="contact__btn" type="submit">
                    Send Message
                  </button>
                </Form>
              </Col>

              <Col lg="5" md="5">
                <div className="contact__info">
                  <h6 className="fw-bold">Contact Information</h6>
                  <p className="section__description mb-0">
                    6th road Rawalpindi Islamabad , Pakistan
                  </p>
                  <div className=" d-flex align-items-center gap-2">
                    <h6 className="fs-6 mb-0">Phone:</h6>
                    <p className="section__description mb-0">
                      +92 318 1904 193
                    </p>
                  </div>

                  <div className=" d-flex align-items-center gap-2">
                    <h6 className="mb-0 fs-6">Email:</h6>
                    <p className="section__description mb-0">
                      ahadqureshi16756@gmail.com
                    </p>
                  </div>

                  <h6 className="fw-bold mt-4">Follow Us</h6>

                  <div className=" d-flex align-items-center gap-4 mt-3">
                    {socialLinks.map((item, index) => (
                      <Link
                        to={item.url}
                        key={index}
                        className="social__link-icon"
                      >
                        <i class={item.icon}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
      <Footer />
    </>
  );
};

export default Contact;
