import React, { Component } from "react";
import AddToPlayList from "../myProfile/addToPlayList";

class MusicMobileOption extends Component {
  state = { optionSelected: null };

  render() {
    return (
      <>
        <div className="row mt-3">
          <div
            className="col-12 pl-4 py-2 d-flex"
            style={{ fontSize: 16, color: "black" }}
            onClick={() => this.setState({ optionSelected: "Add to Playlist" })}
          >
            <div style={{ width: 25 }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                data-type="addtopp"
                title="Add to Playlist"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M0 0h24v24H0z" data-type="addtopp"></path>
                  <path
                    className="fill_path"
                    fill="black"
                    data-type="addtopp"
                    d="M21 22H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm-1.5-2a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11zm-5-2h-1a.5.5 0 0 1-.5-.5V15h-2.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H13v-2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V13h2.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H15v2.5a.5.5 0 0 1-.5.5zM4 5v14.778a2 2 0 0 1-2-2V3a1 1 0 0 1 1-1h14.778a2 2 0 0 1 2 2H5a1 1 0 0 0-1 1z"
                  ></path>
                </g>
              </svg>
            </div>
            &nbsp; &nbsp; Add to Playlist
          </div>
          <div
            className="col-12 pl-4 py-2 d-flex"
            style={{ fontSize: 16, color: "black" }}
          >
            <div style={{ width: 25 }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                data-type="sharep"
              >
                <path
                  className="fill_path"
                  fill="black"
                  data-type="sharep"
                  fillRule="evenodd"
                  d="M16 18a2 2 0 1 1 .001-4.001A2 2 0 0 1 16 18M4 12a2 2 0 1 1 .001-4.001A2 2 0 0 1 4 12M16 2a2 2 0 1 1-.001 4.001A2 2 0 0 1 16 2m0 10c-1.2 0-2.266.542-3 1.382l-5.091-2.546c.058-.27.091-.549.091-.836 0-.287-.033-.566-.091-.836L13 6.618C13.734 7.458 14.8 8 16 8c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4c0 .287.033.566.091.836L7 7.382A3.975 3.975 0 0 0 4 6c-2.206 0-4 1.794-4 4s1.794 4 4 4c1.2 0 2.266-.542 3-1.382l5.091 2.546c-.058.27-.091.549-.091.836 0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4"
                ></path>
              </svg>
            </div>
            &nbsp;&nbsp; &nbsp;Share
          </div>
          <div
            className="col-12 pl-4 py-2 d-flex"
            style={{ fontSize: 16, color: "black" }}
          >
            <div style={{ width: 25 }}>
              <svg
                width="14"
                height="18"
                viewBox="0 0 16 20"
                data-type="downloadp"
                data-value="downloadp"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    data-type="downloadp"
                    data-value="downloadp"
                    d="M-4-1.995h24v24H-4z"
                  ></path>
                  <path
                    className="fill_path"
                    fill="black"
                    data-type="downloadp"
                    data-value="downloadp"
                    d="M14 16.001v2H2v-2H0v2c0 1.102.896 2 2 2h12c1.104 0 2-.898 2-2v-2h-2zM7.293 13.708a.997.997 0 0 0 1.414 0l5-5A1 1 0 0 0 13 7.001h-2v-6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v6H3a1 1 0 0 0-.707 1.707l5 5zM6 9.001a1 1 0 0 0 1-1v-6h2v6a1 1 0 0 0 1 1h.586L8 11.587 5.414 9.001H6z"
                  ></path>
                </g>
              </svg>
            </div>
            &nbsp; &nbsp; Download
          </div>
          <div
            className="col-12 pl-4 py-2 d-flex"
            style={{ fontSize: 16, color: "black" }}
          >
            <div style={{ width: 25 }}>
              <svg width="21" height="20" viewBox="0 0 21 20">
                <g fill="none" fillRule="evenodd" transform="translate(-1 -2)">
                  <path d="M0 0h24v24H0z"></path>
                  <path
                    className="fill_path"
                    d="M20 8H6.922l7.557-4.122-.958-1.756-10.834 5.91A1.998 1.998 0 0 0 1 10v10c0 1.103.897 2 2 2h17c1.103 0 2-.897 2-2V10c0-1.104-.897-2-2-2zM3 20V10h17l.001 10H3z"
                  ></path>
                  <path
                    fill="black"
                    className="fill_path"
                    d="M5 12h8v2H5zM5 16h6v2H5z"
                  ></path>
                  <circle cx="16" cy="16" r="2" className="fill_path"></circle>
                </g>
              </svg>
            </div>
            &nbsp; &nbsp; Play similar song
          </div>
          <div
            className="col-12 pl-4 py-2 d-flex"
            style={{ fontSize: 16, color: "black" }}
          >
            <div style={{ width: 25 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                data-type="getsonginfofromque"
              >
                <path
                  className="fill_path"
                  title="Get Song Info"
                  data-type="getsonginfofromque"
                  fillRule="evenodd"
                  fill="black"
                  d="M1 13C1 6.372 6.372 1 13 1s12 5.372 12 12-5.372 12-12 12S1 19.628 1 13zm2 0c0 5.524 4.477 10 10 10 5.524 0 10-4.477 10-10 0-5.524-4.477-10-10-10C7.476 3 3 7.477 3 13zm10.946 4.604h-1.778v-6.762h1.778v6.762zm-.896-7.49A1.06 1.06 0 0 1 12 9.05c0-.588.476-1.05 1.05-1.05.588 0 1.064.462 1.064 1.05 0 .588-.476 1.064-1.064 1.064z"
                ></path>
              </svg>
            </div>
            &nbsp; &nbsp; Get Song Info
          </div>
          <div
            className="col-12 pl-4 py-2 d-flex"
            style={{ fontSize: 16, color: "black" }}
          >
            <div style={{ width: 25 }}>
              <svg width="18px" height="18px" viewBox="0 0 20 20" version="1.1">
                <defs></defs>
                <g
                  id="v2"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="player-states"
                    transform="translate(-20.000000, -1609.000000)"
                  >
                    <g
                      id="3-dots-Click"
                      transform="translate(0.000000, 1314.000000)"
                    >
                      <g
                        id="More---Song"
                        transform="translate(0.000000, 54.000000)"
                      >
                        <g id="More">
                          <g
                            id="Group-6-Copy-4"
                            transform="translate(20.000000, 241.000000)"
                          >
                            <g id="info">
                              <polygon
                                id="Shape"
                                points="0 0 20 0 20 20 0 20"
                              ></polygon>
                              <g
                                id="Group-3"
                                transform="translate(2.000000, 4.000000)"
                                fillRule="nonzero"
                              >
                                <path
                                  className="fill_path"
                                  fill="black"
                                  d="M5.99999471,9.99430567 C5.99999824,9.99620337 6,9.99810148 6,10 C6,11.6568542 4.65685425,13 3,13 C1.34314575,13 0,11.6568542 0,10 C0,8.34314575 1.34314575,7 3,7 C3.35063542,7 3.68722107,7.06015422 4,7.17070571 L4,0 L10.5004744,0 L10.5004744,2 L6,2 L6,9.99430567 Z M3,11 C3.55228475,11 4,10.5522847 4,10 C4,9.44771525 3.55228475,9 3,9 C2.44771525,9 2,9.44771525 2,10 C2,10.5522847 2.44771525,11 3,11 Z M8.43978176,6 L8.43978176,4 L14.8964428,4 L14.8964428,6 L8.43978176,6 Z M8.43978176,11 L8.43978176,9 L12.8964428,9 L12.8964428,11 L8.43978176,11 Z"
                                  id="Combined-Shape"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            &nbsp; &nbsp; View Lyrics
          </div>
        </div>

        <>
          {this.state.optionSelected === "Add to Playlist" ? (
            <AddToPlayList
              song={this.props.song}
              optionSelected={this.state.optionSelected}
              showOptionSelected={() => this.setState({ optionSelected: "" })}
              {...this.props}
            />
          ) : (
            ""
          )}
        </>
      </>
    );
  }
}

export default MusicMobileOption;
