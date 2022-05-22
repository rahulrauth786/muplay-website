import React, { Component } from "react";
import {
  addSongToFavourites,
  getAllFavList,
  removeSongToFavourites,
} from "../../services/musicService";
import MusicOptions from "./musicoptions";
import { getAllPlaylist } from "./../../services/playlistService";

class MusicInfo extends Component {
  state = { show: false, user: false, favourites: [] };
  extendMore = () => {
    this.setState({ show: !this.state.show });
  };
  async componentDidMount() {
    let token = JSON.parse(localStorage.getItem("token"))
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    if (token !== null) {
      try {
        let response = await getAllFavList(token);
        console.log(response);
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
      } catch (error) {}
    } else {
      this.setState({ loading: true });
    }
  }
  handleHeartClick = async (value, song) => {
    let token = JSON.parse(localStorage.getItem("token"))
      ? JSON.parse(localStorage.getItem("token"))
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
    const { user, favourites } = this.state;
    return (
      <div className="row px-3">
        <div className="col-12 d-md-block d-none">
          <div
            className="row bg-white  py-1  border-bottom "
            style={{ height: 62 }}
          >
            <div className="col-md-9 col-lg-9 pt-2">
              <div className="d-flex">
                <div>
                  <img
                    src={this.props.song.img}
                    style={{ width: 45, height: 45 }}
                  />
                </div>
                <div
                  style={{ lineHeight: 1.1 }}
                  className="d-block m-0 p-0 text-truncate"
                >
                  <span
                    className="pl-2 text-dark  "
                    style={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    {this.props.song.title}
                  </span>
                  <br />
                  <span
                    className="pl-2 text-dark text-muted text-truncate"
                    style={{ fontSize: 13, fontWeight: 500 }}
                  >
                    {this.props.song.artist}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 pt-3  px-0">
              {user ? (
                this.checkFavourite(favourites, this.props.song) ? (
                  <i
                    className="fa fa-heart text-danger ml-3"
                    onClick={() =>
                      this.handleHeartClick(false, this.props.song)
                    }
                  ></i>
                ) : (
                  <i
                    className="fa fa-heart-o  ml-3"
                    onClick={() => this.handleHeartClick(true, this.props.song)}
                  ></i>
                )
              ) : (
                <i
                  className="fa fa-heart-o ml-3 "
                  onClick={() => this.props.history.push("/login")}
                ></i>
              )}
              {this.state.show ? (
                <i
                  className="fa fa-chevron-down px-3"
                  onClick={() => this.extendMore()}
                  style={{ fontSize: 17 }}
                ></i>
              ) : (
                <i
                  className="fa fa-ellipsis-h px-3 pl-2"
                  onClick={() => this.extendMore()}
                  style={{ fontSize: 17 }}
                ></i>
              )}
            </div>
          </div>
          <div className="row bg-white">
            {this.state.show ? (
              <div className="col-12">
                <MusicOptions {...this.props} song={this.props.song} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
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

export default MusicInfo;
