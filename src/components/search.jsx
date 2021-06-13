import React, { Component } from "react";
import Navbar from "./navbar";

import "./search.css";
import { searchSong } from "./../services/musicService";
import Footer from "./footer";
class SearchMusic extends Component {
  state = {
    booking: [],
  };

  constructor() {
    super();
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  async componentDidMount() {
    try {
      let response = await searchSong(this.props.match.params.searchType);
      this.setState({ booking: response.data });
    } catch (error) {}
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.searchType !== this.props.match.params.searchType
    ) {
      try {
        let response = await searchSong(this.props.match.params.searchType);
        console.log(response);
        this.setState({ booking: response.data });
      } catch (error) {}
    }
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
  handlePlayButton = (title, ok) => {
    let bookings = [...this.state.booking];
    let index = bookings.findIndex((booking) => booking.title === title);
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
            <div className="row mt-5">
              <div className="col-12">
                <p
                  className="d-block ml-4"
                  style={{ fontSize: 25, color: "#999999" }}
                >
                  Search results for{" "}
                  <span style={{ color: "black" }}>
                    {this.props.match.params.searchType}
                  </span>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="mt-5 ml-4 ">
                  <h5 onClick={() => this.props.history.push(`/song`)}>
                    Top Result
                  </h5>
                </div>
              </div>
            </div>

            <div className="row mx-1">
              <div className="col-12">
                <div className="d-flex flex-wrap justify-content-start">
                  {this.state.booking.map((book, index) => (
                    <div
                      className="p-2 text-truncate"
                      style={{ width: 180 }}
                      onMouseLeave={() =>
                        this.handlePlayButton(book.title, false)
                      }
                    >
                      <img
                        src={book.img}
                        c
                        style={{
                          width: "100%",
                          height: 180,
                          borderRadius: 5,
                        }}
                        onClick={() =>
                          this.props.history.push(`/song/${book.title}`)
                        }
                        onMouseEnter={() =>
                          this.handlePlayButton(book.title, true)
                        }
                      />
                      <br />
                      <div
                        className="text-truncate mt-1"
                        style={{
                          whiteSpace: "nowrap",
                          overFlow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {book.title}
                      </div>
                      {/* {book.playButton ? (
                        <div
                          className="row rounded-circle border border-dark p-2 onPlay5 d-xl-block d-none "
                          onClick={() =>
                            this.props.history.push(`/song/${book.title}`)
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
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <div className="col-2 d-md-block d-none"></div>
        </div>
      </>
    );
  }
}

export default SearchMusic;
