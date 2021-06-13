import http from "./httpService";
const url = "https://us-central1-musicapp-cc44d.cloudfunctions.net/app";
// const url = "http://localhost:2410";
export function getSongs(option, type) {
  if (option !== undefined && type !== undefined) {
    return http.get(`${url}/${option}/${type}`);
  }

  if (option !== undefined && type === undefined) {
    return http.get(`${url}/${option}`);
  }

  if (option === undefined && type === undefined) {
    return http.get(`${url}`);
  }
}

export function getPlaylistSong(type, token) {
  return http.get(`${url}/playlist/${type}`, {
    headers: { authorization: token },
  });
}

export function getAllPlaylist(token) {
  return http.get(`${url}/getAllPlaylist`, {
    headers: { authorization: token },
  });
}

export function getAllFavList(token) {
  return http.get(`${url}/getAllFavSongsById`, {
    headers: { authorization: token },
  });
}

export function addSongToFavourites(songId, token) {
  return http.post(`${url}/addSongToFavourites/${songId}`, null, {
    headers: { authorization: token },
  });
}
export function removeSongToFavourites(songId, token) {
  return http.post(`${url}/removeSongToFavourites/${songId}`, null, {
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

export function searchSong(searchType) {
  return http.get(`${url}/search/${searchType}`);
}
