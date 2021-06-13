import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";
import RegistrationPage from "./register";
import {
  checkUserIdExist,
  getCurrentUser,
  getUserLogOut,
  login,
} from "./../services/userService";
import UserOption from "./myProfile/userOptions";
import LoginForm from "./loginForm";

class Navbar extends Component {
  state = {
    navList: [
      { list: "home", link: "/" },
      { list: "browse", link: "/" },
      { list: "discover", link: "/" },
      { list: "radio", link: "/" },
      { list: "my music", link: "/mymusic" },
      { list: "podcasts", link: "/" },
      { list: "india's music", link: "/" },
      { list: "search", link: "" },
    ],
    trending: [
      { list: "Badaami Rang", link: "Badaami Rang" },
      { list: "Burj Khalifa", link: "BurjKhalifa" },
      { list: "Kya Karu", link: "Kya Karu" },
      { list: "Judaiyaan", link: "Judaiyaan" },
      { list: "Main Yeh Haath Jo", link: "Main Yeh Haath Jo" },
      { list: "Baby Doll", link: "Baby Doll" },
      { list: "Laila", link: "Laila" },
      { list: "Gucci", link: "Gucci" },
      { list: "Naach Meri Rani", link: "Naach Meri Rani" },
    ],
    show: false,
    showOption: "",
    viewPage: "enterPassword",
    user: null,
    showSearchOption: false,
    search: null,
    showPopBox: false,
  };

  componentDidMount() {
    let token = JSON.parse(sessionStorage.getItem("token"))
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    if (token !== null) {
      let response = getCurrentUser(token);
      response
        .then((data) => {
          this.setState({ user: data, loading: true });
        })
        .catch((err) => console.log(err));
    }
  }

  handleNavBar = () => {
    this.setState({ show: !this.state.show });
  };

  handleLogout = () => {
    getUserLogOut();
    window.location = "/";
  };
  handleLoginForm = (value) => {
    this.setState({ show: value });
  };

  handleSearchOption = () => {
    this.setState({ showSearchOption: !this.state.showSearchOption });
  };

