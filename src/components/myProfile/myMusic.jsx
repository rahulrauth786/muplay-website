import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import {
  getAllPlaylist,
  addPlaylist,
  getAllFavList,
} from "../../services/musicService";
import { getCurrentUser } from "../../services/userService";
import Footer from "../footer";
import Navbar from "../navbar";
import "./myMusic.css";
import SignUp from "./signUp";
class Mymusic extends Component {
  state = {
    playlists: [],
    favourites: [],
    loading: false,
    show: false,
    playlistName: "",
    showUserOptions: false,
    user: null,
    token: "",
  };
  constructor(props) {
    super(props);
    this.state.loading = false;
  }
  async componentDidMount() {
    let token = JSON.parse(sessionStorage.getItem("token"))
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    if (token !== null) {
      let response = getCurrentUser(token);
      response
        .then(async (data) => {
          try {
            let response = await getAllPlaylist(token);
            let response2 = await getAllFavList(token);
            this.setState({
              playlists: response.data.playlists,
              favourites: response2.data.songs,
              loading: true,
              user: data,
            });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        loading: true,
      });
    }
  }

  setShow = () => {
    this.setState({ show: !this.state.show });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let token = JSON.parse(sessionStorage.getItem("token"))
      ? JSON.parse(sessionStorage.getItem("token"))
      : null;
    if (token) {
      let playlistName = this.state.playlistName;
      this.setState({ loading: false });
      try {
        let response = await addPlaylist(playlistName, token);
        if (response.data.msg === "Already Exist") {
          this.setState({
            loading: true,
            show: false,
          });
        } else {
          this.setState({
            playlists: response.data.playlists,
            loading: true,
            show: false,
          });
        }
      } catch (error) {}
    }
  };
  handleChange = (e) => {
    const { currentTarget: input } = e;
    this.setState({ playlistName: input.value });
  };
  openPlaylist = (playlistName) => {
    this.props.history.push(`/playlist/${playlistName}`);
  };
  showUserOptions = () => {
    this.setState({ showUserOptions: !this.state.showUserOptions });
  };
  render() {
    const { playlists, user, favourites } = this.state;

    return this.state.loading ? (
      user !== null ? (
        <div
          className="container-fluid px-0 full-height"
          style={{ backgroundColor: "#eee", height: "100%" }}
        >
          <div className="row">
            <div className="col-12 px-0">
              <Navbar
                {...this.props}
                onShowUserOptions={this.showUserOptions}
              />
            </div>
          </div>

          <div className="row">
            <div className="d-block d-none col-sm"></div>
            <div className="col-sm-11">
              <div className="row mx-2">
                <div className="col-12 py-3">
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      marginLeft: 5,
                    }}
                  >
                    PlayLists
                  </span>
                </div>
              </div>
              <div className="row mx-2">
                <div className="col-12">
                  <button
                    className="btn"
                    style={{
                      width: 200,
                      height: 45,
                      backgroundColor: "white",
                      borderRadius: 50,
                      outline: "none",
                    }}
                    onClick={() => this.setShow()}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 22 22"
                      data-type="openCreatePlaylist"
                    >
                      <g fill="#FFF" fill-rule="evenodd">
                        <path
                          class="fill_path"
                          fill="#999999"
                          d="M22 3h-3V0h-2v3h-3v2h3v3h2V5h3zM11.018 10.481l-5 1.631a.749.749 0 0 0-.518.713V16A1.5 1.5 0 1 0 7 17.5v-4.13l3.5-1.142V15a1.5 1.5 0 1 0 1.5 1.5v-5.306a.752.752 0 0 0-.982-.713"
                        ></path>{" "}
                        <path
                          class="fill_path"
                          fill="#999999"
                          d="M2 20V9h12l.002 11H2zM14 7H2C.897 7 0 7.897 0 9v11c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2z"
                        ></path>{" "}
                      </g>{" "}
                    </svg>
                    <span
                      className="ml-3"
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#999999",
                      }}
                    >
                      Create Playlist
                    </span>
                  </button>
                </div>
              </div>
              {playlists && playlists.length > 0 ? (
                <>
                  <div className="row my-4 mx-1">
                    <div className="col-12">
                      <div className="d-flex flex-wrap justify-content-start">
                        {playlists.map((playlist, index) => (
                          <div className="p-1" key={index}>
                            <img
                              className=""
                              src="https://a10.gaanacdn.com//media/images-v5/default-album-175x175.jpg "
                              style={{
                                height: 135,
                                borderRadius: 5,
                                width: 140,
                              }}
                              onClick={() =>
                                this.openPlaylist(playlist.playlistName)
                              }
                            />
                            <br />
                            <span>{playlist.playlistName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}{" "}
              <br /> <br />
              <div className="row mx-2">
                <div className="col-12">
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      marginLeft: 5,
                    }}
                  >
                    Favourite PlayLists
                  </span>
                </div>
              </div>
              {playlists && playlists.length > 0 ? (
                <>
                  <div className="row my-2 mx-1">
                    <div className="col-12">
                      <div className="d-flex flex-wrap justify-content-start">
                        {playlists.map((playlist, index) => (
                          <div className="p-1" key={index}>
                            <img
                              className=""
                              src="https://a10.gaanacdn.com//media/images-v5/default-album-175x175.jpg "
                              style={{
                                height: 135,
                                borderRadius: 5,
                                width: 140,
                              }}
                              onClick={() =>
                                this.openPlaylist(playlist.playlistName)
                              }
                            />
                            <br />
                            <span>{playlist.playlistName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}{" "}
              <br /> <br />
              {favourites && favourites.length > 0 ? (
                <>
                  <div className="row mx-2 mb-2">
                    <div className="col-12 py-2">
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: 2,
                          marginLeft: 5,
                        }}
                      >
                        favourite songs
                      </span>
                    </div>
                  </div>
                  <div className="row my-2 mx-1">
                    <div className="col-12">
                      <div className="d-flex flex-wrap justify-content-start">
                        {favourites.map((fav, index) => (
                          <div
                            className="pr-5 py-2 d-flex"
                            key={index}
                            onClick={() =>
                              this.props.history.push(`/song/${fav.title}`)
                            }
                          >
                            <img
                              className=""
                              src={fav.img}
                              style={{
                                height: 70,
                                borderRadius: 5,
                                width: 70,
                              }}
                              // onClick={() =>
                              //   this.openPlaylist(playlist.playlistName)
                              // }
                            />
                            <div
                              className="d-flex flex-column ml-2"
                              style={{ lineHeight: 2, width: 150 }}
                            >
                              <span
                                className="text-truncate"
                                style={{ fontSize: 14 }}
                              >
                                {fav.title}
                              </span>
                              <span
                                style={{ fontSize: 14 }}
                                className="text-muted text-truncate"
                              >
                                {fav.artist}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              <br /> <br /> <br /> <br />
              <div className="row footer">
                <div className="col-12">
                  <Footer />
                </div>
              </div>
            </div>
            <div className="col-sm d-block d-none"></div>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <Modal
                className="my-model"
                show={this.state.show}
                onHide={() => this.setShow()}
                centered={false}
                size="md"
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
              >
                <Modal.Header closeButton>
                  <div className="row  w-100 text-left pl-3">
                    <div className="col-12">
                      <Modal.Title>Add To Playlist</Modal.Title>
                    </div>
                  </div>
                </Modal.Header>

                <Modal.Body>
                  <div className="row  text-center ">
                    <div className="col-12 pt-5 pb-5">
                      <svg width="80" height="80" viewBox="0 0 22 22">
                        <g fill="#FFF" fill-rule="evenodd">
                          <path
                            class="fill_path"
                            fill="#999999"
                            d="M22 3h-3V0h-2v3h-3v2h3v3h2V5h3zM11.018 10.481l-5 1.631a.749.749 0 0 0-.518.713V16A1.5 1.5 0 1 0 7 17.5v-4.13l3.5-1.142V15a1.5 1.5 0 1 0 1.5 1.5v-5.306a.752.752 0 0 0-.982-.713"
                          ></path>
                          <path
                            class="fill_path"
                            fill="#999999"
                            d="M2 20V9h12l.002 11H2zM14 7H2C.897 7 0 7.897 0 9v11c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2z"
                          ></path>
                        </g>
                      </svg>
                      <br /> <br />
                      <p className="text-muted pb-5">
                        Create a playlist to continue{" "}
                      </p>
                    </div>
                  </div>

                  <div className="py-2 ">
                    <input
                      type="text"
                      name="playlistName"
                      value={this.state.playlistname}
                      className="form-control w-100  "
                      onChange={this.handleChange}
                      placeholder="Create a new playlist "
                      style={{
                        backgroundColor: "#eee",
                      }}
                    />

                    <svg
                      onClick={this.handleSubmit}
                      width="13"
                      height="10"
                      viewBox="0 0 13 10"
                      className="arw_btn"
                      id="createplaylist_btn"
                    >
                      <path
                        class="fill_path"
                        fill="#999999"
                        fill-rule="evenodd"
                        d="M8 .249L6.823 1.426l2.741 2.741H.751v1.666h8.813L6.823 8.574 8 9.751 12.751 5z"
                      ></path>
                    </svg>
                  </div>
                </Modal.Body>
              </Modal>
            </form>
          </div>
        </div>
      ) : (
        <SignUp {...this.props} onShowUserOptions={this.showUserOptions} />
        // <div
        //   className="container-fluid px-0 "
        //   style={{ backgroundColor: "#eee", height: "100vh" }}
        // >
        //   <div className="row">
        //     <div className="col-12">
        //       <Navbar
        //         {...this.props}
        //         onShowUserOptions={this.showUserOptions}
        //       />
        //     </div>
        //   </div>
        //   <div className="row text-center" style={{ marginTop: 200 }}>
        //     <div className="col-12 my-3">
        //       <svg width="100" height="100" viewBox="0 0 20 20">
        //         <g fill="none" fill-rule="evenodd">
        //           {" "}
        //           <path
        //             class="fill_path"
        //             fill="rgba(0,0,0,0.2)"
        //             d="M16.343 16.4h-2.39v-3.2h2.39v3.2zM5.984 13.2v3.2h-2.39v-3.2h2.39zM9.968 2C5.575 2 2 5.589 2 10v7.2c0 .442.357.8.797.8h3.187c.879 0 1.594-.718 1.594-1.6v-3.2c0-.883-.715-1.6-1.594-1.6h-2.39V10c0-3.529 2.86-6.4 6.374-6.4 3.515 0 6.375 2.871 6.375 6.4v1.6h-2.39c-.88 0-1.594.717-1.594 1.6v3.2c0 .882.714 1.6 1.593 1.6h3.187c.44 0 .797-.358.797-.8V10c0-4.411-3.574-8-7.968-8z"
        //           ></path>{" "}
        //           <path d="M0 0h20v20H0z"></path>{" "}
        //         </g>
        //       </svg>
        //     </div>
        //     <div className="col-12 my-3">
        //       <span
        //         style={{
        //           color: "rgba(0,0,0,0.5)",
        //           fontSize: 16,
        //           fontWeight: 500,
        //         }}
        //       >
        //         You need to Login to access "My Music"
        //       </span>
        //     </div>
        //     <div className="col-12 my-3">
        //       <button
        //         className="btn btn-danger btn-sm p-2"
        //         style={{ borderRadius: 50, fontSize: 13, width: 150 }}
        //         onClick={() => this.props.history.push("/login")}
        //       >
        //         SIGNUP OR LOGIN{" "}
        //       </button>
        //     </div>
        //   </div>
        // </div>
      )
    ) : (
      ""
    );
  }
}

export default Mymusic;
