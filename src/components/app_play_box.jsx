import React, { Component } from "react";

import CurrentMusicPage from "./musicPlayer/currentMusicPlayer";
import MobileMusicPlayer from "./musicPlayer/mobileMusiCPlayer";
import MusicInfo from "./musicPlayer/musicInfo";

class App_Play_Box extends Component {
  state = {};

  render() {
    let { songs, currentSong, currentTime, duration } = this.props;
    return (
      <>
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
                <CurrentMusicPage {...this.props} />
              </div>
            </div>
            <div className="fixed-bottom MobileMusicPlayer d-md-none">
              <MobileMusicPlayer {...this.props} />
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default App_Play_Box;
