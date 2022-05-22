import http from "./httpService";
// const url = "https://us-central1-musicapp-cc44d.cloudfunctions.net/app";
const url = "http://localhost:2410/songs";
//const url = "http://localhost:5000/musicapp-cc44d/us-central1/app";
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

export function searchSong(searchType) {
  return http.get(`${url}/search/${searchType}`);
}

//admin api

export function getReport(reportType) {
  return http.get(`${url}/download/csv/${reportType}`);
}

export function postReport(reportType, data) {
  return http.post(`${url}/${reportType}`, data);
}

export function addMutipleSong(data) {
  return http.post(`${url}/addSong`, data);
}

export function resetAllSongs(data) {
  return http.post(`${url}/resetAllSongs`, data);
}

export function addSingleSong(data) {
  return http.post(`${url}/addSingleSong`, data);
}

export function editExistingSong(id, data) {
  return http.put(`${url}/editExistingSong/${id}`, data);
}

export function getSongById(id) {
  return http.get(`${url}/getSongById/${id}`);
}

export function gethorizonatalscorcard() {
  return http.get(
    `http://localhost:8002/analytics/scorecard/horizontal-score-card?request_id=2791015`
  );
}
