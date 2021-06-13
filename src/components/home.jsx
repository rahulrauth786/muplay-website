import React, { Component } from "react";
import CurrentMusicPage from "./musicPlayer/currentMusicPlayer";
import MusicPlayerPage from "./musicPlayer/musicPlayer";
import TopCharts from "./musicType/topCharts";
import TopPicksMusic from "./musicType/topPicks";
import TrendingSongs from "./musicType/trendingSongs";
import Navbar from "./navbar";
import { getPlaylistSong, getSongs } from "./../services/musicService";
import "./home.css";
import MusicInfo from "./musicPlayer/musicInfo";
import MobileMusicPlayer from "./musicPlayer/mobileMusiCPlayer";
import { getCurrentUser } from "../services/userService";
import Footer from "./footer";

class Home extends Component {
  state = {
    currentSong: {},
    loading: false,
    songs: [],
    musicRef: null,
    currentTime: 0,
    duration: null,
    viewAll: false,
    show: false,
    showUserOptions: false,
  };

  constructor(props) {
    super(props);
    this.state.loading = false;
  }
  async componentDidMount() {
    let { option, type } = this.props.match.params;
    if (option === "playlist") {
      let token = JSON.parse(sessionStorage.getItem("token"))
        ? JSON.parse(sessionStorage.getItem("token"))
        : null;
      if (token !== null) {
        let response = getCurrentUser(token);
        response
          .then(async (data) => {
            try {
              let viewAll = option ? true : false;
              let response = await getPlaylistSong(type, token);
              console.log(response);
              if (response.data.msg === "success") {
                let songs = response.data.songs;
                let currentSong = songs[0];
                this.setState({ loading: true, currentSong, songs, viewAll });
                this.music.src = currentSong.track;
                this.music.addEventListener("timeupdate", (e) => {
                  this.setState({
                    currentTime: e.target.currentTime,
                    duration: e.target.duration,
                  });
                });
              } else {
                this.setState({ loading: true, viewAll });
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      try {
        let viewAll = option ? true : false;
        let response = await getSongs(option, type);
        if (response.data.msg === "success") {
          let songs = response.data.songs;
          let currentSong = songs[0];
          this.setState({ loading: true, currentSong, songs, viewAll });
          this.music.src = currentSong.track;
          this.music.addEventListener("timeupdate", (e) => {
            this.setState({
              currentTime: e.target.currentTime,
              duration: e.target.duration,
            });
          });
        } else {
          this.setState({ loading: true, viewAll });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params !== this.props.match.params) {
      let { option, type } = this.props.match.params;
      let viewAll = option ? true : false;
      this.setState({ loading: false });
      if (option) {
        try {
          let response = await getSongs(option, type);
          if (response.data.msg === "success") {
            let songs = response.data.songs;
            console.log(songs);
            this.setState({
              loading: true,
              songs,
              viewAll,
            });
          } else {
            this.setState({ loading: true, viewAll, songs: [] });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.setState({ loading: true, viewAll });
      }
    }

    if (this.state.currentSong.title !== prevState.currentSong.title) {
      if (this.state.currentSong.track && this.state.currentSong.music) {
        this.currentTime = 0;
        this.music.src = this.state.currentSong.track;
        this.music.play();
      }
    }

    if (
      this.state.currentSong.music !== prevState.currentSong.music &&
      this.state.currentSong.title === prevState.currentSong.title
    ) {
      if (this.state.currentSong.music === false) {
        this.music.pause();
      }
      if (this.state.currentSong.music === true) {
        this.music.play();
      }
      if (this.state.currentSong.music === "stop") {
        this.music.pause();
        this.currentTime = 0;
        this.setState({
          currentSong: null,
        });
      }
    }
  }
  componentWillUnmount() {
    if (this.music) this.music.removeEventListener("timeupdate", () => {});
  }

  handlePlayedSong = (value) => {
    let currentSong = { ...this.state.currentSong };
    let songs = [...this.state.songs];
    if (value.title === currentSong.title) {
      let index = songs.findIndex((song) => song.title === currentSong.title);
      let updateSong = { ...songs[index], music: !songs[index].music };
      songs[index] = updateSong;
      currentSong.music = !currentSong.music;
    } else {
      let cindex = songs.findIndex((song) => song.title === value.title);

      let updateSong = { ...songs[cindex], music: !songs[cindex].music };
      songs[cindex] = updateSong;

      let pindex = songs.findIndex(
        (song) => song.title === this.state.currentSong.title
      );
      let updatePrevSong = { ...songs[pindex], music: false };
      songs[pindex] = updatePrevSong;
      currentSong = value;
      currentSong.music = !currentSong.music;
    }
    this.setState({ currentSong, songs });
  };

  handleSound = (value) => {
    this.music.volume = value;
  };

  handleChangeSong = (value) => {
    let currentSong = this.state.currentSong;
    let songs = [...this.state.songs];

    if (value === -1) {
      let firstSong = songs[0];
      if (firstSong.title !== currentSong.title) {
        let index = songs.findIndex((song) => song.title === currentSong.title);
        currentSong = songs[index - 1];
        currentSong.music = !currentSong.music;
        this.setState({ currentSong });
      }
    }
    if (value === 1) {
      let lastSong = songs[songs.length - 1];
      if (lastSong.title !== currentSong.title) {
        let index = songs.findIndex((song) => song.title === currentSong.title);
        currentSong = songs[index + 1];
        currentSong.music = !currentSong.music;
        this.setState({ currentSong });
      }
    }
  };

  handleViewAllSongs = (type) => {
    this.setState({ viewAll: true });
    this.props.history.push("/trendingSong");
  };

  handleAddToPlaylist = (show, song) => {
    this.setState({ show: show });
  };

  getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  }

  render() {
    const { songs, currentSong, viewAll, showUserOptions } = this.state;
    const currentTime = this.getTime(this.state.currentTime);
    const duration = this.getTime(this.state.duration);

    return (
      <div className="container-fluid px-0 mb-5 ">
        <Navbar {...this.props} />
        {this.state.loading ? (
          <React-Fragment>
            {viewAll ? (
              <div className="row mb-2 mx-1 musicContent ">
                <div className=" col-md-1 col-lg-1 d-md-block d-none"></div>
                <div className=" col-12 col-md-9 col-lg-9 ">
                  {songs && songs.length > 0 ? (
                    <React-Fragment>
                      <MusicPlayerPage
                        {...this.props}
                        onUpdatePlayedSong={this.handlePlayedSong}
                        songs={songs}
                        currentSong={currentSong}
                        rawTime={this.state.currentTime}
                        rawDuration={this.state.duration}

                        // onUpdateSong={this.updateSong}
                      />
                    </React-Fragment>
                  ) : (
                    <>
                      <br />
                      <br />
                      <br />
                      <hr />
                      <div className="row bg-light ">
                        <div className="col-12 d-md-block d-none ">
                          <ul className="d-flex " style={{ listStyle: "none" }}>
                            <li>
                              <img
                                className="mx-1"
                                src="https://a10.gaanacdn.com//media/images-v5/default-album-175x175.jpg "
                                style={{
                                  width: 140,
                                  height: 140,
                                  borderRadius: 5,
                                }}
                              />
                            </li>
                            <li>
                              <ul style={{ listStyle: "none" }}>
                                <li>
                                  <span
                                    style={{ fontSize: 22, color: "black" }}
                                  >
                                    {this.props.match.params.type}
                                  </span>
                                  <br />
                                  <span
                                    style={{ fontSize: 16, fontWeight: 500 }}
                                  >
                                    {this.props.match.params.option ===
                                    "playlist"
                                      ? "Created By Gaana User Track:0"
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <button
                                    className="btn btn-danger px-4 mt-5"
                                    style={{ borderRadius: 50 }}
                                    onClick={() =>
                                      this.props.history.push(
                                        `/playlist/${this.props.match.params.type}`
                                      )
                                    }
                                  >
                                    Play All
                                  </button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <div className="col-12 d-md-none text-center">
                          <div className="" style={{ listStyle: "none" }}>
                            <div>
                              <img
                                className="mx-1"
                                src="https://a10.gaanacdn.com//media/images-v5/default-album-175x175.jpg "
                                style={{
                                  width: 140,
                                  height: 140,
                                  borderRadius: 5,
                                }}
                              />
                            </div>
                            <div>
                              <ul style={{ listStyle: "none" }}>
                                <li>
                                  <span
                                    style={{ fontSize: 22, color: "black" }}
                                  >
                                    {this.props.match.params.type}
                                  </span>
                                  <br />
                                  <span
                                    style={{ fontSize: 16, fontWeight: 500 }}
                                  >
                                    Created By Gaana User Track:0
                                  </span>
                                </li>
                                <li>
                                  <button
                                    className="btn btn-danger px-4 mt-1"
                                    style={{ borderRadius: 50 }}
                                    onClick={() =>
                                      this.props.history.push(
                                        `/playlist/${this.props.match.params.type}`
                                      )
                                    }
                                  >
                                    Play All
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div
                          className="col-12 text-center text-dark"
                          style={{ fontWeight: 500 }}
                        >
                          There is no song in the playlist
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-12">{/* <Footer /> */}</div>
                </div>
                <div className=" col-md-2 col-lg-2 d-md-block d-none"></div>
              </div>
            ) : (
              <div className="row mb-2 mx-1 mainContent">
                <div className=" col-md-1 col-lg-1 d-md-block d-none"></div>
                <div className=" col-12 col-md-9 col-lg-9 ">
                  <div className="row mt-4  ">
                    <div className="col-12">
                      <TopPicksMusic {...this.props} />
                    </div>
                    <div className="col-12">
                      <TopCharts {...this.props} />
                    </div>
                    <div className="col-12 pb-5">
                      <TrendingSongs
                        viewAllSongs={this.handleViewAllSongs}
                        {...this.props}
                      />
                    </div>
                    <div className="col-12">
                      <Footer />
                    </div>
                  </div>
                </div>
                <div className=" col-md-2 col-lg-2 d-md-block d-none  "></div>
              </div>
            )}

            {songs && songs.length > 0 ? (
              <>
                <div className="fixed-bottom DesktopMusicPlayer d-md-block d-none">
                  <div
                    className="fixed-bottom"
                    style={{
                      width: 375,
                    }}
                  >
                    <MusicInfo song={currentSong} {...this.props} />
                  </div>
                  <div
                    className="fixed-bottom"
                    style={{
                      width: 320,
                      marginLeft: 390,
                      height: 62,
                    }}
                  >
                    <CurrentMusicPage
                      currentSong={this.state.currentSong}
                      currentTime={currentTime}
                      duration={duration}
                      onUpdatePlayedSong={this.handlePlayedSong}
                      onSoundChange={this.handleSound}
                      rawTime={this.state.currentTime}
                      rawDuration={this.state.duration}
                      loading={this.state.loading}
                      onChangeSong={this.handleChangeSong}
                    />
                  </div>
                </div>
                <div className="fixed-bottom MobileMusicPlayer d-md-none">
                  <MobileMusicPlayer
                    currentSong={this.state.currentSong}
                    currentTime={currentTime}
                    duration={duration}
                    onUpdatePlayedSong={this.handlePlayedSong}
                    onSoundChange={this.handleSound}
                    rawTime={this.state.currentTime}
                    rawDuration={this.state.duration}
                    loading={this.state.loading}
                    onChangeSong={this.handleChangeSong}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </React-Fragment>
        ) : (
          <div
            className="container-fluid w-100"
            style={{
              height: "100vh",
              backgroundColor: "black",
              opacity: 0.6,
            }}
          >
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
        <audio ref={(ref) => (this.music = ref)} />
      </div>
    );
  }
}

export default Home;
