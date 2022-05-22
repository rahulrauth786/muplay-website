import React, { Component } from "react";
import Slider from "react-slick";

import "./topPicks.css";
class TopPicksMusic extends Component {
  state = {
    booking: [
      { type: "hindi", img: "https://i.ibb.co/4P0L6Rz/t1.webp" },
      { type: "punjabi", img: "https://i.ibb.co/6sqjSMt/t2.webp" },
      { type: "international", img: "https://i.ibb.co/BNbLTnc/t3.webp" },
      { type: "trendingAround", img: "https://i.ibb.co/tXf6J0W/t4.webp" },
      { type: "party", img: "https://i.ibb.co/jkVsCSj/t5.webp" },
      { type: "international", img: "https://i.ibb.co/q1HhDsg/t6.webp" },
      { type: "hindi", img: "https://i.ibb.co/6RqmpQB/t7.webp" },
      { type: "hindi", img: "https://i.ibb.co/jhnZvyX/t8.webp" },
    ],
    showPlayButton: false,
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
            onClick={() => this.props.viewAllSongs("trendSongs")}
          >
            Top Picks
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
              {this.state.booking.map((book) => (
                <div
                  className="text-center ideslr"
                  onMouseLeave={() => this.handlePlayButton(book.img, false)}
                >
                  <img
                    src={book.img}
                    style={{
                      width: "98%",
                      height: 190,
                      margin: "auto",
                      borderRadius: 5,
                    }}
                    onMouseEnter={() => this.handlePlayButton(book.img, true)}
                    onClick={() =>
                      this.props.history.push(`/topPicks/${book.type}`)
                    }
                  />

                  {book.playButton ? (
                    <div
                      className="rounded-circle border border-dark p-2 onPlay d-md-block d-none"
                      onClick={() =>
                        this.props.history.push(`/topPicks/${book.type}`)
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

export default TopPicksMusic;
