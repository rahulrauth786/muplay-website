import React, { Component } from "react";
import MusicPlayerPage from "./musicPlayer/musicPlayer";

class App_Music_List extends Component {
  state = {};

  render() {
    let { songs, currentSong, handlePlayedSong, rawTime, rawDuration } =
      this.props;
    return (
      <div className="row mb-2 mx-1 musicContent ">
        <div className=" col-md-1 col-lg-1 d-md-block d-none"></div>
        <div className=" col-12 col-md-9 col-lg-9 ">
          {songs && songs.length > 0 ? (
            <React-Fragment>
              <MusicPlayerPage
                {...this.props}
                onUpdatePlayedSong={handlePlayedSong}
                songs={songs}
                currentSong={currentSong}
                rawTime={rawTime}
                rawDuration={rawDuration}

                // onUpdateSong={this.updateSong}
              />
            </React-Fragment>
          ) : (
            <>
              <br />
              <br />
              <br />
              <hr />
              <div className="row bg-light ">
                <div className="col-12 d-md-block d-none ">
                  <ul className="d-flex " style={{ listStyle: "none" }}>
                    <li>
                      <img
                        className="mx-1"
                        src="https://a10.gaanacdn.com//media/images-v5/default-album-175x175.jpg "
                        style={{
                          width: 140,
                          height: 140,
                          borderRadius: 5,
                        }}
                      />
                    </li>
                    <li>
                      <ul style={{ listStyle: "none" }}>
                        <li>
                          <span style={{ fontSize: 22, color: "black" }}>
                            {this.props.match.params.type}
                          </span>
                          <br />
                          <span style={{ fontSize: 16, fontWeight: 500 }}>
                            {this.props.match.params.option === "playlist"
                              ? "Created By Gaana User Track:0"
                              : ""}
                          </span>
                        </li>
                        <li>
                          <button
                            className="btn btn-danger px-4 mt-5"
                            style={{ borderRadius: 50 }}
                            onClick={() =>
                              this.props.history.push(
                                `/playlist/${this.props.match.params.type}`
                              )
                            }
                          >
                            Play All
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="col-12 d-md-none text-center">
                  <div className="" style={{ listStyle: "none" }}>
                    <div>
                      <img
                        className="mx-1"
                        src="https://a10.gaanacdn.com//media/images-v5/default-album-175x175.jpg "
                        style={{
                          width: 140,
                          height: 140,
                          borderRadius: 5,
                        }}
                      />
                    </div>
                    <div>
                      <ul style={{ listStyle: "none" }}>
                        <li>
                          <span style={{ fontSize: 22, color: "black" }}>
                            {this.props.match.params.type}
                          </span>
                          <br />
                          <span style={{ fontSize: 16, fontWeight: 500 }}>
                            Created By Gaana User Track:0
                          </span>
                        </li>
                        <li>
                          <button
                            className="btn btn-danger px-4 mt-1"
                            style={{ borderRadius: 50 }}
                            onClick={() =>
                              this.props.history.push(
                                `/playlist/${this.props.match.params.type}`
                              )
                            }
                          >
                            Play All
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-12 text-center text-dark"
                  style={{ fontWeight: 500 }}
                >
                  There is no song in the playlist
                </div>
              </div>
            </>
          )}
          <div className="col-12">{/* <Footer /> */}</div>
        </div>
        <div className=" col-md-2 col-lg-2 d-md-block d-none"></div>
      </div>
    );
  }
}

export default App_Music_List;
