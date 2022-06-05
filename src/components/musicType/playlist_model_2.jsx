import React, { Component } from "react";
import Slider from "react-slick";
import { get_app_playlist_song } from "../../services/playlistService";
import "./playlist_model_2.css";
import CustomLoader from "../common/loader";
//import { get_app_playlistmeta } from "../../services/playlistService";
class Playlist_Model_2 extends Component {
  state = {
    app_playlist_meta: [],
    data: [],
  };
  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.state.load = false;
  }

  async componentDidMount() {
    try {
      let response = await get_app_playlist_song(this.props.name);
      this.setState({ app_playlist_meta: response.data, load: true });
    } catch (error) {
      alert(error);
    }
  }

  handleNext() {
    this.slider.slickNext();
  }

  handlePrev() {
    this.slider.slickPrev();
  }
  handlePlayButton = (image, ok) => {
    let app_playlist_metas = [...this.state.app_playlist_meta];
    let index = app_playlist_metas.findIndex(
      (app_playlist_meta) => app_playlist_meta.image === image
    );
    let app_playlist_meta = app_playlist_metas[index];
    app_playlist_meta.playButton = ok;
    this.setState({ app_playlist_meta: app_playlist_metas });
  };
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 1,
      arrows: false,
      center: true,

      responsive: [
        {
          breakpoint: 1840,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 1,
            infinite: true,

            dots: false,
          },
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        {this.state.load ? (
          <>
            <div className="row">
              <div className="col-6">
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(15px,2vw,17px)",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      paddingBottom: 15,

                      color: "black",
                    }}
                    onClick={() => this.props.history.push(this.props.endPoint)}
                  >
                    {this.props.name}
                  </span>
                </div>
              </div>
              <div
                className="col-6 text-right pr-4"
                onClick={() => this.props.history.push(this.props.endPoint)}
              >
                <span
                  style={{
                    color: "red",
                    fontWeight: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  View all &nbsp;
                  <svg width="10" height="14" viewBox="0 0 10 17">
                    <path
                      class="fill_path"
                      fill="red"
                      fill-rule="evenodd"
                      d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div
              className="left  d-sm-block d-none"
              style={{
                position: "absolute",
                top: 80,
                left: -20,
                zIndex: 1,
              }}
              onClick={() => this.handlePrev()}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                data-value="leftslide"
                data-count="3"
              >
                <g class="fill_path" fill-rule="evenodd">
                  <path
                    fill="#999999"
                    d="M14 17.414L15.414 16l-7-7 7-7L14 .586 5.586 9z"
                  ></path>
                  <path
                    fill="#999999"
                    d="M9 17.414L10.414 16l-7-7 7-7L9 .586.586 9z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="row">
              <div className="col-12">
                {" "}
                <Slider {...settings} ref={(slider) => (this.slider = slider)}>
                  {this.state.app_playlist_meta.map((item) => (
                    <>
                      <div
                        className="text-left text-truncate "
                        style={{ width: "90%", height: 160 }}
                        onMouseLeave={() =>
                          this.handlePlayButton(item.image, false)
                        }
                      >
                        <img
                          src={item.image}
                          style={{
                            width: "100%",
                            height: 130,
                            margin: "auto",
                            borderRadius: 5,
                          }}
                          onMouseEnter={() =>
                            this.handlePlayButton(item.image, true)
                          }
                          onClick={() =>
                            this.props.history.push(
                              `/${this.props.endPoint}/${item.title}/${item.id}`
                            )
                          }
                        />
                        <span
                          style={{
                            color: "black",
                            textTransform: "capitalize",
                            display: "block",
                            paddingLeft: 5,
                            paddingTop: 10,
                            fontSize: 14,
                          }}
                        >
                          {item.title}
                        </span>
                        {item.playButton ? (
                          <div
                            className="rounded-circle border border-dark  onPlay3 d-md-block d-none"
                            style={{ paddingLeft: 12, paddingTop: 9 }}
                            onClick={() =>
                              this.props.history.push(
                                `/${this.props.endPoint}/${item.title}/${item.id}`
                              )
                            }
                          >
                            <svg width="23" height="23" viewBox="0 0 20 24">
                              <path
                                className="fill_path"
                                data-premium-value="0"
                                data-title="play"
                                data-value="playlist8074669"
                                fill-rule="evenodd"
                                fill="white"
                                d="M0 0v24l20-12z"
                                data-pjax=""
                                href="/playlist/gaana-dj-new-releases-hot-20-hindi"
                              ></path>
                            </svg>
                          </div>
                        ) : (
                          <div className="p-4"></div>
                        )}
                      </div>
                    </>
                  ))}
                </Slider>
              </div>
            </div>
            <div
              className="right  d-sm-block d-none"
              style={{
                position: "absolute",
                top: 80,
                right: -10,
                zIndex: 1,
              }}
              onClick={() => this.handleNext()}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                data-value="rightslide"
                data-count="3"
              >
                <g class="fill_path" fill-rule="evenodd">
                  <path
                    fill="#999999"
                    d="M2 17.414L.586 16l7-7-7-7L2 .586 10.414 9z"
                  ></path>
                  <path
                    fill="#999999"
                    d="M7 17.414L5.586 16l7-7-7-7L7 .586 15.414 9z"
                  ></path>
                </g>
              </svg>
            </div>
          </>
        ) : (
          <>
            <CustomLoader />
          </>
        )}
      </>
    );
  }
}

export default Playlist_Model_2;
