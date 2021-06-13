import React, { Component } from "react";
import "./musicPlayer.css";
import Collapse from "react-bootstrap/Collapse";

import MusicOptionsAll from "./musicoptionAll";
import MusicMobileOption from "./musicoptionMobile";
import {
  addSongToFavourites,
  getAllFavList,
  removeSongToFavourites,
} from "../../services/musicService";

class MusicPlayerPage extends Component {
  state = {
    selectedIndex: 0,
    showOptions: null,
    open: false,
    songs: this.props.songs,
    favourites: [],
    loading: false,
    user: false,
  };

  async componentDidMount() {
    let token = JSON.parse(sessionStorage.getItem("token"))
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    if (token !== null) {
      let response = await getAllFavList(token);

      if (response.data.msg === "success") {
        this.setState({
          favourites: response.data.songs,
          loading: true,
          user: true,
        });
      } else {
        if (
          response.data.msg === "No Songs" ||
          response.data.msg === "No User"
        ) {
          this.setState({
            loading: true,
            user: true,
          });
        }
      }
    } else {
      this.setState({ loading: true });
    }
  }

  handleMouseEnter = (index) => {
    this.setState({ selectedIndex: index });
  };
  handleMouseLeave = () => {
    this.setState({ selectedIndex: -1 });
  };
  getCurrentProgress(currentTime, duration) {
    let progress = (currentTime / duration) * 100;
    return progress + "%";
  }

  handleMusicOptions = (song) => {
    let songs = [...this.state.songs];
    let index = songs.findIndex((obj) => obj.title === song.title);
    if (index >= 0) {
      let song = songs[index];
      song.open = !song.open;
      this.setState({ songs });
    }
  };

  showMusicOptions = (songSel) => {
    let showOptions = this.state.showOptions;
    if (showOptions === songSel.title) {
      this.setState({ showOptions: "" });
    } else this.setState({ showOptions: songSel.title });
  };

  handleHeartClick = async (value, song) => {
    let token = JSON.parse(sessionStorage.getItem("token"))
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    if (value === true) {
      try {
        let response = await addSongToFavourites(song.id, token);
        if (response) {
          if (response.data.msg) {
            let response = await getAllFavList(token);
            if (response.data.msg === "success")
              this.setState({ favourites: response.data.songs });
          }
        }
      } catch (error) {}
    } else {
      try {
        let response = await removeSongToFavourites(song.id, token);
        if (response.data.msg) {
          if (response.data.msg) {
            let response = await getAllFavList(token);
            if (response.data.msg === "success")
              this.setState({ favourites: response.data.songs });
          }
        }
      } catch (error) {}
    }
  };

