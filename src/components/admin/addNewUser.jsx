import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../services/userService";
import Modal from "react-bootstrap/Modal";
class AddNewUser extends Component {
  state = {
    authType: null,
    userId: "",
    view: "register",
    msg: null,
    spinner: false,
  };

  handleSubmit = async (values, { ...rest }) => {
    console.log(values);
    try {
      this.setState({ spinner: true });
      let data = { ...values, role: "user" };
      let response = await registerUser(data);
      this.setState({ spinner: false });
      console.log(response);
      if (response.data.success === true) {
        alert("New User Added");
      }
      this.setState({ msg: response.data.msg });
    } catch (error) {}
  };
  setShow = () => {
    this.setState({ show: !this.state.show });
    if (this.props.oncloseLoginForm) {
      this.props.oncloseLoginForm(false);
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <>
        <Modal
          className="my-model"
          show={true}
          onHide={() => this.setShow()}
          centered={false}
          size="md"
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Formik
            initialValues={{
              email: "",
              dob: "",
              gender: "",
              terms: "",
              password: "",
              name: "",
            }}
            onSubmit={this.handleSubmit}
            validationSchema={Yup.object({
              dob: Yup.string().required("Date Of Borth is required"),
              password: Yup.string().required("Password is required"),
              name: Yup.string().required("name"),
              email: Yup.string()
                .required("Enter Email Id")
                .email("Inavlid Email"),
            })}
          >
            {({ values, handleChange, errors, touched }) => {
              return (
                <Form>
                  <div
                    className="row my-content py-4"
                    style={{
                      position: "relative",
                      top: 0,
                      right: "auto",
                      left: 0,
                    }}
                  >
                    <div className="col-12 text-right py-1">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        onClick={() => this.setShow()}
                      >
                        <path
                          className="fill_path"
                          fill="grey"
                          fillRule="evenodd"
                          d="M16.293 1.592l-1.3-1.3-6.7 6.701-6.7-6.7-1.3 1.299 6.7 6.7-6.7 6.701 1.3 1.3 6.7-6.7 6.7 6.7 1.3-1.3-6.7-6.7z"
                        ></path>{" "}
                      </svg>
                    </div>{" "}
                    <div className="col-12">
                      <div className="row mt-1 mb-2">
                        <div className="col-12 text-center">
                          <span
                            style={{
                              fontSize: 20,
                              color: "#333333",
                              fontWeight: 500,
                              letterSpacing: 2,
                            }}
                          >
                            Add New User
                          </span>
                          <br />
                          <span
                            style={{
                              fontSize: 14,
                              color: "#333333",
                              fontWeight: 500,
                              textTransform: "uppercase",
                              letterSpacing: 2,
                            }}
                          >
                            Registration Form
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="row px-4">
                            <div className="col-12 text-center my-1">
                              <div className="row " id="name">
                                <div className="col-12 d-flex border px-0 my-2 text-center">
                                  <Field
                                    type="text"
                                    style={{
                                      border: "none",
                                      borderRadius: 0,
                                    }}
                                    className="form-control text-muted bg-white m-auto"
                                    placeholder="Whats Your Name?"
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-12">
                                  <div
                                    className="row text-left text-danger"
                                    style={{
                                      fontSize: 10,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {this.state.msg ? (
                                      <div className="col-12 p-0 mr-1 ">
                                        {this.state.msg}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {errors.name ? (
                                      <div className="col-12 p-0 mr-1 ">
                                        {errors.name}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row " id="email">
                                <div className="col-12 d-flex border px-0 my-2 text-center">
                                  <Field
                                    type="text"
                                    style={{
                                      border: "none",
                                      borderRadius: 0,
                                    }}
                                    className="form-control text-muted bg-white m-auto"
                                    placeholder="Enter Email Address"
                                    value={values.email}
                                    name="email"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-12">
                                  <div
                                    className="row text-left text-danger"
                                    style={{
                                      fontSize: 10,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {errors.email ? (
                                      <div className="col-12 p-0 mr-1 ">
                                        {errors.email}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row " id="password">
                                <div className="col-12 d-flex border px-0 my-2 text-center">
                                  <br />
                                  <Field
                                    type="password"
                                    style={{
                                      border: "none",
                                      borderRadius: 0,
                                    }}
                                    className="form-control text-muted bg-white m-auto"
                                    placeholder="Enter Password"
                                    value={values.password}
                                    name="password"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-12">
                                  <div
                                    className="row text-left text-danger"
                                    style={{
                                      fontSize: 10,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {errors.password && touched.password ? (
                                      <div className="col-12 p-0 mr-1 ">
                                        {errors.password}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row " id="dob">
                                <div className="col-12 d-flex border px-0 my-2 text-center">
                                  <br />
                                  <Field
                                    type="date"
                                    style={{
                                      border: "none",
                                      borderRadius: 0,
                                    }}
                                    className="form-control text-muted bg-white m-auto"
                                    placeholder="Date Of Birth"
                                    value={values.dob}
                                    name="dob"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-12">
                                  <div
                                    className="row text-left text-danger"
                                    style={{
                                      fontSize: 10,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {errors.dob && touched.dob ? (
                                      <div className="col-12 p-0 mr-1 ">
                                        {errors.dob}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row" id="gender">
                                <div className="col-6 text-left pl-0">
                                  <div className="form-check">
                                    <Field
                                      className="form-check-input "
                                      type="radio"
                                      name="gender"
                                      value="male"
                                      checked={"male" === values.gender}
                                      onChange={handleChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="male"
                                    >
                                      Male
                                    </label>
                                  </div>
                                </div>
                                <div className="col-6 text-right pr-0">
                                  <div className="form-check">
                                    <Field
                                      className="form-check-input "
                                      type="radio"
                                      name="gender"
                                      value="female"
                                      checked={"female" === values.gender}
                                      onChange={handleChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="female"
                                    >
                                      Female
                                    </label>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="row" id="terms">
                                <div className="col-12 text-left pl-0">
                                  <div className="form-check">
                                    <Field
                                      type="checkbox"
                                      className="form-check-input"
                                      name="terms"
                                      onChange={handleChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="terms"
                                      style={{ fontSize: 12 }}
                                    >
                                      I agree to Gaana's{" "}
                                      <a>Terms & Conditions</a>
                                    </label>
                                  </div>
                                </div>
                              </div> */}
                              <div className="row " id="button">
                                <div className="col-12 mt-4 px-0">
                                  {this.state.spinner ? (
                                    <button
                                      type="submit"
                                      className="btn btn-danger"
                                      style={{
                                        width: "100%",
                                        borderRadius: 0,
                                      }}
                                    >
                                      Create Account{" "}
                                      <span className="spinner-border spinner-border-sm  ml-2 text-light"></span>
                                    </button>
                                  ) : (
                                    <button
                                      type="submit"
                                      className="btn btn-danger"
                                      style={{
                                        width: "100%",
                                        borderRadius: 0,
                                      }}
                                    >
                                      Create Account{" "}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      </>
    );
  }
}

export default AddNewUser;
