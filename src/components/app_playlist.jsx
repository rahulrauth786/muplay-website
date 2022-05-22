import React, { Component } from "react";

import Playlist_Model_1 from "./musicType/playlist_model_1";
import Playlist_Model_2 from "./musicType/playlist_model_2";
import Playlist_Model_3 from "./musicType/playlist_model_3";
class App_Playlist extends Component {
  state = {};

  render() {
    return (
      <div className="row mb-2 mx-1 mainContent">
        <div className=" col-md-1 col-lg-1 d-md-block d-none"></div>
        <div className=" col-12 col-md-9 col-lg-9 ">
          <div className="row mt-4  ">
            <div className="col-12 mt-1">
              <Playlist_Model_1
                {...this.props}
                name="Top Picks"
                endPoint="top_picks"
              />
            </div>
            <div className="col-12 mt-1">
              <Playlist_Model_2
                {...this.props}
                name="Trending Songs"
                endPoint="trending_songs"
              />
            </div>
            <div className="col-12 mt-1">
              <Playlist_Model_3
                {...this.props}
                name="Top Charts"
                endPoint="top_charts"
              />
            </div>
          </div>
        </div>
        <div className=" col-md-2 col-lg-2 d-md-block d-none  "></div>
      </div>
    );
  }
}

export default App_Playlist;
