import React, { Component } from "react";
import Slider from "react-slick";
import Navbar from "../navbar";
import "./allTopCharts.css";
class AllTopCharts extends Component {
  state = {
    booking: [
      { type: "hindi", img: "https://i.ibb.co/W2LYBDS/hindi.webp" },
      { type: "punjabi", img: "https://i.ibb.co/2qqppkt/punjabi.webp" },
      { type: "bhakti", img: "https://i.ibb.co/TBWtJc9/bhakti.webp" },
      {
        type: "globallyTrending",
        img: "https://i.ibb.co/Ngqp43C/globally.webp",
      },
      {
        type: "international",
        img: "https://i.ibb.co/x752h9Y/international.webp",
      },
      {
        type: "newReleaseHot",
        img: "https://i.ibb.co/qNrNqx4/new-Release.webp",
      },
      { type: "trendingAround", img: "https://i.ibb.co/518thjF/trending.webp" },
      { type: "romance", img: "https://i.ibb.co/LtFQqf1/romance.webp" },
      { type: "todays", img: "https://i.ibb.co/Gv4bsXb/today.webp" },
      { type: "punjabiParty", img: "https://i.ibb.co/2qqppkt/punjabi.webp" },
      { type: "us", img: "https://i.ibb.co/RvV4hTG/us.webp" },
    ],
  };

  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  handleNext(e) {
    e.preventDefault();
    console.log(this.slider);
    this.slider.slickNext();
  }

  handlePrev(e) {
    e.preventDefault();
    console.log(this.slider);
    this.slider.slickPrev();
  }
  handlePlayButton = (type, ok) => {
    let bookings = [...this.state.booking];
    let index = bookings.findIndex((booking) => booking.type === type);
    let booking = bookings[index];
    booking.playButton = ok;
    this.setState({ booking: bookings });
  };
  render() {
    return (
      <>
        <Navbar {...this.props} />
        <div
          className="row "
          style={{ backgroundColor: "#eee", height: "100vh" }}
        >
          <div className="col-1 d-md-block d-none"></div>
          <div className="col-sm-12 col-md-10 col-lg-9">
            <div className="mt-5 ml-4 ">
              <h5 onClick={() => this.props.history.push(`/topCharts`)}>
                Top Charts
              </h5>
            </div>

            <div className="row mx-1">
              {this.state.booking.map((book) => (
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2 text-center songThumbNail text-center"
                  style={{ outline: "none" }}
                  onMouseLeave={() => this.handlePlayButton(book.type, false)}
                >
                  <img
                    src={book.img}
                    style={{
                      width: "95%",

                      height: "80%",
                      borderRadius: 5,
                    }}
                    onClick={() =>
                      this.props.history.push(`/topCharts/${book.type}`)
                    }
                    onMouseEnter={() => this.handlePlayButton(book.type, true)}
                  />
                  {book.playButton ? (
                    <div
                      className="row rounded-circle border border-dark p-2 onPlay5 d-lg-block d-none"
                      onClick={() =>
                        this.props.history.push(`/topCharts/${book.type}`)
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
                    <div className="dash"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="col-2 d-md-block d-none"></div>
        </div>
      </>
    );
  }
}

export default AllTopCharts;
