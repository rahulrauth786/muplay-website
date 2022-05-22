import React, { Component } from "react";
import Slider from "react-slick";
import "./playlist_model_3";
class Playlist_Model_3 extends Component {
  state = {
    app_playlist_meta: [
      { title: "hindi", image: "https://i.ibb.co/W2LYBDS/hindi.webp" },
      { title: "punjabi", image: "https://i.ibb.co/2qqppkt/punjabi.webp" },
      { title: "bhakti", image: "https://i.ibb.co/TBWtJc9/bhakti.webp" },
      {
        title: "global_trending",
        image: "https://i.ibb.co/Ngqp43C/globally.webp",
      },
      {
        title: "international",
        image: "https://i.ibb.co/x752h9Y/international.webp",
      },
      {
        title: "new_release_hot",
        image: "https://i.ibb.co/qNrNqx4/new-Release.webp",
      },
      {
        title: "trending_around",
        image: "https://i.ibb.co/518thjF/trending.webp",
      },
      { title: "romance", image: "https://i.ibb.co/LtFQqf1/romance.webp" },
      { title: "todays", image: "https://i.ibb.co/Gv4bsXb/today.webp" },
      {
        title: "punjabi_party",
        image: "https://i.ibb.co/2qqppkt/punjabi.webp",
      },
      { title: "us", image: "https://i.ibb.co/RvV4hTG/us.webp" },
    ],
  };

  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
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
      slidesToScroll: 2,
      arrows: false,
      center: true,
      responsive: [
        {
          breakpoint: 1840,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
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
                  paddingLeft: 10,
                  color: "black",
                }}
                onClick={() => this.props.viewAllSongs("trendSongs")}
              >
                {this.props.name}
              </span>
            </div>
          </div>
          <div
            className="col-6 text-right pr-4"
            onClick={() => this.props.history.push("/topcharts")}
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
          className="left d-sm-block d-none"
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
            <Slider {...settings} ref={(slider) => (this.slider = slider)}>
              {this.state.app_playlist_meta.map((book) => (
                <div
                  className="text-left "
                  style={{ width: "90%", height: 170, outline: "none" }}
                  onMouseLeave={() => this.handlePlayButton(book.image, false)}
                >
                  <img
                    src={book.image}
                    style={{
                      width: "90%",
                      height: 140,
                      margin: "auto",
                      borderRadius: 5,
                    }}
                    onClick={() =>
                      this.props.history.push(
                        `/${this.props.endPoint}/${book.title}`
                      )
                    }
                    onMouseEnter={() => this.handlePlayButton(book.image, true)}
                  />{" "}
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
                    {book.title}
                  </span>
                  {book.playButton ? (
                    <div
                      className="rounded-circle border border-dark  onPlay2 d-md-block d-none"
                      style={{ paddingLeft: 12, paddingTop: 9 }}
                      onClick={() =>
                        this.props.history.push(
                          `/${this.props.endPoint}/${book.title}`
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
    );
  }
}

export default Playlist_Model_3;
