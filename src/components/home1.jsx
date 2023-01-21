/*******
 * Author - Rahul Routh
 *
 */

import React, { Component } from "react";

import Navbar from "./navbar";
import { getPlaylistSong, getSongs } from "./../services/musicService";
import "./home.css";

import { getCurrentUser } from "../services/userService";

import App_Playlist from "./app_playlist";

import App_Music_List from "./app_music_list";
import App_Play_Box from "./app_play_box";
import Footer from "./footer";

import CustomLoader from "./common/loader";

class Home1 extends Component {
  state = {
    currentSong: {},
    loading: false,
    songs: [],
    musicRef: null,
    currentTime: 0,
    duration: null,
    viewAll: false,
    show: false,
    playlist_type: [
      { name: "Top Charts", type: "1" },
      { name: "Trending Songs", type: "1" },
      { name: "Top Picks", type: "1" },
    ],
    showUserOptions: false,
  };

  constructor(props) {
    super(props);

    this.state.loading = false;
  }
  async componentDidMount() {
    // { option, type } = this.props.match.params;
    this.setState({ loading: true });
    // if (option === "playlist") {
    //   let token = JSON.parse(localStorage.getItem("token"))
    //     ? JSON.parse(localStorage.getItem("token"))
    //     : null;
    //   if (token !== null) {
    //     getCurrentUser(token).then((user) => {
    //       let viewAll = option ? true : false;
    //       getPlaylistSong(type, token).then((response) => {
    //         if (response.data.msg === "success") {
    //           let songs = response.data.songs;
    //           let currentSong = songs[0];
    //           this.setState({ loading: true, currentSong, songs, viewAll });
    //           this.music.src = currentSong.track;
    //           this.music.addEventListener("timeupdate", (e) => {
    //             this.setState({
    //               currentTime: e.target.currentTime,
    //               duration: e.target.duration,
    //             });
    //           });
    //         } else {
    //           this.setState({ loading: true, viewAll });
    //         }
    //       });
    //     });
    //   }
    // } else {
    //   let viewAll = option ? true : false;
    //   getSongs(option, type).then((response) => {
    //     if (response.data.msg === "success") {
    //       let songs = response.data.songs;
    //       let currentSong = songs[0];
    //       this.setState({ loading: true, currentSong, songs, viewAll });
    //       this.music.src = currentSong.track;
    //       this.music.addEventListener("timeupdate", (e) => {
    //         this.setState({
    //           currentTime: e.target.currentTime,
    //           duration: e.target.duration,
    //         });
    //       });
    //     } else {
    //       this.setState({ loading: true, viewAll });
    //     }
    //   });
    // }
  }



  async componentDidUpdate(prevProps, prevState) {
    //handle api for songs fetch
    if (prevProps.match.params !== this.props.match.params) {
      let { option, type } = this.props.match.params;
      let viewAll = option ? true : false;
      this.setState({ loading: false });
      if (option) {
        try {
          let response = await getSongs(option, type);
          if (response && response.data && response.data.msg === "success") {
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
    //handle song State (play,pause,stop)
    this.changeSongState(prevState);
  }
  componentWillUnmount() {
    if (this.music) this.music.removeEventListener("timeupdate", () => { });
  }

  changeSongState(prevState) {
    if (this.state.currentSong.id !== prevState.currentSong.id) {
      if (this.state.currentSong.track && this.state.currentSong.music) {
        this.currentTime = 0;
        this.music.src = this.state.currentSong.track;
        this.music.play();
      }
    }
    if (
      this.state.currentSong.music !== prevState.currentSong.music &&
      this.state.currentSong.id === prevState.currentSong.id
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


  changeSongSound = (value) => {
    this.music.volume = value;
  };
  saveSongState = (value) => {
    alert("songss");
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

  changeSongPlayed = (value) => {
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
    const { songs, currentSong, viewAll, showUserOptions, playlist_type } =
      this.state;
    const currentTime = this.getTime(this.state.currentTime);
    const duration = this.getTime(this.state.duration);
    let { option } = this.props.match.params;

    return (
      <div className="container-fluid px-0 mb-5 ">
        <Navbar {...this.props} />

        {this.state.loading ? (
          <>
            {option != undefined ? (
              <App_Music_List
                songs={songs}
                currentSong={currentSong}
                {...this.props}
              />
            ) : (
              ""
            )}
            {option === undefined ? <App_Playlist {...this.props} /> : ""}

            <App_Play_Box
              currentSong={this.state.currentSong}
              songs={songs}
              currentTime={currentTime}
              duration={duration}
              onUpdatePlayedSong={this.saveSongState}
              onSoundChange={this.handleSound}
              rawTime={this.state.currentTime}
              rawDuration={this.state.duration}
              loading={this.state.loading}
              playPreviousSong={this.changeSongPlayed}
              playNextSong={this.changeSongPlayed}
            />

            <div className="row">
              <div className="col-12">
                <Footer />
              </div>
            </div>
          </>
        ) : (
          <CustomLoader />
        )}
        <audio ref={(ref) => (this.music = ref)} />
      </div>
    );
  }
}

export default Home1;