  render() {
    const { selectedIndex, songs, favourites, user } = this.state;
    const { currentSong, rawTime, rawDuration } = this.props;

    return this.state.loading ? (
      <>
        <div className="row ">
          <div className="col-12 text-left py-3 pl-5">
            <div className="row">
              <div className="col-12">
                <div className="blurImg">
                  {this.props.match.params.option === "trendingSong" &&
                  this.props.match.params.type === undefined ? (
                    <img
                      className="img "
                      src="https://css375.gaanacdn.com/images/autoQueue-bg.png"
                      alt="Bhakti Top 20"
                    />
                  ) : songs[0].genreImg ? (
                    <img
                      className="img "
                      src={songs[0].genreImg}
                      alt="Bhakti Top 20"
                    />
                  ) : (
                    <img
                      className="img "
                      src={songs[0].img}
                      alt="Bhakti Top 20"
                    />
                  )}
                </div>
                {this.props.match.params.option !== "trendingSong" ? (
                  this.props.match.params.option === "song" ? (
                    <div className="row ">
                      <div className="col-12 col-md-4 col-lg-12 text-center">
                        <div className="row">
                          <div className="col-12 mb-2 d-md-block d-none">
                            <div className="d-flex">
                              <div className="mr-4" id="image">
                                <img
                                  src={
                                    this.props.match.params.option === "song"
                                      ? songs[0].img
                                      : songs[0].genreImg
                                  }
                                  style={{ width: 150, height: 150 }}
                                />
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontSize: 25,
                                    color: "black",
                                    fontWeight: 500,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {this.props.match.params.type}
                                </div>
                                <div
                                  className="mb-5"
                                  style={{
                                    fontSize: 13,
                                    color: "#999999",
                                    fontWeight: 500,
                                  }}
                                >
                                  <p>
                                    Created By Gaana{" "}
                                    {this.props.match.params.option === "song"
                                      ? " User "
                                      : ""}
                                    | Track {this.props.songs.length}
                                  </p>
                                </div>
                                <div>
                                  <button
                                    className="btn"
                                    style={{
                                      backgroundColor: "#e72c30",
                                      fontWeight: 500,
                                      color: "white",
                                      width: 160,
                                      borderRadius: 50,
                                    }}
                                    onClick={() =>
                                      this.props.onUpdatePlayedSong(
                                        this.props.currentSong
                                      )
                                    }
                                  >
                                    {currentSong && currentSong.music ? (
                                      <>
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          className="_paus"
                                        >
                                          {" "}
                                          <g fill="none" fillRule="nonzero">
                                            {" "}
                                            <path
                                              className="fill_path"
                                              fill="white"
                                              d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                                            ></path>{" "}
                                            <path
                                              className="fill_path"
                                              fill-opacity=".01"
                                              d="M1 1h22v22H1z"
                                            ></path>{" "}
                                          </g>{" "}
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PAUSE</span>
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          width="16"
                                          height="18"
                                          viewBox="0 0 20 24"
                                          className="_ply"
                                        >
                                          <path
                                            className="fill_path"
                                            value="-3"
                                            fill="white"
                                            fillRule="evenodd"
                                            d="M0 0v24l20-12z"
                                          ></path>
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PLAY ALL</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-2 d-md-none">
                            <div className="text-center">
                              <div className=" my-1" id="image">
                                <img
                                  src={
                                    this.props.match.params.option === "song"
                                      ? songs[0].img
                                      : songs[0].genreImg
                                  }
                                  style={{ width: 150, height: 150 }}
                                />
                              </div>
                              <div className="text-center">
                                {/* <div
                        style={{
                          fontSize: 25,
                          color: "black",
                          fontWeight: 500,
                          textTransform: "capitalize",
                        }}
                      >
                        {this.props.match.params.type}
                      </div> */}
                                <div
                                  style={{
                                    fontSize: 18,
                                    color: "black",
                                    fontWeight: 500,
                                  }}
                                >
                                  7 Tracks
                                </div>
                                <div>
                                  <button
                                    className="btn"
                                    style={{
                                      backgroundColor: "#e72c30",
                                      fontWeight: 500,
                                      color: "white",
                                      width: 160,
                                      borderRadius: 50,
                                    }}
                                    onClick={() =>
                                      this.props.onUpdatePlayedSong(
                                        this.props.currentSong
                                      )
                                    }
                                  >
                                    {currentSong && currentSong.music ? (
                                      <>
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          className="_paus"
                                        >
                                          {" "}
                                          <g fill="none" fillRule="nonzero">
                                            {" "}
                                            <path
                                              className="fill_path"
                                              fill="white"
                                              d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                                            ></path>{" "}
                                            <path
                                              className="fill_path"
                                              fill-opacity=".01"
                                              d="M1 1h22v22H1z"
                                            ></path>{" "}
                                          </g>{" "}
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PAUSE</span>
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          width="16"
                                          height="18"
                                          viewBox="0 0 20 24"
                                          className="_ply"
                                        >
                                          <path
                                            className="fill_path"
                                            value="-3"
                                            fill="white"
                                            fillRule="evenodd"
                                            d="M0 0v24l20-12z"
                                          ></path>
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PLAY ALL</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // <div className="row ">
                    //   <div className="col-12 col-md-2 col-lg-1 text-center">
                    //     <img
                    //       src={songs[0].img}
                    //       style={{ width: 150, height: 150 }}
                    //     />
                    //   </div>
                    //   <div className="col-12 col-md-4 col-lg-4 text-center">
                    //     <div className="row">
                    //       <div className="col-12 mb-2">
                    //         <span
                    //           style={{
                    //             fontSize: 25,
                    //             color: "black",
                    //             fontWeight: 500,
                    //             textTransform: "capitalize",
                    //           }}
                    //         >
                    //           {this.props.match.params.type}
                    //         </span>
                    //         <br />
                    //         {this.props.match.params.option === "playlist" ? (
                    //           <span
                    //             style={{
                    //               fontSize: 13,
                    //               color: "#999999",
                    //               fontWeight: 500,
                    //             }}
                    //           >
                    //             Created By Gaana User | Track 10
                    //           </span>
                    //         ) : (
                    //           <span
                    //             style={{
                    //               fontSize: 13,
                    //               color: "#999999",
                    //               fontWeight: 500,
                    //             }}
                    //           >
                    //             Created By Gaana | Track 10
                    //           </span>
                    //         )}
                    //       </div>
                    //       <div className="col-12 mt-5">
                    //         <button
                    //           className="btn"
                    //           style={{
                    //             backgroundColor: "#e72c30",
                    //             fontWeight: 500,
                    //             color: "white",
                    //             width: 160,
                    //             borderRadius: 50,
                    //           }}
                    //           onClick={() =>
                    //             this.props.onUpdatePlayedSong(
                    //               this.props.currentSong
                    //             )
                    //           }
                    //         >
                    //           {currentSong && currentSong.music ? (
                    //             <>
                    //               <svg
                    //                 width="24"
                    //                 height="24"
                    //                 viewBox="0 0 24 24"
                    //                 className="_paus"
                    //               >
                    //                 {" "}
                    //                 <g fill="none" fillRule="nonzero">
                    //                   {" "}
                    //                   <path
                    //                     className="fill_path"
                    //                     fill="white"
                    //                     d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                    //                   ></path>{" "}
                    //                   <path
                    //                     className="fill_path"
                    //                     fill-opacity=".01"
                    //                     d="M1 1h22v22H1z"
                    //                   ></path>{" "}
                    //                 </g>{" "}
                    //               </svg>
                    //               &nbsp; &nbsp;
                    //               <span>PAUSE</span>
                    //             </>
                    //           ) : (
                    //             <>
                    //               <svg
                    //                 width="16"
                    //                 height="18"
                    //                 viewBox="0 0 20 24"
                    //                 className="_ply"
                    //               >
                    //                 <path
                    //                   className="fill_path"
                    //                   value="-3"
                    //                   fill="white"
                    //                   fillRule="evenodd"
                    //                   d="M0 0v24l20-12z"
                    //                 ></path>
                    //               </svg>
                    //               &nbsp; &nbsp;
                    //               <span>PLAY ALL</span>
                    //             </>
                    //           )}
                    //         </button>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <div className="row ">
                      <div className="col-12 col-md-4 col-lg-12 text-center">
                        <div className="row">
                          <div className="col-12 mb-2 d-md-block d-none">
                            <div className="d-flex">
                              <div className="mr-4" id="image">
                                <img
                                  src={
                                    this.props.match.params.option ===
                                    "playlist"
                                      ? songs[0].img
                                      : songs[0].genreImg
                                  }
                                  style={{ width: 150, height: 150 }}
                                />
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontSize: 25,
                                    color: "black",
                                    fontWeight: 500,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {this.props.match.params.type}
                                </div>
                                <div
                                  className="mb-5"
                                  style={{
                                    fontSize: 13,
                                    color: "#999999",
                                    fontWeight: 500,
                                  }}
                                >
                                  <p>
                                    Created By Gaana{" "}
                                    {this.props.match.params.option ===
                                    "playlist"
                                      ? " User "
                                      : ""}
                                    | Track {songs.length}
                                  </p>
                                </div>
                                <div>
                                  <button
                                    className="btn"
                                    style={{
                                      backgroundColor: "#e72c30",
                                      fontWeight: 500,
                                      color: "white",
                                      width: 160,
                                      borderRadius: 50,
                                    }}
                                    onClick={() =>
                                      this.props.onUpdatePlayedSong(
                                        this.props.currentSong
                                      )
                                    }
                                  >
                                    {currentSong && currentSong.music ? (
                                      <>
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          className="_paus"
                                        >
                                          {" "}
                                          <g fill="none" fillRule="nonzero">
                                            {" "}
                                            <path
                                              className="fill_path"
                                              fill="white"
                                              d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                                            ></path>{" "}
                                            <path
                                              className="fill_path"
                                              fill-opacity=".01"
                                              d="M1 1h22v22H1z"
                                            ></path>{" "}
                                          </g>{" "}
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PAUSE</span>
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          width="16"
                                          height="18"
                                          viewBox="0 0 20 24"
                                          className="_ply"
                                        >
                                          <path
                                            className="fill_path"
                                            value="-3"
                                            fill="white"
                                            fillRule="evenodd"
                                            d="M0 0v24l20-12z"
                                          ></path>
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PLAY ALL</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mb-2 d-md-none">
                            <div className="text-center">
                              <div className=" my-1" id="image">
                                <img
                                  src={
                                    this.props.match.params.option ===
                                    "playlist"
                                      ? songs[0].img
                                      : songs[0].genreImg
                                  }
                                  style={{ width: 150, height: 150 }}
                                />
                              </div>
                              <div className="text-center">
                                {/* <div
                            style={{
                              fontSize: 25,
                              color: "black",
                              fontWeight: 500,
                              textTransform: "capitalize",
                            }}
                          >
                            {this.props.match.params.type}
                          </div> */}
                                <div
                                  style={{
                                    fontSize: 18,
                                    color: "black",
                                    fontWeight: 500,
                                  }}
                                >
                                  {songs.length} Tracks
                                </div>
                                <div>
                                  <button
                                    className="btn"
                                    style={{
                                      backgroundColor: "#e72c30",
                                      fontWeight: 500,
                                      color: "white",
                                      width: 160,
                                      borderRadius: 50,
                                    }}
                                    onClick={() =>
                                      this.props.onUpdatePlayedSong(
                                        this.props.currentSong
                                      )
                                    }
                                  >
                                    {currentSong && currentSong.music ? (
                                      <>
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          className="_paus"
                                        >
                                          {" "}
                                          <g fill="none" fillRule="nonzero">
                                            {" "}
                                            <path
                                              className="fill_path"
                                              fill="white"
                                              d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                                            ></path>{" "}
                                            <path
                                              className="fill_path"
                                              fill-opacity=".01"
                                              d="M1 1h22v22H1z"
                                            ></path>{" "}
                                          </g>{" "}
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PAUSE</span>
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          width="16"
                                          height="18"
                                          viewBox="0 0 20 24"
                                          className="_ply"
                                        >
                                          <path
                                            className="fill_path"
                                            value="-3"
                                            fill="white"
                                            fillRule="evenodd"
                                            d="M0 0v24l20-12z"
                                          ></path>
                                        </svg>
                                        &nbsp; &nbsp;
                                        <span>PLAY ALL</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    //
                  )
                ) : this.props.match.params.option === "trendingSong" &&
                  this.props.match.params.type !== undefined ? (
                  // <div className="row ">
                  //   <div className="col-12">
                  //     <div>
                  //       <img
                  //         src={songs[0].img}
                  //         style={{ width: 150, height: 150 }}
                  //       />
                  //     </div>
                  //     <div>
                  //       <div className="row">
                  //         <div className="col-12">
                  //           <span>Hindi Top</span>
                  //         </div>
                  //         <div className="col-12">
                  //           <button
                  //             className="btn"
                  //             style={{
                  //               backgroundColor: "#e72c30",
                  //               fontWeight: 500,
                  //               color: "white",
                  //               width: 160,
                  //               borderRadius: 50,
                  //             }}
                  //             onClick={() =>
                  //               this.props.onUpdatePlayedSong(
                  //                 this.props.currentSong
                  //               )
                  //             }
                  //           >
                  //             {currentSong && currentSong.music ? (
                  //               <>
                  //                 <svg
                  //                   width="24"
                  //                   height="24"
                  //                   viewBox="0 0 24 24"
                  //                   className="_paus"
                  //                 >
                  //                   {" "}
                  //                   <g fill="none" fillRule="nonzero">
                  //                     {" "}
                  //                     <path
                  //                       className="fill_path"
                  //                       fill="white"
                  //                       d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                  //                     ></path>{" "}
                  //                     <path
                  //                       className="fill_path"
                  //                       fill-opacity=".01"
                  //                       d="M1 1h22v22H1z"
                  //                     ></path>{" "}
                  //                   </g>{" "}
                  //                 </svg>
                  //                 &nbsp; &nbsp;
                  //                 <span>PAUSE</span>
                  //               </>
                  //             ) : (
                  //               <>
                  //                 <svg
                  //                   width="16"
                  //                   height="18"
                  //                   viewBox="0 0 20 24"
                  //                   className="_ply"
                  //                 >
                  //                   <path
                  //                     className="fill_path"
                  //                     value="-3"
                  //                     fill="white"
                  //                     fillRule="evenodd"
                  //                     d="M0 0v24l20-12z"
                  //                   ></path>
                  //                 </svg>
                  //                 &nbsp; &nbsp;
                  //                 <span>PLAY ALL</span>
                  //               </>
                  //             )}
                  //           </button>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div><div className="row ">
                  <div className="col-12 col-md-4 col-lg-12 text-center">
                    <div className="row">
                      <div className="col-12 mb-2 d-md-block d-none">
                        <div className="d-flex">
                          <div className="mr-4" id="image">
                            <img
                              src={
                                this.props.match.params.option ===
                                "trendingSong"
                                  ? songs[0].img
                                  : songs[0].genreImg
                              }
                              style={{ width: 150, height: 150 }}
                            />
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: 25,
                                color: "black",
                                fontWeight: 500,
                                textTransform: "capitalize",
                              }}
                            >
                              {this.props.match.params.type}
                            </div>
                            <div
                              className="mb-5"
                              style={{
                                fontSize: 13,
                                color: "#999999",
                                fontWeight: 500,
                              }}
                            >
                              <p>
                                Created By Gaana{" "}
                                {this.props.match.params.option !==
                                "trendingSong"
                                  ? " User "
                                  : ""}
                                | Track {songs.length}
                              </p>
                            </div>
                            <div>
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#e72c30",
                                  fontWeight: 500,
                                  color: "white",
                                  width: 160,
                                  borderRadius: 50,
                                }}
                                onClick={() =>
                                  this.props.onUpdatePlayedSong(
                                    this.props.currentSong
                                  )
                                }
                              >
                                {currentSong && currentSong.music ? (
                                  <>
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      className="_paus"
                                    >
                                      {" "}
                                      <g fill="none" fillRule="nonzero">
                                        {" "}
                                        <path
                                          className="fill_path"
                                          fill="white"
                                          d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                                        ></path>{" "}
                                        <path
                                          className="fill_path"
                                          fill-opacity=".01"
                                          d="M1 1h22v22H1z"
                                        ></path>{" "}
                                      </g>{" "}
                                    </svg>
                                    &nbsp; &nbsp;
                                    <span>PAUSE</span>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      width="16"
                                      height="18"
                                      viewBox="0 0 20 24"
                                      className="_ply"
                                    >
                                      <path
                                        className="fill_path"
                                        value="-3"
                                        fill="white"
                                        fillRule="evenodd"
                                        d="M0 0v24l20-12z"
                                      ></path>
                                    </svg>
                                    &nbsp; &nbsp;
                                    <span>PLAY ALL</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-2 d-md-none">
                        <div className="text-center">
                          <div className=" my-1" id="image">
                            <img
                              src={
                                this.props.match.params.option ===
                                "trendingSong"
                                  ? songs[0].img
                                  : songs[0].genreImg
                              }
                              style={{ width: 150, height: 150 }}
                            />
                          </div>
                          <div className="text-center">
                            {/* <div
                          style={{
                            fontSize: 25,
                            color: "black",
                            fontWeight: 500,
                            textTransform: "capitalize",
                          }}
                        >
                          {this.props.match.params.type}
                        </div> */}
                            <div
                              style={{
                                fontSize: 18,
                                color: "black",
                                fontWeight: 500,
                              }}
                            >
                              {songs.length} Tracks
                            </div>
                            <div>
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#e72c30",
                                  fontWeight: 500,
                                  color: "white",
                                  width: 160,
                                  borderRadius: 50,
                                }}
                                onClick={() =>
                                  this.props.onUpdatePlayedSong(
                                    this.props.currentSong
                                  )
                                }
                              >
                                {currentSong && currentSong.music ? (
                                  <>
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      className="_paus"
                                    >
                                      {" "}
                                      <g fill="none" fillRule="nonzero">
                                        {" "}
                                        <path
                                          className="fill_path"
                                          fill="white"
                                          d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                                        ></path>{" "}
                                        <path
                                          className="fill_path"
                                          fill-opacity=".01"
                                          d="M1 1h22v22H1z"
                                        ></path>{" "}
                                      </g>{" "}
                                    </svg>
                                    &nbsp; &nbsp;
                                    <span>PAUSE</span>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      width="16"
                                      height="18"
                                      viewBox="0 0 20 24"
                                      className="_ply"
                                    >
                                      <path
                                        className="fill_path"
                                        value="-3"
                                        fill="white"
                                        fillRule="evenodd"
                                        d="M0 0v24l20-12z"
                                      ></path>
                                    </svg>
                                    &nbsp; &nbsp;
                                    <span>PLAY ALL</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-12 text-center">
                      <h1 className="trendingtitle">Trending Songs</h1>
                      <p className="trn_txt">
                        Top Trending Hits. Refreshed Daily
                        <br />
                        {songs.length} Songs
                      </p>
                      <p></p>
                      <p>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#e72c30",
                            fontWeight: 500,
                            color: "white",
                            width: 160,
                            borderRadius: 50,
                          }}
                          onClick={() =>
                            this.props.onUpdatePlayedSong(
                              this.props.currentSong
                            )
                          }
                        >
                          {currentSong && currentSong.music ? (
                            <>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="_paus"
                              >
                                {" "}
                                <g fill="none" fillRule="nonzero">
                                  {" "}
                                  <path
                                    className="fill_path"
                                    fill="white"
                                    d="M4.3 20.8h5.029V3.2H4.3v17.6zM14.357 3.2v17.6h5.029V3.2h-5.029z"
                                  ></path>{" "}
                                  <path
                                    className="fill_path"
                                    fill-opacity=".01"
                                    d="M1 1h22v22H1z"
                                  ></path>{" "}
                                </g>{" "}
                              </svg>
                              &nbsp; &nbsp;
                              <span>PAUSE</span>
                            </>
                          ) : (
                            <>
                              <svg
                                width="16"
                                height="18"
                                viewBox="0 0 20 24"
                                className="_ply"
                              >
                                <path
                                  className="fill_path"
                                  value="-3"
                                  fill="white"
                                  fillRule="evenodd"
                                  d="M0 0v24l20-12z"
                                ></path>
                              </svg>
                              &nbsp; &nbsp;
                              <span>PLAY ALL</span>
                            </>
                          )}
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 text-left d-md-block d-none ">
            {songs && songs.length > 0 ? (
              <>
                <div className="row py-2 mx-3 " style={{ fontWeight: 500 }}>
                  <div className="col-lg col-md">
                    <span className="ml-2">#</span>
                  </div>
                  <div className="col-lg col-md"></div>
                  <div className="col-lg-3 col-md-3">TITLE</div>
                  <div className="col-lg-4 col-md-3">ARTIST</div>
                  <div className="col-lg-2 col-md-2">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path
                        className="fill_path"
                        fillRule="nonzero"
                        d="M8 0c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm0 14.4c3.52 0 6.4-2.88 6.4-6.4 0-3.52-2.88-6.4-6.4-6.4-3.52 0-6.4 2.88-6.4 6.4 0 3.52 2.88 6.4 6.4 6.4zM8.25 4v3.957L12 10.01l-.667.989L7 8.565V4h1.25z"
                        opacity=".5"
                      ></path>
                    </svg>
                  </div>
                  <div className="col-lg col-md"></div>
                </div>

                {songs.map((song, index) => (
                  <>
                    {currentSong && currentSong.title === song.title ? (
                      <div
                        className="row border-top border-bottom py-2 mx-3  "
                        style={{
                          fontWeight: 500,
                          backgroundColor: "#ffffff",
                        }}
                        key={index}
                        onMouseEnter={() => this.handleMouseEnter(index)}
                        onMouseLeave={() => this.handleMouseLeave()}
                      >
                        <div className="col-lg  col-md">
                          {currentSong.music ? (
                            <div className="d-flex">
                              <div
                                className="rounded-circle border border-dark"
                                style={{ width: 35, height: 35 }}
                                onClick={() =>
                                  this.props.onUpdatePlayedSong(song)
                                }
                              >
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  className="_play sng_c rt_arw playicon32172937 songplayed pause-icon"
                                  data-value="song32172937"
                                  data-type="playSong"
                                  title="Play"
                                >
                                  {" "}
                                  <g
                                    fill="none"
                                    fillRule="evenodd"
                                    transform="translate(1 1)"
                                  >
                                    {" "}
                                    <path
                                      className="fill_path orange _paus"
                                      data-value="song32172937"
                                      data-type="playSong"
                                      fillRule="nonzero"
                                      fill="black"
                                      d="M12 19h2v-8h-2v8zm5-8v8h2v-8h-2z"
                                    ></path>{" "}
                                    <circle
                                      cx="15"
                                      cy="15"
                                      r="15"
                                      className="stroke_path orange"
                                    ></circle>{" "}
                                  </g>{" "}
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div
                                className="rounded-circle border border-dark"
                                style={{ width: 35, height: 35 }}
                                onClick={() =>
                                  this.props.onUpdatePlayedSong(song)
                                }
                              >
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  className="_play sng_c rt_arw playicon32236432 songplayed"
                                  data-value="song32236432"
                                  data-type="playSong"
                                  title="Play"
                                >
                                  <g
                                    fill="none"
                                    fillRule="evenodd"
                                    transform="translate(1 1)"
                                  >
                                    <path
                                      className="fill_path orange _ply"
                                      fill="black"
                                      data-value="song32236432"
                                      data-type="playSong"
                                      d="M12.656 11.25v8.438l6.63-4.22z"
                                    ></path>

                                    <circle
                                      cx="15"
                                      cy="15"
                                      r="15"
                                      className="stroke_path orange"
                                    ></circle>
                                  </g>
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <div
                          className="col-lg col-md"
                          style={{ cursor: "pointer" }}
                        >
                          {user ? (
                            this.checkFavourite(favourites, song) ? (
                              <i
                                className="fa fa-heart text-danger"
                                onClick={() =>
                                  this.handleHeartClick(false, song)
                                }
                              ></i>
                            ) : (
                              <i
                                className="fa fa-heart-o"
                                onClick={() =>
                                  this.handleHeartClick(true, song)
                                }
                              ></i>
                            )
                          ) : (
                            <i
                              className="fa fa-heart-o"
                              onClick={() => this.props.history.push("/login")}
                            ></i>
                          )}
                        </div>
                        <div
                          className="col-lg-3 col-md-3 text-truncate"
                          onClick={() => this.props.onUpdatePlayedSong(song)}
                        >
                          <img
                            src={song.img}
                            className="mr-4"
                            style={{ width: 35, height: 35, borderRadius: 5 }}
                          />
                          {song.title}
                        </div>
                        <div
                          className="col-lg-4 col-md-3"
                          onClick={() => this.props.onUpdatePlayedSong(song)}
                        >
                          {song.artist}
                        </div>
                        <div
                          className="col-lg-2 col-md-2"
                          onClick={() => this.props.onUpdatePlayedSong(song)}
                        >
                          {song.time}
                        </div>
                        <div className="col-lg col-md">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            onClick={() => this.showMusicOptions(song)}
                          >
                            <g fill="#FFF" fillRule="evenodd">
                              <path
                                className="fill_path"
                                fill="black"
                                d="M7 12a2 2 0 1 1-3.999.001A2 2 0 0 1 7 12M14 12a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12M21 12a2 2 0 1 1-3.999.001A2 2 0 0 1 21 12"
                              ></path>
                            </g>
                          </svg>
                          {this.state.showOptions === song.title ? (
                            <div
                              className="rounded shadow"
                              style={{
                                position: "absolute",
                                width: 280,
                                top: 12,
                                borderRadius: 5,
                                right: 120,
                                borderRadius: 20,
                                zIndex: 99,
                                cursor: "pointer",
                              }}
                            >
                              <MusicOptionsAll {...this.props} song={song} />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : selectedIndex === index ? (
                      <div
                        className="row border-top border-bottom py-2 mx-3 "
                        style={{
                          fontWeight: 500,
                          backgroundColor: "#ffffff",
                        }}
                        key={index}
                        onMouseEnter={() => this.handleMouseEnter(index)}
                        onMouseLeave={() => this.handleMouseLeave()}
                      >
                        <div className="col-lg  col-md">
                          <div className="">
                            <div
                              className="rounded-circle border border-dark"
                              style={{ width: 35, height: 35 }}
                              onClick={() =>
                                this.props.onUpdatePlayedSong(song)
                              }
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                className="_play sng_c rt_arw playicon32236432 songplayed"
                                data-value="song32236432"
                                data-type="playSong"
                                title="Play"
                              >
                                <g
                                  fill="none"
                                  fillRule="evenodd"
                                  transform="translate(1 1)"
                                >
                                  <path
                                    className="fill_path orange _ply"
                                    fill="black"
                                    data-value="song32236432"
                                    data-type="playSong"
                                    d="M12.656 11.25v8.438l6.63-4.22z"
                                  ></path>

                                  <circle
                                    cx="15"
                                    cy="15"
                                    r="15"
                                    className="stroke_path orange"
                                  ></circle>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-lg col-md"
                          style={{ cursor: "pointer" }}
                        >
                          {user ? (
                            this.checkFavourite(favourites, song) ? (
                              <i
                                className="fa fa-heart text-danger"
                                onClick={() =>
                                  this.handleHeartClick(false, song)
                                }
                              ></i>
                            ) : (
                              <i
                                className="fa fa-heart-o"
                                onClick={() =>
                                  this.handleHeartClick(true, song)
                                }
                              ></i>
                            )
                          ) : (
                            <i
                              className="fa fa-heart-o"
                              onClick={() => this.props.history.push("/login")}
                            ></i>
                          )}
                        </div>
                        <div
                          className="col-lg-3 col-md-3 text-truncate"
                          onClick={() => this.props.onUpdatePlayedSong(song)}
                        >
                          <img
                            src={song.img}
                            className="mr-4"
                            style={{ width: 35, height: 35, borderRadius: 5 }}
                          />
                          {song.title}
                        </div>
                        <div
                          className="col-lg-4 col-md-3 text-truncate"
                          onClick={() => this.props.onUpdatePlayedSong(song)}
                        >
                          {song.artist}
                        </div>
                        <div
                          className="col-lg-2 col-md-2"
                          onClick={() => this.props.onUpdatePlayedSong(song)}
                        >
                          {song.time}
                        </div>
                        <div className="col-lg col-md">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            onClick={() => this.showMusicOptions(song)}
                          >
                            <g fill="#FFF" fillRule="evenodd">
                              <path
                                className="fill_path"
                                fill="black"
                                d="M7 12a2 2 0 1 1-3.999.001A2 2 0 0 1 7 12M14 12a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12M21 12a2 2 0 1 1-3.999.001A2 2 0 0 1 21 12"
                              ></path>
                            </g>
                          </svg>
                          {this.state.showOptions === song.title ? (
                            <div
                              className="shadow"
                              style={{
                                position: "absolute",
                                width: 280,
                                top: 12,
                                borderRadius: 5,
                                right: 120,
                                borderRadius: 20,
                                zIndex: 99,
                                cursor: "pointer",
                              }}
                            >
                              <MusicOptionsAll {...this.props} song={song} />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="row border-top border-bottom py-2 mx-3"
                        style={{ fontWeight: 500 }}
                        onMouseEnter={() => this.handleMouseEnter(index)}
                        onMouseLeave={() => this.handleMouseLeave()}
                        onClick={() => this.props.onUpdatePlayedSong(song)}
                        key={index}
                      >
                        <div
                          className="col-lg col-md"
                          style={{ width: 35, height: 35 }}
                        >
                          <span className="ml-2">{index + 1}</span>
                        </div>
                        <div
                          className="col-lg col-md"
                          style={{ cursor: "pointer" }}
                        >
                          {user ? (
                            this.checkFavourite(favourites, song) ? (
                              <i
                                className="fa fa-heart text-danger"
                                onClick={() =>
                                  this.handleHeartClick(false, song)
                                }
                              ></i>
                            ) : (
                              <i
                                className="fa fa-heart-o"
                                onClick={() =>
                                  this.handleHeartClick(true, song)
                                }
                              ></i>
                            )
                          ) : (
                            <i
                              className="fa fa-heart-o"
                              onClick={() => this.props.history.push("/login")}
                            ></i>
                          )}
                        </div>
                        <div className="col-lg-3 col-md-3 text-truncate ">
                          <img
                            src={song.img}
                            className="mr-4"
                            style={{ width: 35, height: 35, borderRadius: 5 }}
                          />
                          {song.title}
                        </div>
                        <div className="col-lg-4 col-md-3">{song.artist}</div>
                        <div className="col-lg-2 col-md-2">{song.time}</div>
                        <div className="col-lg col-md">
                          <div
                            style={{
                              position: "absolute",
                              width: 320,
                              top: 0,
                              right: 150,
                              backgroundColor: "red",
                              zIndex: 55,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-12 d-md-none">
            <div className="row my-2 mx-2">
              {songs && songs.length > 0
                ? songs.map((song, index) => (
                    <>
                      <div
                        className="col-7 d-flex text-truncate"
                        onClick={() => this.props.onUpdatePlayedSong(song)}
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          overflow: "hidden",
                        }}
                      >
                        <div className="mr-2" style={{ width: 50, height: 50 }}>
                          <img
                            src={song.img}
                            style={{
                              width: 40,
                              height: 40,
                              overflow: "hidden",
                            }}
                          />
                        </div>
                        <div>
                          <span
                            className="text-truncate text-dark"
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              overflow: "hidden",
                            }}
                          >
                            {song.title}
                          </span>
                          <br />
                          <span
                            className="text-truncate"
                            style={{ fontSize: 14 }}
                          >
                            {song.artist}
                          </span>
                        </div>
                      </div>
                      <div
                        className="col pt-2"
                        onClick={() => this.props.onUpdatePlayedSong(song)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill="#404040"
                            fillRule="nonzero"
                            d="M17.865 12.278L7.38 18.333a1.248 1.248 0 0 1-1.714-.476 1.286 1.286 0 0 1-.165-.63V5.773c0-.703.563-1.273 1.257-1.273.197 0 .392.047.569.138l10.486 5.399a1.28 1.28 0 0 1 .053 2.24zm-.622-1.106l-10.486-5.4v11.455l10.486-6.055z"
                          ></path>
                        </svg>
                      </div>
                      <div className="col pt-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            this.handleMusicOptions(song);
                          }}
                          aria-controls="example-collapse-text"
                          aria-expanded={song.open}
                        >
                          <g fill="#FFF" fillRule="evenodd">
                            <path
                              className="fill_path"
                              fill="black"
                              d="M7 12a2 2 0 1 1-3.999.001A2 2 0 0 1 7 12M14 12a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12M21 12a2 2 0 1 1-3.999.001A2 2 0 0 1 21 12"
                            ></path>{" "}
                          </g>{" "}
                        </svg>
                      </div>
                      <div
                        className="col mb-5 fixed-bottom bg-white px-2"
                        style={{ zIndex: 100 }}
                      >
                        <Collapse in={song.open}>
                          <div id="example-collapse-text ">
                            <div className="row mt-2">
                              <div className="col-8 d-flex">
                                <div className="mr-2">
                                  <img
                                    src={song.img}
                                    style={{
                                      width: 60,
                                      height: 50,
                                      paddingLeft: 10,
                                    }}
                                  />
                                </div>
                                <div>
                                  <div style={{ color: "black" }}>
                                    {song.title}
                                  </div>
                                  <div>{song.artist}</div>
                                </div>
                              </div>
                              <div
                                className="col text-right"
                                style={{ cursor: "pointer" }}
                              >
                                {user ? (
                                  this.checkFavourite(favourites, song) ? (
                                    <i
                                      className="fa fa-heart text-danger"
                                      onClick={() =>
                                        this.handleHeartClick(false, song)
                                      }
                                    ></i>
                                  ) : (
                                    <i
                                      className="fa fa-heart-o"
                                      onClick={() =>
                                        this.handleHeartClick(true, song)
                                      }
                                    ></i>
                                  )
                                ) : (
                                  <i
                                    className="fa fa-heart-o"
                                    onClick={() =>
                                      this.props.history.push("/login")
                                    }
                                  ></i>
                                )}
                                <i
                                  className="fa fa-close px-3 text-danger"
                                  onClick={() => {
                                    this.handleMusicOptions(song);
                                  }}
                                ></i>
                              </div>
                            </div>
                            <MusicMobileOption {...this.props} song={song} />
                            <br />
                          </div>
                        </Collapse>
                      </div>
                    </>
                  ))
                : ""}{" "}
            </div>
          </div>
          <div className="col-12"></div>
        </div>
      </>
    ) : (
      ""
    );
  }

  checkFavourite(favourites, song) {
    if (favourites && favourites.length > 0) {
      let checkIndex = favourites.findIndex((fav) => +fav.id === +song.id);
      if (checkIndex >= 0) return true;
      else return false;
    } else {
      return false;
    }
  }
}

export default MusicPlayerPage;
