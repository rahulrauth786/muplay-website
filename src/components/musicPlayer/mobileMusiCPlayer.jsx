import React, { Component } from "react";

class MobileMusicPlayer extends Component {
  state = { open: false };
  getCurrentProgress(currentTime, duration) {
    let progress = (currentTime / duration) * 100;
    return progress + "%";
  }
  render() {
    const { currentSong, rawTime, rawDuration, loading } = this.props;
    let progress = this.getCurrentProgress(rawTime, rawDuration);
    return (
      <>
        <div className="row bg-white" style={{ height: 60 }}>
          <div className="col-12">
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
          <div className="col-2  text-center">
            <i className="fa fa-chevron-down mt-2 px-2 "></i>
          </div>
          <div
            className="col-7  text-left"
            style={{ lineHeight: 0.8, overflow: "hidden" }}
          >
            <div className="row">
              <div className="col-3">
                <img src={currentSong.img} style={{ width: 45, height: 45 }} />
              </div>
              <div className="col-9">
                <span
                  className="text-truncate text-dark d-block "
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  {currentSong.title}
                </span>
                <br />
                <span className="text-truncate" style={{ fontSize: 14 }}>
                  {currentSong.artist}
                </span>
              </div>
            </div>
          </div>
          <div className="col text-right pr-5 pt-1">
            {currentSong.music ? (
              progress !== "NaN%" ? (
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  onClick={() =>
                    this.props.onUpdatePlayedSong(this.props.currentSong)
                  }
                >
                  <defs></defs>
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-280.000000, -239.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <g transform="translate(20.000000, 213.000000)">
                        <g transform="translate(260.000000, 26.000000)">
                          <path
                            className="fill_path"
                            fill="red"
                            d="M14,19 L18,19 L18,5 L14,5 L14,19 Z M6,19 L10,19 L10,5 L6,5 L6,19 Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ) : (
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 24"
                onClick={() =>
                  this.props.onUpdatePlayedSong(this.props.currentSong)
                }
              >
                <path
                  className="fill_path"
                  fillRule="evenodd"
                  fill="red"
                  d="M0 0v24l20-12z"
                ></path>{" "}
              </svg>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MobileMusicPlayer;
