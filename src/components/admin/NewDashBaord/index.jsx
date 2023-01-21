import React, { Component } from "react";

import AddMultipleProduct from "../addMultipleProduct";
import AddSingleProduct from "../addSingleProduct";

import UsageReport from "../usageReport/variousReport";
import { Link } from "react-router-dom";
import * as scroll from "react-scroll";
import EditProduct from "../editProduct";
import { getCurrentUser, getUserLogOut } from "../../../services/userService";
import RegistrationPage from "../../register";
import Footer from "../../footer";
import NavbarTop from "./NavbarTop";
import LeftBar from "./Left-Horizontal";
import CenterPart from "./CenterPart";
import FooterPart from "./FooterPart";
import "./index.css"

class NewAdmindashboard extends Component {
  state = {
    file: "",
    fileName: "Choose File",
    menus: ["Add Songs", "Usage Report"],
    user: null,
    selOpt: "Graph"
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

  handleLeftBarOption = (opt) => {
    alert(opt)
    this.setState({ selOpt: opt })
  };
  handleLogout = () => {
    getUserLogOut();
    window.location = "/";
  };



  render() {
    const { menus, user, selOpt } = this.state;

    if (user && user.role === "admin") {
      return (
        <>
          <div className="container-fluid 
          ">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4">
                <div className="row main_left ">
                  <div className="col-12">
                    <LeftBar optionSelected={this.handleLeftBarOption} />
                  </div>
                </div>

              </div>
              <div className="col-xl-10 col-lg-10 col-md-9 col-sm-8 ">
                <div className="row main_header">
                  <div className="col-12">
                    <NavbarTop />
                  </div>
                </div>
                <div className="row main_center overflow-auto bg-dark">

                  <div className="col-12 center  ">
                    {/* <nav aria-label="breadcrumb ">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Dashbaord</a></li>
                        <li class="breadcrumb-item"><a href="#">{this.state.selOpt}</a></li>

                      </ol>
                    </nav> */}
                    <CenterPart optionSelected={this.state.selOpt} />
                  </div>

                </div>
                <div className="row main_footer border">
                  <div className="col-12 ">
                    <FooterPart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
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

export default NewAdmindashboard;
