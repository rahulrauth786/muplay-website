import React, { Component } from "react";
import Slider from "react-slick";

import "./playlist_model_1.css";
class Playlist_Model_1 extends Component {
  state = {
    app_playlist_meta: [
      {
        app_playist_id: "",
        title: "hindi",
        image: "https://i.ibb.co/4P0L6Rz/t1.webp",
      },
      {
        app_playist_id: "",
        title: "punjabi",
        image: "https://i.ibb.co/6sqjSMt/t2.webp",
      },
      {
        app_playist_id: "",
        title: "international",
        image: "https://i.ibb.co/BNbLTnc/t3.webp",
      },
      {
        app_playist_id: "",
        title: "trendingAround",
        image: "https://i.ibb.co/tXf6J0W/t4.webp",
      },
      {
        app_playist_id: "",
        title: "party",
        image: "https://i.ibb.co/jkVsCSj/t5.webp",
      },
      {
        app_playist_id: "",
        title: "international",
        image: "https://i.ibb.co/q1HhDsg/t6.webp",
      },
      {
        app_playist_id: "",
        title: "hindi",
        image: "https://i.ibb.co/6RqmpQB/t7.webp",
      },
      {
        app_playist_id: "",
        title: "hindi",
        image: "https://i.ibb.co/jhnZvyX/t8.webp",
      },
    ],
    app_playlist: [],
    showPlayButton: false,
  };

  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.state.playlist = props.app_playlist;
  }

  componentDidMount() {}

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
    const { showPlayButton } = this.state;
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows: false,
      center: true,

      slidesToShow: 4,
      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    };
    return (
      <>
        <div>
          <span
            style={{
              display: "block",
              fontSize: "clamp(15px,2vw,17px)",
              textTransform: "uppercase",
              fontWeight: 500,
              paddingBottom: 15,
              paddingLeft: 10,
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => this.props.history.push(this.props.endPoint)}
          >
            {this.props.name}
          </span>
        </div>

        <div
          className="rounded-circle bg-white left  d-sm-block d-none"
          style={{
            width: 50,
            height: 50,
            paddingTop: 11,
            paddingLeft: 16,
            position: "absolute",
            zIndex: 1,
            top: 105,
            left: -8,
          }}
          onClick={() => this.handlePrev()}
        >
          <svg
            width="16"
            height="18"
            viewBox="0 0 10 17"
            style={{ transform: "rotate(180deg)" }}
          >
            <path
              class="fill_path"
              fill="black"
              fill-rule="evenodd"
              d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"
            ></path>
          </svg>
        </div>

        <div className="row">
          <div className="col-12">
            <Slider {...settings} ref={(slider) => (this.slider = slider)}>
              {this.state.app_playlist_meta.map((item) => (
                <div
                  className="text-center ideslr"
                  onMouseLeave={() => this.handlePlayButton(item.image, false)}
                >
                  <img
                    src={item.image}
                    style={{
                      width: "98%",
                      height: 190,
                      margin: "auto",
                      borderRadius: 5,
                    }}
                    onMouseEnter={() => this.handlePlayButton(item.image, true)}
                    onClick={() =>
                      this.props.history.push(
                        `/${this.props.endPoint}/${item.title}`
                      )
                    }
                  />

                  {item.playButton ? (
                    <div
                      className="rounded-circle border border-dark p-2 onPlay d-md-block d-none"
                      onClick={() =>
                        this.props.history.push(
                          `/${this.props.endPoint}/${item.title}`
                        )
                      }
                    >
                      <svg width="23" height="23" viewBox="0 0 20 24">
                        <path
                          className="fill_path"
                          data-premium-value="0"
                          data-type="play"
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
              ))}
            </Slider>
          </div>
        </div>

        <div
          className="rounded-circle bg-white right  d-sm-block d-none"
          style={{
            width: 50,
            height: 50,
            paddingTop: 11,
            paddingLeft: 18,
            position: "absolute",
            zIndex: 1,
            top: 105,
            right: -10,
            cursor: "pointer",
          }}
          onClick={() => this.handleNext()}
        >
          <svg width="16" height="18" viewBox="0 0 10 17">
            <path
              class="fill_path"
              fill="black"
              fill-rule="evenodd"
              d="M1.414 0L0 1.414l7 7-7 7 1.414 1.414 8.414-8.414z"
            ></path>
          </svg>
        </div>
      </>
    );
  }
}

export default Playlist_Model_1;
