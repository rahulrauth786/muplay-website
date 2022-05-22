import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Field, Form, Formik } from "formik";
import {
  addPlaylist,
  addSongToPlaylist,
  getAllPlaylist,
} from "../../services/playlistService";
import "./addToPlaylist.css";
import LoginForm from "../loginForm";
class AddToPlayList extends Component {
  state = { playlists: [], loading: false, showLogin: false };

  async componentDidMount() {
    try {
      let token = JSON.parse(localStorage.getItem("token"))
        ? JSON.parse(localStorage.getItem("token"))
        : null;
      if (token) {
        let response = await getAllPlaylist(token);
        this.setState({ playlists: response.data.playlists, loading: true });
      } else {
        this.setState({ showLogin: true });
      }
    } catch (error) {}
  }

  addSongToplaylist = async (playlistName) => {
    try {
      let token = JSON.parse(localStorage.getItem("token"))
        ? JSON.parse(localStorage.getItem("token"))
        : null;
      if (token) {
        let song = this.props.song;
        let response = await addSongToPlaylist(playlistName, song.id, token);
        console.log(response);
        if (response.data.msg === "success") {
          alert("Song has been added");
          // this.props.history.goBack();
        }
        if (response.data.msg === "Song Already Exist") {
          alert("Song Already Exist");
          // this.props.history.goBack();
        }
      } else {
      }
    } catch (error) {}
  };
  handleLoginForm = (value) => {
    this.setState({ showLogin: value });
  };
  handleSubmit = async (values) => {
    if (values.playlistName === "") {
      alert("Please Provide Name");
    } else {
      try {
        let token = JSON.parse(localStorage.getItem("token"))
          ? JSON.parse(localStorage.getItem("token"))
          : null;
        if (token) {
          let response = await addPlaylist(values.playlistName, token);
          console.log(response);
          if (response.data.msg === "Added") {
            this.setState({ playlists: response.data.playlists });
          }
          if (response.data.msg === "Already Exist") {
            alert("Already Exist");
          }
        }
      } catch (error) {}
    }
  };
  render() {
    const { playlists, showLogin } = this.state;
    return this.state.loading ? (
      <>
        <Formik initialValues={{ playlistName: "" }}>
          {({ values, handleChange }) => {
            return (
              <Form onSubmit={this.handleSubmit}>
                <Modal
                  className="my-model"
                  show={this.props.optionSelected ? true : false}
                  onHide={() => this.props.showOptionSelected(null)}
                  centered={false}
                  size="md"
                  dialogClassName="modal-90w"
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton className="mb-0">
                    <div className="row  w-100 text-left pl-3">
                      <div className="col-12">
                        <Modal.Title>Add To Playlists</Modal.Title>
                      </div>
                    </div>
                  </Modal.Header>

                  <Modal.Body className="pt-0">
                    {playlists && playlists.length > 0 ? (
                      <>
                        <div className="row">
                          {playlists.map((playlist, index) => (
                            <div
                              className="col-12 py-4 border-bottom playlist"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.addSongToplaylist(playlist.playlistName)
                              }
                              key={index}
                            >
                              <svg
                                className="addtoplaylist_svg ml-3 mr-3"
                                width="22"
                                height="22"
                                viewBox="0 0 14 14"
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path d="M-1-1h16v16H-1z"></path>
                                  <path
                                    fill="#999999"
                                    fill-opacity=".7"
                                    d="M13.35 5.1a.669.669 0 0 0-.648-.03l-4 2a.666.666 0 0 0-.369.597v2.7A1.667 1.667 0 1 0 9.666 12V8.08l2.667-1.334v2.288a1.667 1.667 0 1 0 1.333 1.633v-5a.666.666 0 0 0-.315-.567zM.333.333h11.333v1.333H.333zM.333 3h11.333v1.333H.333zM.333 5.667h6V7h-6zM.333 8.333h6v1.333h-6z"
                                  ></path>
                                </g>
                              </svg>
                              {playlist.playlistName}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    <div className="py-2 " style={{ position: "relative" }}>
                      <Field
                        type="text"
                        name="playlistName"
                        className="form-control w-100  "
                        value={values.playlistName}
                        placeholder="Create a new playlists "
                        style={{
                          backgroundColor: "#eee",
                        }}
                      />
                      <div>
                        {/* <div>
                          <i className="fa fa-arrow-right arw_btn1"></i>
                        </div> */}

                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          className="arw_btn1"
                          id="createplaylist_btn"
                          onClick={() => this.handleSubmit(values)}
                        >
                          <path
                            className="fill_path"
                            fill="#999999"
                            fillRule="evenodd"
                            d="M8 .249L6.823 1.426l2.741 2.741H.751v1.666h8.813L6.823 8.574 8 9.751 12.751 5z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </Form>
            );
          }}
        </Formik>
      </>
    ) : showLogin ? (
      <LoginForm {...this.props} oncloseLoginForm={this.handleLoginForm} />
    ) : (
      ""
    );
  }
}

export default AddToPlayList;
