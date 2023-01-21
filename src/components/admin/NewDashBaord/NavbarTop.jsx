/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";

import "./navbar.css";

import Search from "./searchoption";

class NavbarTop extends Component {
  state = {};

  componentDidCatch() { }

  render() {
    return (
      <>

        <div className="row p-0  pt-1 pb-1 mt-2 pl-2">
          <div className="col-2 ">
            <FontAwesomeIcon icon={faHome} className="text-secondary" />
            <label className="ml-3 label  mt-2 pl-1 pr-1 pt-1 " style={{ color: "#B5B5B5", fontSize: 16 }}>Dashboard</label>
          </div>

          <div className="col-6 ">
            {/* <SearchMusic {...this.props} /> */}
            <Search />
          </div>
          <div className="col-3"></div>
          <div className="col-1">
            <div class="d-flex justify-content-end">
              <FontAwesomeIcon
                icon={faUsers}
                className="mt-2 pt-2 pb-1 pr-1 pl-1  fixed-right"
              />
            </div>
          </div>
        </div>


      </>
    );
  }
}

export default NavbarTop;
