import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import {
  checkUserIdExist,
  getCurrentUser,
  getUserLogOut,
  login,
} from "./../services/userService";
import RegistrationPage from "./register";
class LoginForm extends Component {
  state = { showOption: "", viewPage: "email", show: true };

  handleAuthOption = (optionSel) => {
    this.setState({ showOption: optionSel, viewPage: "email" });
  };
  handleSubmit = async (values) => {
    let data = { email: values.email, password: values.password };
    try {
      let response = await login(data);

      if (response.data.success) {
        let { token, user } = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "admin") {
          window.location = "/dashboard";
        } else {
          window.location = "/";
        }
      } else {
        let msg = response.data.msg;
        alert(response.data.msg);
        this.setState({ msg });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handlePageView = (viewPage) => {
    this.setState({ viewPage: viewPage, showOption: "" });
  };
  setShow = () => {
    this.setState({ show: !this.state.show });
    if (this.props.oncloseLoginForm) {
      this.props.oncloseLoginForm(false);
    } else {
      if (this.props.match.params.option && this.props.match.params.type) {
        this.props.history.push(
          `/${this.props.match.params.option}/${this.props.match.params.type}`
        );
      } else {
        if (this.props.match.params.option)
          this.props.history.push(`/${this.props.match.params.option}`);
        else this.props.history.push(`/`);
      }
    }
  };
  checkUserExist = async (auth, errors) => {
    if (isNaN(auth) && !errors.email) {
      let email = auth;
      const patt =
        /^(([a-z]{1,}[0-9]{0,5}[@]{1}[a-z]{1,9}[.]{1}[a-z]{2,3})|([0-9]{10}))$/;
      //let check = patt.test(userId);
      if (patt.test(email)) {
        try {
          let data = { userId: email };
          let response = await checkUserIdExist(data);
          console.log(response);
          if (response.data.email === "Exist") {
            this.setState({ viewPage: "enterPassword" });
          } else {
            this.setState({ viewPage: "register" });
          }
        } catch (error) {}
      } else {
        alert("Invalid Email Format");
        return;
      }
    }
    if (!isNaN(auth) && !errors.phone1) {
      let phone1 = auth;

      const patt = /^(([0-9]{10}))$/;
      //let check = patt.test(userId);
      if (patt.test(phone1)) {
        alert("phone match");
        try {
          let data = { userId: phone1 };
          let response = await checkUserIdExist(data);

          if (response.data.phone1 === "Exist") {
            this.setState({ viewPage: "enterPassword" });
          } else {
            this.setState({ viewPage: "register" });
          }
        } catch (error) {}
      } else {
        alert("Invalid Mobile");
        return;
      }
    }
  };
  render() {
    const { viewPage, show } = this.state;

    return (
      <>
        <Formik
          initialValues={{
            email: "",
            password: "",
            phone1: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().required("required").email("Invalid Email"),
            password: Yup.string().required("Password is required"),
            phone1: Yup.string().required("Mobile is required"),
          })}
          onSubmit={this.handleSubmit}
        >
          {({ values, handleChange, errors }) => {
            return (
              <Form>
                {viewPage === "email" ? (
                  <Modal
                    className="my-model"
                    show={true}
                    onHide={() => this.setShow()}
                    centered={false}
                    size="md"
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <div className="row my-content">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 text-right py-2">
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              onClick={() => this.setShow()}
                            >
                              <path
                                class="fill_path"
                                fill="grey"
                                fill-rule="evenodd"
                                d="M16.293 1.592l-1.3-1.3-6.7 6.701-6.7-6.7-1.3 1.299 6.7 6.7-6.7 6.701 1.3 1.3 6.7-6.7 6.7 6.7 1.3-1.3-6.7-6.7z"
                              ></path>{" "}
                            </svg>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-12 text-center ">
                            <span
                              style={{
                                fontSize: "clamp(14px,2vw,20px)",
                                fontWeight: 500,
                                textTransform: "uppercase",
                              }}
                            >
                              India No. 1 Music App
                            </span>
                            <br />
                            <span
                              style={{
                                fontSize: "clamp(10px,2vw,12px)",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                color: "#afb0b1",
                              }}
                            >
                              Over 30 million songs to suit every mood and
                              occassion
                            </span>
                          </div>{" "}
                        </div>
                        <div className="row border-bottom mx-5 d-lg-block d-none">
                          <div className="col-12">
                            <div className="row py-3 ">
                              <div className="col  text-center px-5">
                                <div
                                  className="rounded-circle border border-danger ml-5 "
                                  style={{ width: 35, height: 35 }}
                                >
                                  <i className="fa fa-music text-danger mt-2"></i>
                                </div>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  Create Your Own PlayList
                                </span>
                              </div>
                              <div className="col  text-center">
                                <div
                                  className="rounded-circle border border-danger ml-5 "
                                  style={{ width: 35, height: 35 }}
                                >
                                  <i className="fa fa-music text-danger mt-2"></i>
                                </div>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  Share music with family and friends
                                </span>
                              </div>
                              <div className="col  text-center">
                                <div
                                  className="rounded-circle border border-danger ml-5 "
                                  style={{ width: 35, height: 35 }}
                                >
                                  <i className="fa fa-music text-danger mt-2"></i>
                                </div>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  Save your favourites
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row  mt-4 py-1">
                          <div className="col-12 text-center">
                            <button
                              className="btn"
                              style={{
                                width: 280,
                                height: 40,
                                borderRadius: 50,
                                fontWeight: 500,
                                backgroundColor: "#e72c30",
                                color: "white",
                              }}
                              onClick={() => this.handlePageView("mobile")}
                            >
                              Phone Number
                            </button>
                          </div>
                        </div>
                        <div className="row my-2">
                          <div className="col-12 d-flex">
                            <hr />
                            <span>or continue with</span>
                            <hr />
                          </div>
                        </div>
                        <div className="row mt-5 fixed bottom text-center">
                          <div className="col-12 col-lg-6 m-auto">
                            <div className="row">
                              {errors.email ? (
                                <div className="col-12 mb-1  text-danger text-left ">
                                  {errors.email}
                                </div>
                              ) : (
                                <div className="col-12 mb-1 py-1 text-danger text-left "></div>
                              )}
                              {this.state.showOption === "email" ? (
                                <div className="col-12">
                                  <Field
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                  />
                                  <i
                                    className="fa fa-arrow-right"
                                    style={{
                                      position: "absolute",
                                      top: 10,
                                      right: 25,
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.checkUserExist(values.email, errors)
                                    }
                                  ></i>

                                  <span
                                    className="d-block text-left mb-5"
                                    style={{ fontSize: 13 }}
                                    onClick={() => this.handleAuthOption("")}
                                  >
                                    BACK
                                  </span>
                                </div>
                              ) : (
                                <>
                                  <div className="col-4">
                                    <button
                                      className="btn"
                                      id="facebook-login"
                                      style={{ width: 80 }}
                                    >
                                      <span class="_info">
                                        <svg viewBox="0 0 50 50">
                                          {" "}
                                          <g fill="none" fill-rule="evenodd">
                                            {" "}
                                            <circle
                                              fill="#4267B2"
                                              cx="25"
                                              cy="25"
                                              r="25"
                                            ></circle>{" "}
                                            <path
                                              d="M27.294 24.977V37h-4.943V24.977H20V20.75h2.351v-2.734c0-1.955.923-5.017 4.987-5.017l3.662.015v4.102h-2.657c-.436 0-1.048.219-1.048 1.152v2.486h3.694l-.432 4.222h-3.263z"
                                              fill="#FFF"
                                            ></path>{" "}
                                          </g>{" "}
                                        </svg>
                                        Facebook
                                      </span>
                                    </button>
                                  </div>
                                  <div className="col-4">
                                    <button
                                      className="btn"
                                      id="google-login"
                                      style={{ width: 80 }}
                                    >
                                      <svg viewBox="0 0 52 52">
                                        {" "}
                                        <g
                                          transform="translate(1 1)"
                                          fill="none"
                                          fill-rule="evenodd"
                                        >
                                          {" "}
                                          <circle
                                            stroke-opacity=".3"
                                            stroke="#000"
                                            fill="#FFF"
                                            cx="25"
                                            cy="25"
                                            r="25"
                                          ></circle>{" "}
                                          <path
                                            d="M36.52 25.273c0-.851-.076-1.67-.218-2.455H25v4.642h6.458a5.52 5.52 0 01-2.394 3.622v3.01h3.878c2.269-2.088 3.578-5.165 3.578-8.82z"
                                            fill="#4285F4"
                                          ></path>{" "}
                                          <path
                                            d="M25 37c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947h-4.009v3.11A11.995 11.995 0 0025 37z"
                                            fill="#34A853"
                                          ></path>{" "}
                                          <path
                                            d="M18.285 27.28A7.213 7.213 0 0117.91 25c0-.79.136-1.56.376-2.28v-3.11h-4.009A11.995 11.995 0 0013 25c0 1.936.464 3.77 1.276 5.39l4.01-3.11z"
                                            fill="#FBBC05"
                                          ></path>{" "}
                                          <path
                                            d="M25 17.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C30.951 14.19 28.235 13 25 13c-4.69 0-8.75 2.69-10.724 6.61l4.01 3.11c.943-2.836 3.589-4.947 6.714-4.947z"
                                            fill="#EA4335"
                                          ></path>{" "}
                                        </g>{" "}
                                      </svg>
                                      <span class="_info">Google</span>
                                    </button>
                                  </div>
                                  <div className="col-4">
                                    <button
                                      className="btn"
                                      style={{ width: 80 }}
                                      onClick={() =>
                                        this.handleAuthOption("email")
                                      }
                                    >
                                      <svg viewBox="0 0 52 52">
                                        {" "}
                                        <g
                                          transform="translate(1 1)"
                                          fill="none"
                                          fill-rule="evenodd"
                                        >
                                          {" "}
                                          <circle
                                            stroke-opacity=".3"
                                            stroke="#000"
                                            fill="#FFF"
                                            cx="25"
                                            cy="25"
                                            r="25"
                                          ></circle>{" "}
                                          <g
                                            fill="#000"
                                            fill-opacity=".4"
                                            fill-rule="nonzero"
                                          >
                                            {" "}
                                            <path d="M33.16 18H16.84c-.54 0-.84.37-.84.906v.453c0 .103.04.185.12.247l8.68 5.703c.14.082.32.082.44 0l8.64-5.806a.296.296 0 00.12-.247v-.35c0-.535-.3-.906-.84-.906z"></path>{" "}
                                            <path d="M33.78 21.397l-8.38 5.6c-.14.082-.22.124-.38.124a.588.588 0 01-.36-.124l-8.44-5.518c-.1-.061-.22 0-.22.124v9.409c0 .556.3.906.84.906h16.32c.54 0 .84-.37.84-.906V21.52c0-.124-.12-.206-.22-.124z"></path>{" "}
                                          </g>{" "}
                                        </g>{" "}
                                      </svg>
                                      <span class="_info">Email</span>
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                ) : (
                  ""
                )}
                {viewPage === "mobile" ? (
                  <Modal
                    className="my-model"
                    show={true}
                    onHide={() => this.setShow()}
                    centered={false}
                    size="md"
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <div className="row my-content">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 text-right py-2">
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              onClick={() => this.setShow()}
                            >
                              <path
                                class="fill_path"
                                fill="grey"
                                fill-rule="evenodd"
                                d="M16.293 1.592l-1.3-1.3-6.7 6.701-6.7-6.7-1.3 1.299 6.7 6.7-6.7 6.701 1.3 1.3 6.7-6.7 6.7 6.7 1.3-1.3-6.7-6.7z"
                              ></path>{" "}
                            </svg>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-12 text-center ">
                            <span
                              style={{
                                fontSize: "clamp(14px,2vw,20px)",
                                fontWeight: 500,
                                textTransform: "uppercase",
                              }}
                            >
                              India No. 1 Music App
                            </span>
                            <br />
                            <span
                              style={{
                                fontSize: "clamp(10px,2vw,12px)",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                color: "#afb0b1",
                              }}
                            >
                              Over 30 million songs to suit every mood and
                              occassion
                            </span>
                          </div>{" "}
                        </div>
                        <div className="row border-bottom mx-5 d-lg-block d-none">
                          <div className="col-12">
                            <div className="row py-3 ">
                              <div className="col  text-center px-5">
                                <div
                                  className="rounded-circle border border-danger ml-5 "
                                  style={{ width: 35, height: 35 }}
                                >
                                  <i className="fa fa-music text-danger mt-2"></i>
                                </div>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  Create Your Own PlayList
                                </span>
                              </div>
                              <div className="col  text-center">
                                <div
                                  className="rounded-circle border border-danger ml-5 "
                                  style={{ width: 35, height: 35 }}
                                >
                                  <i className="fa fa-music text-danger mt-2"></i>
                                </div>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  Share music with family and friends
                                </span>
                              </div>
                              <div className="col  text-center">
                                <div
                                  className="rounded-circle border border-danger ml-5 "
                                  style={{ width: 35, height: 35 }}
                                >
                                  <i className="fa fa-music text-danger mt-2"></i>
                                </div>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  Save your favourites
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row  mt-4 py-1">
                          <div className="col-12 text-center">
                            <Field
                              type="number"
                              name="phone1"
                              className="btn btn-white border border-danger"
                              style={{
                                width: 280,
                                height: 40,
                                borderRadius: 50,
                                fontWeight: 500,
                              }}
                              value={values.phone1}
                              onChange={handleChange}
                              placeholder="Enter your phone"
                            />
                          </div>
                        </div>
                        <div className="row my-2">
                          <div className="col-12 d-flex">
                            <hr />
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                this.checkUserExist(values.phone1, errors)
                              }
                            >
                              Submit
                            </button>
                            <hr />
                          </div>
                        </div>
                        <div className="row mt-5 fixed bottom text-center">
                          <div className="col-12 col-lg-6 m-auto">
                            <div className="row">
                              {errors.email ? (
                                <div className="col-12 mb-1  text-danger text-left ">
                                  {errors.email}
                                </div>
                              ) : (
                                <div className="col-12 mb-1 py-1 text-danger text-left "></div>
                              )}
                              {this.state.showOption === "email" ? (
                                <div className="col-12">
                                  <Field
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                  />
                                  <i
                                    className="fa fa-arrow-right"
                                    style={{
                                      position: "absolute",
                                      top: 10,
                                      right: 25,
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.checkUserExist(values.email, errors)
                                    }
                                  ></i>

                                  <span
                                    className="d-block text-left mb-5"
                                    style={{ fontSize: 13 }}
                                    onClick={() => this.handleAuthOption("")}
                                  >
                                    BACK
                                  </span>
                                </div>
                              ) : (
                                <>
                                  <div className="col-4">
                                    <button
                                      className="btn"
                                      id="facebook-login"
                                      style={{ width: 80 }}
                                    >
                                      <span class="_info">
                                        <svg viewBox="0 0 50 50">
                                          {" "}
                                          <g fill="none" fill-rule="evenodd">
                                            {" "}
                                            <circle
                                              fill="#4267B2"
                                              cx="25"
                                              cy="25"
                                              r="25"
                                            ></circle>{" "}
                                            <path
                                              d="M27.294 24.977V37h-4.943V24.977H20V20.75h2.351v-2.734c0-1.955.923-5.017 4.987-5.017l3.662.015v4.102h-2.657c-.436 0-1.048.219-1.048 1.152v2.486h3.694l-.432 4.222h-3.263z"
                                              fill="#FFF"
                                            ></path>{" "}
                                          </g>{" "}
                                        </svg>
                                        Facebook
                                      </span>
                                    </button>
                                  </div>
                                  <div className="col-4">
                                    <button
                                      className="btn"
                                      id="google-login"
                                      style={{ width: 80 }}
                                    >
                                      <svg viewBox="0 0 52 52">
                                        {" "}
                                        <g
                                          transform="translate(1 1)"
                                          fill="none"
                                          fill-rule="evenodd"
                                        >
                                          {" "}
                                          <circle
                                            stroke-opacity=".3"
                                            stroke="#000"
                                            fill="#FFF"
                                            cx="25"
                                            cy="25"
                                            r="25"
                                          ></circle>{" "}
                                          <path
                                            d="M36.52 25.273c0-.851-.076-1.67-.218-2.455H25v4.642h6.458a5.52 5.52 0 01-2.394 3.622v3.01h3.878c2.269-2.088 3.578-5.165 3.578-8.82z"
                                            fill="#4285F4"
                                          ></path>{" "}
                                          <path
                                            d="M25 37c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947h-4.009v3.11A11.995 11.995 0 0025 37z"
                                            fill="#34A853"
                                          ></path>{" "}
                                          <path
                                            d="M18.285 27.28A7.213 7.213 0 0117.91 25c0-.79.136-1.56.376-2.28v-3.11h-4.009A11.995 11.995 0 0013 25c0 1.936.464 3.77 1.276 5.39l4.01-3.11z"
                                            fill="#FBBC05"
                                          ></path>{" "}
                                          <path
                                            d="M25 17.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C30.951 14.19 28.235 13 25 13c-4.69 0-8.75 2.69-10.724 6.61l4.01 3.11c.943-2.836 3.589-4.947 6.714-4.947z"
                                            fill="#EA4335"
                                          ></path>{" "}
                                        </g>{" "}
                                      </svg>
                                      <span class="_info">Google</span>
                                    </button>
                                  </div>
                                  <div className="col-4">
                                    <button
                                      className="btn"
                                      style={{ width: 80 }}
                                      onClick={() =>
                                        this.handleAuthOption("email")
                                      }
                                    >
                                      <svg viewBox="0 0 52 52">
                                        {" "}
                                        <g
                                          transform="translate(1 1)"
                                          fill="none"
                                          fill-rule="evenodd"
                                        >
                                          {" "}
                                          <circle
                                            stroke-opacity=".3"
                                            stroke="#000"
                                            fill="#FFF"
                                            cx="25"
                                            cy="25"
                                            r="25"
                                          ></circle>{" "}
                                          <g
                                            fill="#000"
                                            fill-opacity=".4"
                                            fill-rule="nonzero"
                                          >
                                            {" "}
                                            <path d="M33.16 18H16.84c-.54 0-.84.37-.84.906v.453c0 .103.04.185.12.247l8.68 5.703c.14.082.32.082.44 0l8.64-5.806a.296.296 0 00.12-.247v-.35c0-.535-.3-.906-.84-.906z"></path>{" "}
                                            <path d="M33.78 21.397l-8.38 5.6c-.14.082-.22.124-.38.124a.588.588 0 01-.36-.124l-8.44-5.518c-.1-.061-.22 0-.22.124v9.409c0 .556.3.906.84.906h16.32c.54 0 .84-.37.84-.906V21.52c0-.124-.12-.206-.22-.124z"></path>{" "}
                                          </g>{" "}
                                        </g>{" "}
                                      </svg>
                                      <span class="_info">Email</span>
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                ) : (
                  ""
                )}
                {viewPage === "enterPassword" ? (
                  <Modal
                    className="my-model"
                    show={true}
                    onHide={() => this.setShow()}
                    centered={false}
                    size="md"
                    dialogClassName="modal-90w"
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <div className="row my-content">
                      <div className="col-12">
                        <div className="row text-center">
                          <div className="col-12">
                            <div className="row pb-5 pt-2">
                              <div className="col-6 text-left">
                                <i
                                  className="fa fa-arrow-left"
                                  onClick={() => this.handlePageView("email")}
                                ></i>
                              </div>
                              <div className="col-6 text-right">
                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  onClick={() => this.handlePageView("email")}
                                >
                                  <path
                                    class="fill_path"
                                    fill="grey"
                                    fill-rule="evenodd"
                                    d="M16.293 1.592l-1.3-1.3-6.7 6.701-6.7-6.7-1.3 1.299 6.7 6.7-6.7 6.701 1.3 1.3 6.7-6.7 6.7 6.7 1.3-1.3-6.7-6.7z"
                                  ></path>{" "}
                                </svg>
                              </div>
                              <div className="col-lg-5 col-md-8 col-sm-12 m-auto ">
                                <div className="row mb-4 ">
                                  <div className="col-12">
                                    <span
                                      className="d-block mb-4 mt-5"
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        wordSpacing: 5,

                                        textTransform: "uppercase",
                                        color: "#afb0b1",
                                      }}
                                    >
                                      Enter Your Password To Proceed
                                    </span>
                                    <Field
                                      type="password"
                                      name="password"
                                      className="form-control"
                                      value={values.password}
                                      onChange={handleChange}
                                      placeholder="Enter Password"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <button
                                      className="btn btn-danger "
                                      style={{ width: 150, borderRadius: 50 }}
                                      type="submit"
                                      onClick={() => this.handleSubmit(values)}
                                    >
                                      SIGN IN
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-4">
                                  <div className="col-12">
                                    <span>Forgot Password</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                ) : (
                  ""
                )}
                {viewPage === "register" ? (
                  values.email ? (
                    <RegistrationPage email={values.email} {...this.props} />
                  ) : (
                    <RegistrationPage phone1={values.phone1} {...this.props} />
                  )
                ) : (
                  ""
                )}
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default LoginForm;
