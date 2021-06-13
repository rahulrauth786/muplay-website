import React, { Component } from "react";
import AddToPlayList from "../myProfile/addToPlayList";
import "./currentMusicPlayer.css";

class CurrentMusicPage extends Component {
  state = { showVolumeBar: false };
  getCurrentProgress(currentTime, duration) {
    let progress = (currentTime / duration) * 100;
    return progress + "%";
  }
  handleVolumeBarDisplay = (ok) => {
    this.setState({ showVolumeBar: ok });
  };

  render() {
    const { currentSong, rawTime, rawDuration, loading } = this.props;
    const currentTime = this.props.currentTime;
    const duration = this.props.duration;
    const showVolumeBar = this.state.showVolumeBar;
    let progress = this.getCurrentProgress(rawTime, rawDuration);

    return (
      <>
        <div className="row" style={{ width: 1600 }}>
          <div className="col-12 px-0">
            <div className="progress " style={{ height: 3 }}>
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress }}
              ></div>
            </div>
          </div>
        </div>
        <div className="row pb-2 pt-1 px-2 bg-white" style={{ width: 1600 }}>
          <div className="col-12 col-sm-10 col-md-10  ">
            <div className="row">
              <div className="col-lg-1 col-md-1 mt-3">
                <div className="d-flex ">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      onClick={() => this.props.onChangeSong(-1)}
                    >
                      <path
                        className="fill_path"
                        fill="black"
                        fillRule="evenodd"
                        d="M7.556 19.222V5H4v14.222h3.556zm12.444 0V5L9.333 12.111 20 19.222z"
                      ></path>
                    </svg>
                  </div>
                  &nbsp;
                  {!currentSong.music ? (
                    <div
                      className="rounded-circle  bg-danger text-center  playlogo"
                      onClick={() =>
                        this.props.onUpdatePlayedSong(this.props.currentSong)
                      }
                      style={{ width: 28, height: 31 }}
                    >
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 24 24"
                        className="playsvg"
                      >
                        <path
                          className="fill_path orange"
                          fillRule="evenodd"
                          fill="white"
                          d="M4.321 1v22.5L22 12.25z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <>
                      {progress !== "NaN%" ? (
                        <div
                          className="rounded-circle  bg-danger text-center  pauselogo"
                          onClick={() =>
                            this.props.onUpdatePlayedSong(
                              this.props.currentSong
                            )
                          }
                          style={{ width: 30, height: 31 }}
                        >
                          <svg
                            width="16"
                            height="22"
                            viewBox="0 0 24 24"
                            className="pausesvg"
                          >
                            <g fill="none" fillRule="nonzero">
                              <path
                                className="fill_path orange"
                                fill="white"
                                d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="spinner-border text-danger"
                          role="status"
                          style={{ width: 30, height: 31 }}
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                    </>
                  )}
                  &nbsp;
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      onClick={() => this.props.onChangeSong(1)}
                    >
                      <path
                        className="fill_path"
                        fill="black"
                        fillRule="evenodd"
                        d="M16.444 19.222V5H20v14.222h-3.556zM4 19.222V5l10.667 7.111L4 19.222z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 mt-3">
                <span
                  className="w-100 d-block"
                  style={{ fontSize: "clamp(14px,2vw,16px)" }}
                >
                  {currentTime === null ? "0:00" : currentTime} /
                  {duration ? " " + duration : " 0:00"}
                </span>
              </div>
              <div className="col-lg-1 col-md-2 mt-3">
                <div className="d-flex justify-content-around">
                  <div onMouseLeave={() => this.handleVolumeBarDisplay(false)}>
                    <svg
                      className="volumeonsvg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      onMouseEnter={() => this.handleVolumeBarDisplay(true)}
                    >
                      <defs></defs>
                      <g
                        id="Navigation---v2"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="player-states"
                          transform="translate(-1319.000000, -278.000000)"
                          fill="#FFFFFF"
                        >
                          <g
                            id="Now-Playing---Track"
                            transform="translate(0.000000, 199.000000)"
                          >
                            <g
                              id="component/darkui/player-v2-copy-4"
                              transform="translate(0.000000, 54.000000)"
                            >
                              <g id="Player---v2">
                                <g
                                  id="More-Controls"
                                  transform="translate(1324.000000, 25.000000)"
                                >
                                  <g
                                    id="icon/volume"
                                    transform="translate(0.000000, 4.000000)"
                                  >
                                    <path
                                      fill="#999999"
                                      d="M13.2073733,7.74193548 C13.2073733,8.60887123 12.9906393,9.38508077 12.5571715,10.0705646 C12.1237041,10.7560485 11.5339859,11.2701615 10.7880184,11.6129032 L10.7880184,3.87096774 C11.5339859,4.21370942 12.1237041,4.72782245 12.5571715,5.41330632 C12.9906393,6.09879019 13.2073733,6.87499974 13.2073733,7.74193548 L13.2073733,7.74193548 Z M0.142857143,4.83870968 L4.01382488,4.83870968 L8.85253456,0 L8.85253456,15.483871 L4.01382488,10.6451613 L0.142857143,10.6451613 L0.142857143,4.83870968 Z"
                                      id="Shape"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    {showVolumeBar ? (
                      <div
                        className="volumeSidbar"
                        onMouseLeave={() => this.handleVolumeBarDisplay(false)}
                      >
                        <input
                          type="range"
                          orient="vertical"
                          max={1.0}
                          min={0.0}
                          step={0.1}
                          onInput={(e) =>
                            this.props.onSoundChange(e.currentTarget.value)
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <defs></defs>
                      <g
                        id="Navigation---v2"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="player-states"
                          transform="translate(-1355.000000, -278.000000)"
                          fill="#FFFFFF"
                        >
                          <g
                            id="Now-Playing---Track"
                            transform="translate(0.000000, 199.000000)"
                          >
                            <g
                              id="component/darkui/player-v2-copy-4"
                              transform="translate(0.000000, 54.000000)"
                            >
                              <g id="Player---v2">
                                <g
                                  id="More-Controls"
                                  transform="translate(1324.000000, 25.000000)"
                                >
                                  <g
                                    id="icon/shuffle"
                                    transform="translate(31.000000, 0.000000)"
                                  >
                                    <path
                                      className="fill_path"
                                      fill="#999999"
                                      d="M10.5937499,9.40725781 L9.18749973,10.768145 L4,5.747984 L5.40625013,4.38709677 L10.5937499,9.40725781 Z M14.5,4.38709677 L20,4.38709677 L20,9.70967742 L18,7.77419355 L5.40625013,19.8709677 L4,18.5100805 L16.5,6.32258065 L14.5,4.38709677 Z M14.8125003,13.4899195 L18,16.3931453 L20,14.4576614 L20,19.7802421 L14.5,19.7802421 L16.5,17.8447582 L13.4062501,14.8508067 L14.8125003,13.4899195 Z"
                                      id="Shape"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <svg
                      className="repeatallsvg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <defs></defs>
                      <g
                        id="Navigation---v2"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="player-states"
                          transform="translate(-1391.000000, -278.000000)"
                          fill="#FF3C00"
                        >
                          <g
                            id="Now-Playing---Track"
                            transform="translate(0.000000, 199.000000)"
                          >
                            <g
                              id="component/darkui/player-v2-copy-4"
                              transform="translate(0.000000, 54.000000)"
                            >
                              <g id="Player---v2">
                                <g
                                  id="More-Controls"
                                  transform="translate(1324.000000, 25.000000)"
                                >
                                  <g
                                    id="icon/repeat"
                                    transform="translate(71.000000, 4.000000)"
                                  >
                                    <path
                                      className="fill_path"
                                      fill="#999999"
                                      d="M0,8.12903226 C0,6.37499974 0.567708267,4.80745961 1.7031248,3.42641135 C2.83854187,2.0453631 4.27083307,1.13306426 6,0.689516387 L6,2.62500026 C4.83333333,3.06854813 3.875,3.78931458 3.125,4.78729858 C2.375,5.78528206 2,6.89919381 2,8.12903226 C2,9.78225806 2.6041664,11.1330643 3.81250027,12.1814514 L6,10.0645161 L6,15.8709677 L0,15.8709677 L2.40625013,13.5423386 C0.8020832,12.1108872 0,10.3064516 0,8.12903226 L0,8.12903226 Z M16,0.387096774 L13.5937499,2.80645161 C15.1979168,4.25806452 16,6.06250013 16,8.21975794 C16,9.99395148 15.4322917,11.5715726 14.2968752,12.9526209 C13.1614581,14.3336692 11.7291669,15.2459675 10,15.6895164 L10,13.6330643 C11.1666667,13.1895164 12.125,12.4687499 12.875,11.4707659 C13.625,10.4727825 14,9.35887071 14,8.12903226 C14,6.47580645 13.3958336,5.12500026 12.1874997,4.07661316 L10,6.19354839 L10,0.387096774 L16,0.387096774 Z"
                                      id="Shape"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CurrentMusicPage;
