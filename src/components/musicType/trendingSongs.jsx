import React, { Component } from "react";
import Slider from "react-slick";
import "./trendingSongs.css";
class TrendingSongs extends Component {
  state = {
    booking: [
      { type: "Badaami Rang", img: "https://i.ibb.co/MRmG3b8/tr2.webp" },
      { type: "Baby Girl", img: "https://i.ibb.co/gdRPFwh/babyGirl.jpg" },
      {
        type: "Laila",
        img:
          "https://a10.gaanacdn.com/images/albums/86/3475586/crop_175x175_3475586.jpg",
      },
      {
        type: "Kya Karu",
        img:
          "https://a10.gaanacdn.com/images/albums/57/3459557/crop_175x175_3459557.jpg",
      },
      {
        type: "BurjKhalifa",
        img: "https://i.ibb.co/bmgkpy3/burg-Khalifa.webp",
      },
      { type: "Gucci", img: "https://i.ibb.co/8s5YQ0k/gucci.jpg" },
      {
        type: "Main Yeh Haath Jo",
        img:
          "https://a10.gaanacdn.com/gn_img/albums/10q3Z1K52r/0q3Z2Yyn35/size_m_1602830211.jpg",
      },
      { type: "Judaiyaan", img: "https://i.ibb.co/28HQQ9w/judaiyan.jpg" },
      { type: "Teri Aankhon Mein", img: "https://i.ibb.co/Jk2HRtv/lonely.jpg" },

      { type: "Time Chakda", img: "https://i.ibb.co/xX1sRnN/time-Chakra.jpg" },
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
  handlePlayButton = (img, ok) => {
    let bookings = [...this.state.booking];
    let index = bookings.findIndex((booking) => booking.img === img);
    let booking = bookings[index];
    booking.playButton = ok;
    this.setState({ booking: bookings });
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
                onClick={() => this.props.viewAllSongs("trendSongs")}
              >
                Trending Songs
              </span>
            </div>
          </div>
          <div
            className="col-6 text-right pr-4"
            onClick={() => this.props.viewAllSongs("trendSongs")}
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
              {this.state.booking.map((book) => (
                <>
                  <div
                    className="text-left text-truncate "
                    style={{ width: "90%", height: 160 }}
                    onMouseLeave={() => this.handlePlayButton(book.img, false)}
                  >
                    <img
                      src={book.img}
                      style={{
                        width: "100%",
                        height: 130,
                        margin: "auto",
                        borderRadius: 5,
                      }}
                      onMouseEnter={() => this.handlePlayButton(book.img, true)}
                      onClick={() =>
                        this.props.history.push(`/trendingSong/${book.type}`)
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
                      {book.type}
                    </span>
                    {book.playButton ? (
                      <div
                        className="rounded-circle border border-dark  onPlay3 d-md-block d-none"
                        style={{ paddingLeft: 12, paddingTop: 9 }}
                        onClick={() =>
                          this.props.history.push(`/trendingSong/${book.type}`)
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
    );
  }
}

export default TrendingSongs;
