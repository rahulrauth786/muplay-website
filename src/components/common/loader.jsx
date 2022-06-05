import React, { Component } from "react";

class CustomLoader extends Component {
  render() {
    return (
      <div
        className="container-fluid w-100"
        style={{
          height: "100vh",
          backgroundColor: "black",
          opacity: 0.6,
        }}
      >
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomLoader;
