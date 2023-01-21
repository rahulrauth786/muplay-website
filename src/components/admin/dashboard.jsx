import React, { Component } from "react";

import AddMultipleProduct from "./addMultipleProduct";
import AddSingleProduct from "./addSingleProduct";
import "./dashboard.css";
import UsageReport from "./usageReport/variousReport";
import { Link } from "react-router-dom";
import * as scroll from "react-scroll";
import EditProduct from "./editProduct";
import { getCurrentUser, getUserLogOut } from "../../services/userService";
import RegistrationPage from "../register";
import Footer from "../footer";

class Admindashboard extends Component {
  state = {
    file: "",
    fileName: "Choose File",
    menus: ["Add Songs", "Usage Report"],
    user: null,
    selOpt: { multiProduct: false, singleProduct: false, userActivity: false },
  };
  style = {};

  async componentDidMount() {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState({ user });
      // let token = JSON.parse(sessionStorage.getItem("token"));
      // let response = getCurrentUser(token);
      // response.then((user) => this.setState({ user }));
    } catch (error) { }
  }

  handleOption = (opt) => {
    let selOpt = this.state.selOpt;
    selOpt[opt] = !selOpt[opt];
    this.setState({ selOpt });
  };
  handleLogout = () => {
    getUserLogOut();
    window.location = "/";
  };

  render() {
    const { menus, user, selOpt } = this.state;

    if (user && user.role === "admin") {
      return (
        <div className="container-fluid" style={{ backgroundColor: "#eee" }}>
          <div className="row border py-1 bg-dark text-light">
            <div className="col  mt-2">
              <span className="nav navbar-brand">Admin Console</span>
            </div>
            <div className="col-2  d-none d-sm-block"></div>
            <div className="col-12  col-sm-6 col-md-4 col-lg-5">
              <div className="row">
                <div
                  className="col-9 mt-2 text-right bg-warning  py-2"
                  style={{
                    fontSize: "clamp(16px,2vw,18px)",
                    opacity: 0.9,
                  }}
                >
                  <span>Welcome Admin {user.name}</span>
                </div>
                <div
                  className="col mt-2 text-right py-2"
                  style={{ borderRadius: 50 }}
                >
                  <span
                    className="text-light"
                    style={{
                      fontSize: "clamp(16px,2vw,18px)",
                      cursor: "pointer",
                    }}
                    onClick={() => this.handleLogout()}
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mt-2">
            <div className="col-6 col-sm-4 col-md-2 text-centertext-left border-right py-2 bg-warning text-dark labels text-truncate">
              Add Songs
            </div>
          </div>
          <div className="row border text-white bg-dark">
            <div
              className="col-6 py-2"
              style={{
                color: "rgb(250, 187, 15)",
              }}
            >
              <scroll.Link to="addMultiplProduct">
                <span style={{ fontSize: "clamp(15px,2vw,20px)" }}>
                  Add Multiple Songs
                </span>
              </scroll.Link>
            </div>
            <div className="col-6 text-right text-muted">
              {selOpt.multiProduct ? (
                <i
                  className="fa fa-arrow-down mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("multiProduct")}
                ></i>
              ) : (
                <i
                  className="fa fa-arrow-up mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("multiProduct")}
                ></i>
              )}
            </div>
          </div>
          {selOpt.multiProduct ? (
            <div className="row mb-3 mt-3 bg-dark" id="Add Product">
              <div className="col-12">
                <AddMultipleProduct type="update" />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row border text-left  ">
            <div className="col-6 py-2 bg-dark">
              <span
                style={{
                  color: "rgb(250, 187, 15)",
                  fontSize: "clamp(15px,2vw,20px)",
                }}
              >
                Add Single Song
              </span>
            </div>
            <div className="col-6 text-right text-muted bg-dark">
              {selOpt.singleProduct ? (
                <i
                  className="fa fa-arrow-down mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("singleProduct")}
                ></i>
              ) : (
                <i
                  className="fa fa-arrow-up mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("singleProduct")}
                ></i>
              )}
            </div>
          </div>
          {selOpt.singleProduct ? (
            <div className="row">
              <div className="col-12 col-lg-8 m-auto">
                <AddSingleProduct />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row justify-content-between mt-2  ">
            <div className="col-6 col-sm-4 col-md-2 text-left border-right py-2  bg-warning text-dark labels ">
              Report
            </div>
          </div>
          <div className="row border text-left bg-dark">
            <div
              className="col-6 py-2"
              style={{
                color: "rgb(250, 187, 15)",

                textUnderlineOffset: "1em",
              }}
            >
              <span style={{ fontSize: "clamp(15px,2vw,20px)" }}>Reports</span>
            </div>
            <div className="col-6 text-right text-muted">
              {selOpt.userActivity ? (
                <i
                  className="fa fa-arrow-down mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("userActivity")}
                ></i>
              ) : (
                <i
                  className="fa fa-arrow-up mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("userActivity")}
                ></i>
              )}
            </div>
          </div>
          {selOpt.userActivity ? (
            <div className="row border mt-2 pt-2">
              <div className="col-12">
                <UsageReport onEdit={this.handleEdit} />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row justify-content-between mt-2  ">
            <div className="col-6 col-sm-4 col-md-2 text-left border-right py-2 labels  bg-warning text-dark labels ">
              Add New Users
            </div>
          </div>
          <div
            className="row border text-left  "
            onClick={() => this.props.history.push("/addNewUser")}
          >
            <div className="col-6 py-2 bg-dark">
              <span
                style={{
                  color: "rgb(250, 187, 15)",
                  fontSize: "clamp(15px,2vw,20px)",
                }}
              >
                Create New User
              </span>
            </div>
            <div className="col-6 text-right text-muted bg-dark">
              {selOpt.createNewUser ? (
                <i
                  className="fa fa-arrow-down mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("createNewUser")}
                ></i>
              ) : (
                <i
                  className="fa fa-arrow-up mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("createNewUser")}
                ></i>
              )}
            </div>
          </div>
          {/* {selOpt.createNewUser ? (
            <div className="row">
              <div className="col-12">
                <RegistrationPage {...this.props} apiEnd="dashboard" />
              </div>
            </div>
          ) : (
            ""
          )}{" "} */}{" "}
          <div className="row justify-content-between mt-2 ">
            <div className="col-6 col-sm-4 col-md-2 text-left border-right py-2 labels bg-warning text-dark">
              Reset All Data
            </div>
          </div>
          <div className="row border text-white bg-dark">
            <div
              className="col-6 py-2"
              style={{
                color: "rgb(250, 187, 15)",
              }}
            >
              <scroll.Link to="addMultiplProduct">
                <span style={{ fontSize: "clamp(15px,2vw,20px)" }}>
                  Reset All Song Details
                </span>
              </scroll.Link>
            </div>
            <div className="col-6 text-right text-muted">
              {selOpt.resetAllSongs ? (
                <i
                  className="fa fa-arrow-down mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("resetAllSongs")}
                ></i>
              ) : (
                <i
                  className="fa fa-arrow-up mt-3"
                  style={{
                    color: "rgb(250, 187, 15)",
                    fontSize: "clamp(12px,2vw,20px)",
                  }}
                  onClick={() => this.handleOption("resetAllSongs")}
                ></i>
              )}
            </div>
          </div>
          {selOpt.resetAllSongs ? (
            <div className="row mb-3 mt-3 bg-dark" id="Add Product">
              <div className="col-12">
                <AddMultipleProduct type="reset" />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row mt-5">
            <div className="col-12">
              <Footer />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row ">
          <div className="col-12 px-0">
            You are not authorize to view this page.Please Login as Admin.
            <Link to="/login">Login</Link>
          </div>
        </div>
      );
    }
  }
}

export default Admindashboard;