  showUserOptions = () => {
    this.props.history.push("/user");
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    this.setState({ search: input.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let value = this.state.search;
    if (value !== null || value === undefined)
      this.props.history.push(`/search/${value}`);
  };
  handlePopBox = () => {
    this.setState({ showPopBox: !this.state.showPopBox });
  };

  render() {
    const { navList, show, user, search, trending, showPopBox } = this.state;
    return (
      <>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-white  border d-flex justify-content-between ">
            <div className="d-lg-none" id="bars">
              <span className="navbar-toggler-icon"></span>
            </div>
            <div className="d-lg-none" style={{ width: "75%" }} id="search">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    backgroundColor: "lightgray",
                    border: "1px solid silver",
                    placeholder: "Enter",
                    color: "black",
                  }}
                  value={this.state.search === null ? "" : this.state.search}
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <div className="d-flex" id="logo">
              <div className="">
                <a
                  className="navbar-brand ml-3 mt-2 d-lg-block d-none"
                  to="/"
                  style={{ color: "red" }}
                >
                  <svg width="83" height="33" viewBox="0 0 83 33">
                    <g
                      className="fill_path orange"
                      fillRule="evenodd"
                      transform="translate(-84 -28)"
                    >
                      <path
                        fill="#e72c30"
                        d="M142.715 47.83c.182-1.009.346-1.955.518-2.901.572-3.215 1.144-6.429 1.698-9.643.163-.929-.418-1.599-1.38-1.643-.618-.027-1.244-.018-1.862-.018-1.289.009-2.142.759-2.36 2.009-.69 3.946-1.399 7.893-2.107 11.83-.027.134-.19.349-.29.349-1.771-.027-3.532-.045-5.294-.161-1.144-.072-2.061-.643-2.706-1.59-.036-.044-.082-.08-.145-.151-.245.259-.472.509-.717.74-.808.795-1.744 1.269-2.915 1.18-.826-.063-1.67 0-2.479-.144-1.444-.258-2.624-.964-3.332-2.366-.11.483-.227.956-.336 1.438-.245 1.152-.236 1.143-1.435 1.09-.853-.036-1.707-.153-2.442-.59-.563-.34-1.044-.821-1.607-1.268-.164.17-.39.42-.627.652-.808.786-1.743 1.232-2.915 1.187-1.116-.044-2.233.027-3.314-.366-1.925-.705-2.969-2.357-2.633-4.357.436-2.634.817-5.286 1.417-7.884.608-2.607 2.197-4.428 5.003-4.99.4-.081.808-.126 1.216-.126 2.316-.009 4.631-.009 6.946-.009.118 0 .227.018.382.036-.227 1.268-.454 2.509-.672 3.75-.518 2.866-1.044 5.723-1.544 8.59-.045.267.064.597.2.839.345.616 1.417 1.044 2.125.928.263-3.045.871-6.027 1.516-8.991.572-2.625 2.197-4.464 5.021-5.027.4-.08.808-.125 1.217-.125 2.315-.009 4.63-.009 6.946-.009.1 0 .209.018.363.027-.136.777-.263 1.536-.4 2.286-.617 3.402-1.243 6.803-1.86 10.205-.091.482.081.884.48 1.179.155.116.328.232.51.277.371.098.79.267 1.143.196.49-.098.309-.634.372-.973.709-3.84 1.39-7.679 2.07-11.527.1-.536.2-1.08.31-1.643.145-.009.272-.027.408-.027 2.252 0 4.513-.009 6.765 0a5.97 5.97 0 0 1 2.542.572c1.353.66 2.143 1.74 2.08 3.232-.046 1.25-.273 2.5-.482 3.74-.545 3.144-1.117 6.287-1.68 9.42-.027.18-.045.358-.1.527-.036.09-.154.206-.236.206-1.126.053-2.224.044-3.378.044zm-27.902-14.17c-.136-.026-.182-.035-.218-.035-1.144 0-2.297-.009-3.441 0-1.144.009-2.007.696-2.216 1.795a382.321 382.321 0 0 0-1.27 7.044c-.2 1.188.399 1.857 1.652 1.911.499.018.998.009 1.498 0 1.37-.009 2.188-.705 2.433-2.036.372-2.071.763-4.143 1.144-6.205a93.62 93.62 0 0 1 .418-2.473zm15.172.01c-.127-.027-.172-.045-.208-.045-1.154 0-2.298-.018-3.45 0-1.163.018-2.026.705-2.234 1.821a637.194 637.194 0 0 0-1.272 7.045c-.181 1.063.291 1.697 1.38 1.83.6.072 1.208.045 1.807.045 1.317-.009 2.152-.705 2.38-1.982l1.062-5.732c.181-.973.354-1.964.535-2.982zM98.605 47.84c-.317 0-.572.008-.826 0-1.253-.027-2.515.026-3.759-.108-1.88-.214-3.187-1.375-3.56-2.973-.208-.875-.09-1.741.064-2.607.418-2.304.817-4.616 1.262-6.92.536-2.786 2.724-4.786 5.62-5.009 1.699-.134 3.415-.08 5.122-.098.908-.009 1.807 0 2.787 0-.118.705-.227 1.375-.345 2.036-.653 3.651-1.316 7.303-1.98 10.955-.417 2.295-.798 4.59-1.27 6.875-.636 3.116-3.051 4.554-5.53 4.902-.6.08-1.208.09-1.807.09-2.088.008-4.177 0-6.265 0-.027 0-.054-.01-.118-.028.01-.053 0-.107.027-.151.581-1.027 1.153-2.054 1.762-3.063.09-.143.363-.241.554-.241 1.834-.018 3.659-.009 5.493-.009 1.398 0 2.116-.562 2.415-1.91.145-.563.227-1.099.354-1.742zm-1.38-3.519v.054c.472 0 .944-.036 1.408.009.463.045.626-.143.699-.571.481-2.804.98-5.608 1.48-8.411.19-1.054-.354-1.741-1.453-1.777-.608-.018-1.208-.009-1.816-.009-1.217.018-2.043.705-2.26 1.893-.237 1.286-.482 2.562-.71 3.848-.199 1.152-.426 2.304-.562 3.464-.1.83.363 1.375 1.226 1.474.653.08 1.325.026 1.988.026zM162.918 30.134c-.318 1.777-.635 3.491-.944 5.214a980.315 980.315 0 0 0-1.29 7.134c-.172.956.237 1.554 1.172 1.857.118.036.254.26.236.375-.163 1.027-.354 2.045-.545 3.125-1.607-.098-3.005-.58-4.004-1.937-.263.277-.49.535-.735.777-.8.767-1.717 1.232-2.879 1.17-1.008-.054-2.016.044-3.005-.26-2.225-.678-3.342-2.402-2.951-4.652.445-2.589.826-5.187 1.416-7.75.563-2.41 2.016-4.17 4.558-4.839a6.972 6.972 0 0 1 1.607-.223c2.361-.027 4.722-.009 7.074-.009.072 0 .154.009.29.018zm-4.176 3.527c-.182-.018-.291-.036-.41-.036-1.089 0-2.178-.009-3.268 0-1.126.018-1.988.679-2.188 1.759-.454 2.42-.88 4.84-1.299 7.268-.154.91.318 1.536 1.263 1.652.608.08 1.234.062 1.852.062 1.416 0 2.234-.714 2.479-2.09.4-2.25.826-4.49 1.235-6.731.118-.616.217-1.232.336-1.884z"
                      ></path>{" "}
                    </g>{" "}
                  </svg>
                </a>
              </div>
              <div className="d-lg-block d-none  pt-2 ">
                <ul className="navbar-nav mr-auto ">
                  {navList.map((item, index) => (
                    <li key={index} className="nav-item active text-muted">
                      {item.list === "search" ? (
                        <div
                          className=" p-2 bg-danger rounded-circle"
                          onClick={() => this.handleSearchOption()}
                        >
                          <svg width="25" height="25" viewBox="0 0 25 25">
                            <path
                              className="fill_path"
                              style={{ opacity: 1 }}
                              fill="white"
                              fillRule="evenodd"
                              d="M69.5 34a6.5 6.5 0 0 1 6.5 6.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 69.5 47a6.5 6.5 0 1 1 0-13zm0 2C67 36 65 38 65 40.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"
                              transform="translate(-59 -32)"
                            ></path>
                          </svg>
                        </div>
                      ) : (
                        <Link
                          className="nav-link"
                          to={item.link}
                          style={{
                            textTransform: "uppercase",
                            color: "#7f7f7f",
                            fontSize: 16,
                            fontWeight: 500,
                          }}
                        >
                          {item.list}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {user ? (
              <div className=" d-lg-block d-none " id="headerLink">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active text-muted">
                    <a className="nav-link px-2  ">
                      <div
                        className="dropdown pr-5 d-sm-block d-none"
                        style={{
                          color: "black",
                          marginLeft: 100,
                          width: "20%",
                          overflow: "visible",
                        }}
                      >
                        <div className="dropbtn1" style={{ fontWeight: 500 }}>
                          <img
                            className="rounded-circle"
                            src="https://a10.gaanacdn.com/images/users/102/crop_110x110_4927102.jpg"
                            style={{ width: 45, height: 45 }}
                          />
                        </div>
                        <div
                          className="dropdown-content py-3"
                          style={{
                            backgroundColor: "white",
                            width: 220,
                            left: -120,
                            letterSpacing: "0!important",
                            fontWeight: 500,

                            fontStyle: "normal",
                            fontSize: "0.9em",
                            cursor: "pointer",
                            transition: "ease",
                            height: 220,
                          }}
                        >
                          <div className="d-flex flex-column ml-3">
                            <div className="my-2">
                              <i
                                className="fa fa-user"
                                style={{ color: "black" }}
                              ></i>{" "}
                              &nbsp; &nbsp;Profile
                            </div>
                            <div className="my-2">
                              <i
                                className="fa fa-language"
                                style={{ color: "black" }}
                              ></i>{" "}
                              &nbsp; &nbsp;My Languages
                            </div>
                            <div className="my-2">
                              <i
                                className="fa fa-cog"
                                style={{ color: "black" }}
                              ></i>{" "}
                              &nbsp; &nbsp;Setting
                            </div>
                            <div
                              className="my-2 mr-2"
                              onClick={() => this.handleLogout()}
                            >
                              <i
                                className="fa fa-sign-out"
                                style={{ color: "black" }}
                              ></i>{" "}
                              &nbsp; &nbsp;Log Out
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className=" d-lg-block d-none border" id="headerLink">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active text-muted">
                    <a className="nav-link px-2 ">
                      <i className="fa fa-moon"></i>
                    </a>
                  </li>
                  <li className="nav-item active text-muted">
                    <a className="nav-link">
                      <i className="fa fa-language"></i>
                    </a>
                  </li>
                  <li className="nav-item active text-muted">
                    <a
                      className="nav-link"
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        color: "red",
                      }}
                      onClick={() => this.handleLoginForm(true)}
                    >
                      Sign In
                    </a>
                  </li>
                </ul>
                {show ? (
                  <LoginForm
                    {...this.props}
                    oncloseLoginForm={this.handleLoginForm}
                  />
                ) : (
                  ""
                )}
              </div>
            )}

            <div className=" d-lg-none" id="login">
              {user ? (
                <>
                  <img
                    className="rounded-circle"
                    src="https://a10.gaanacdn.com/images/users/102/crop_110x110_4927102.jpg"
                    style={{ width: 25, height: 25 }}
                    onClick={() => this.showUserOptions()}
                  />
                </>
              ) : (
                <i
                  className="fa fa-user"
                  onClick={() => this.showUserOptions()}
                ></i>
              )}
            </div>
          </nav>
          <div className="row d-lg-block d-none">
            <div className="col-12">
              {this.state.showSearchOption ? (
                <div className="row py-4 bg-white mx-3 ">
                  <div className="col-1"></div>
                  <div className="col-3  px-0" style={{ minWidth: 500 }}>
                    <form onSubmit={this.handleSubmit}>
                      <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={this.handleChange}
                        style={{
                          borderRadius: 50,
                          backgroundColor: "#eee",
                          maxWidth: 450,
                          minWidth: 250,
                          height: 42,
                        }}
                        placeholder="Search for Songs,Artist,Playlist and More"
                      />
                      <button
                        className="btn btn-danger"
                        style={{
                          position: "absolute",
                          borderRadius: 50,
                          top: 0,
                          right: 0,
                          width: 150,
                        }}
                      >
                        <svg width="25" height="25" viewBox="0 0 25 25">
                          <path
                            className="fill_path"
                            style={{ opacity: 1 }}
                            fill="#FFF"
                            fillRule="evenodd"
                            d="M69.5 34a6.5 6.5 0 0 1 6.5 6.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 69.5 47a6.5 6.5 0 1 1 0-13zm0 2C67 36 65 38 65 40.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"
                            transform="translate(-59 -32)"
                          ></path>
                        </svg>{" "}
                        Search
                      </button>
                    </form>
                  </div>
                  <div>
                    <div className="row ml-2 mt-2">
                      <div className="col-12 d-flex">
                        <div>
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 500,
                              color: "#999999",
                            }}
                          >
                            Trending
                          </span>
                        </div>
                        <div
                          className="ml-3 d-flex"
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="border text-center mr-2"
                            style={{
                              width: 140,
                              backgroundColor: "#efefef",
                              height: 27,
                              color: "red",
                              borderRadius: 50,
                            }}
                            onClick={() =>
                              this.props.history.push(
                                "/trendingSong/Naach Meri Rani"
                              )
                            }
                          >
                            Naach Meri Rani
                          </div>
                          <div
                            className="border text-center  mr-2"
                            style={{
                              width: 140,
                              backgroundColor: "#efefef",
                              height: 27,
                              color: "red",
                              borderRadius: 50,
                            }}
                            onClick={() =>
                              this.props.history.push(
                                "/trendingSong/Badaami Rang"
                              )
                            }
                          >
                            Badaami Rang
                          </div>
                          <div
                            className="border text-center  mr-2"
                            style={{
                              width: 140,
                              backgroundColor: "#efefef",
                              height: 27,
                              color: "red",
                              borderRadius: 50,
                            }}
                            onClick={() =>
                              this.props.history.push(
                                "/trendingSong/BurjKhalifa"
                              )
                            }
                          >
                            Burj Khalifa
                          </div>
                          <div
                            className="border text-center  mr-2"
                            style={{
                              width: 40,
                              backgroundColor: "#efefef",
                              height: 27,
                              color: "red",
                              borderRadius: 50,
                              cursor: "pointer",
                            }}
                            onClick={() => this.handlePopBox()}
                          >
                            +7
                          </div>
                        </div>

                        {showPopBox ? (
                          <div
                            className="pop-up-box bg-white rounded shadow border py-2"
                            style={{
                              position: "absolute",
                              zIndex: 1,
                              top: 40,
                              right: 20,
                              width: 280,
                              height: "auto",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                top: -15,
                                left: 235,
                                width: 0,
                                height: 0,
                                borderLeft: "15px solid transparent",
                                borderRight: "15px solid transparent",
                                borderBottom: "26px solid white",
                              }}
                            ></div>
                            <div className="row mx-1">
                              <div className="col-12 d-flex flex-wrap">
                                {trending.map((obj) => (
                                  <span
                                    className="border text-center mr-2 d-block px-2 my-2"
                                    style={{
                                      backgroundColor: "#efefef",
                                      height: 27,
                                      color: "red",
                                      borderRadius: 50,
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      this.props.history.push(
                                        `/trendingSong/${obj.link}`
                                      )
                                    }
                                  >
                                    {obj.list}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Navbar;
