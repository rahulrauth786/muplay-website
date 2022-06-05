import http from "./httpService";
const url = "http://localhost:2410/playlist";

export function getAllPlaylist(token, user_id) {
  return http.get(`${url}/getplaylists/${user_id}`, {
    headers: { authorization: token },
  });
}

export function getAppPlaylist() {
  return http.get(`${url}/get_app_playlists`);
}

export function get_app_playlist_song(name) {
  return http.get(`${url}/get_app_playlist_song?name='trending_songs'`);
}
export function get_app_playlist_genre(name) {
  return http.get(`${url}/get_app_playlist_genre?name='trending_songs'`);
}

export function getPlaylistSongs(token, playlist_id) {
  return http.get(`${url}/getsongs/${playlist_id}`, {
    headers: { authorization: token },
  });
}

export function addSongToPlaylist(playlistName, songId, token) {
  return http.post(`${url}/addSongToPlayList/${playlistName}/${songId}`, null, {
    headers: { authorization: token },
  });
}

export function addPlaylist(playlistName, token) {
  return http.post(`${url}/addPlaylist/${playlistName}`, null, {
    headers: { authorization: token },
  });
}
