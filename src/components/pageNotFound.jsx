import React, { Component } from "react";
import Navbar from "./navbar";

class PageNotFound extends Component {
  state = {};
  render() {
    return (
      <div
        className="container-fluid px-0 "
        style={{ backgroundColor: "#eee", height: "100vh" }}
      >
        <div className="row">
          <div className="col-12">
            <Navbar
              {...this.props}
              //   onShowUserOptions={this.props.onShowUserOptions}
            />
          </div>
        </div>
        <div className="row text-center" style={{ marginTop: 200 }}>
          <div className="col-12 my-3">
            <span
              className="d-block"
              style={{
                fontFamily: "fantasy",
                fontWeight: 500,
                fontSize: 50,
              }}
            >
              404 error
            </span>

            <svg width="100" height="100" viewBox="0 0 20 20">
              <g fill="none" fill-rule="evenodd">
                {" "}
                <path
                  class="fill_path"
                  fill="rgba(0,0,0,0.2)"
                  d="M16.343 16.4h-2.39v-3.2h2.39v3.2zM5.984 13.2v3.2h-2.39v-3.2h2.39zM9.968 2C5.575 2 2 5.589 2 10v7.2c0 .442.357.8.797.8h3.187c.879 0 1.594-.718 1.594-1.6v-3.2c0-.883-.715-1.6-1.594-1.6h-2.39V10c0-3.529 2.86-6.4 6.374-6.4 3.515 0 6.375 2.871 6.375 6.4v1.6h-2.39c-.88 0-1.594.717-1.594 1.6v3.2c0 .882.714 1.6 1.593 1.6h3.187c.44 0 .797-.358.797-.8V10c0-4.411-3.574-8-7.968-8z"
                ></path>{" "}
                <path d="M0 0h20v20H0z"></path>{" "}
              </g>
            </svg>
          </div>
          <div className="col-12 my-3">
            <span
              style={{
                color: "rgba(0,0,0,0.5)",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Oops! Page is not found{" "}
            </span>
          </div>
          <div className="col-12 my-3">
            <button
              className="btn btn-danger btn-sm p-2"
              style={{ borderRadius: 50, fontSize: 13, width: 250 }}
              onClick={() => this.props.history.push("/")}
            >
              Please Try Some Other Things{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
