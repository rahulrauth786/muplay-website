import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import { addMutipleSong, resetAllSongs } from "../../services/musicService";

const buttonRef = React.createRef();

export default class AddMultipleProduct extends Component {
  state = {
    results: [],
  };

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = async (datas) => {
    console.log("---------------------------");
    let formData = [];
    let headers = datas[0].data;
    console.log(headers);
    let idIndex = headers.findIndex((value) => value === "id");
    let titleIndex = headers.findIndex((value) => value === "title");
    let artistIndex = headers.findIndex((value) => value === "artist");
    let timeIndex = headers.findIndex((value) => value === "time");
    let genreImageIndex = headers.findIndex((value) => value === "genre_img");
    let genreIndex = headers.findIndex((value) => value === "genre");
    let imgIndex = headers.findIndex((value) => value === "img");
    let trackIndex = headers.findIndex((value) => value === "track");
    let categoryIndex = headers.findIndex((value) => value === "category");

    if (this.props.type === "reset") {
      if (idIndex === undefined) {
        alert("Id Column Doesnot Exist");
        return;
      }
    }

    if (titleIndex === undefined) {
      alert("Title Column Doesnot Exist");
      return;
    }
    if (artistIndex === undefined) {
      alert("Artist Column Doesnot Exist");
      return;
    }

    if (genreImageIndex === undefined) {
      alert("Genre Image Column Doesnot Exist");
      return;
    }
    if (genreIndex === undefined) {
      alert("Genre Column Doesnot Exist");
      return;
    }
    if (imgIndex === undefined) {
      alert("Image Column Doesnot Exist");
      return;
    }
    if (trackIndex === undefined) {
      alert("Track Index Column Doesnot Exist");
      return;
    }
    if (categoryIndex === undefined) {
      alert("Playlist Column Doesnot Exist");
      return;
    }
    if (this.props.type === "reset") {
      datas.map(function (obj, index) {
        if (index !== 0) {
          if (obj.data[1] !== undefined) {
            formData.push({
              id: obj.data[idIndex],
              title: obj.data[titleIndex],
              artist: obj.data[artistIndex],
              time: obj.data[timeIndex],
              music: false,
              genre: obj.data[genreIndex],
              genre_img: obj.data[genreImageIndex],
              img: obj.data[imgIndex],
              track: obj.data[trackIndex],
              category: obj.data[categoryIndex],
            });
          }
        }
      });
    } else {
      datas.map(function (obj, index) {
        if (index !== 0) {
          if (obj.data[1] !== undefined) {
            formData.push({
              title: obj.data[titleIndex],
              artist: obj.data[artistIndex],
              time: obj.data[timeIndex],
              genre: obj.data[genreIndex],
              genre_img: obj.data[genreImageIndex],
              img: obj.data[imgIndex],
              track: obj.data[trackIndex],
              category: JSON.stringify(obj.data[categoryIndex]),
            });
          }
        }
      });
    }

    if (this.props.type === "reset") {
      try {
        let response = await resetAllSongs(formData);
        console.log(response);
        alert(response.data.msg);
        this.setState({ results: response.data });
      } catch (error) {
        if (error) console.log(error);
        alert("Not a Valid Csv File Please Upload Again !");
        this.setState({ results: [] });
      }
    }
    if (this.props.type === "update") {
      try {
        let response = await addMutipleSong(formData);
        console.log(response);
        this.setState({ results: response.data });
      } catch (error) {
        if (error) console.log(error);
        alert("Not a Valid Csv File Please Upload Again !");
        this.setState({ results: [] });
      }
    }
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log("---------------------------");
    console.log(err);
    console.log("---------------------------");
  };

  handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    const { results } = this.state;
    return (
      <>
        <h5 style={{ color: "white" }}>Basic Upload</h5>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <button
                type="button "
                className="btn btn-warning"
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: 320,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: 250,
                  color: "white",
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        {results && results.length > 0 ? (
          <div
            className="row bg-white"
            style={{ height: 550, overflowY: "scroll" }}
          >
            <div className="col-12 ">
              <div className="row mt-2 py-1   text-center ">
                <div className="col-12 d-sm-block d-none">
                  <div className="row bg-dark text-white">
                    <div className="col  h5 p-1">S.No</div>
                    <div className="col  h5 p-1">Title</div>
                    <div className="col  h5 p-1">Playlist</div>
                    <div className="col  h5 p-1">Genre</div>
                    <div className="col  h5 p-1">Status</div>
                    <div className="col  h5 p-1">Reason</div>
                  </div>
                </div>
              </div>

              {results.map((result, index) => (
                <div className="row my-1 text-center">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 d-sm-block d-none">
                        <div className="row">
                          <div className="col border border-grey bg-light shadow p-1">
                            {index + 1}
                          </div>
                          <div className="col border border-grey bg-light shadow p-1">
                            {result.title}
                          </div>
                          <div className="col border border-grey bg-light shadow p-1">
                            {result.playlist}
                          </div>
                          <div className="col border border-grey bg-light shadow p-1">
                            {result.genre}
                          </div>
                          {result.statusCode === 200 ? (
                            <div className="col border border-grey bg-light shadow p-1 text-grey bg-light">
                              {result.status}
                            </div>
                          ) : (
                            <div className="col border border-grey bg-light shadow p-1 text-danger">
                              {result.status}
                            </div>
                          )}
                          <div className="col border border-grey bg-light shadow p-1">
                            {result.reason}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 d-sm-none border  my-2 shadow text-light bg-dark ">
                        <div className="row text-right py-2 border-bottom ">
                          <div className="col-5">S.No : </div>
                          <div className="col">
                            <span>{index + 1}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Title</div>
                          <div className="col">
                            <span>{result.title}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Playlist : </div>
                          <div className="col">
                            <span>{result.playlist}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Genre : </div>
                          <div className="col">
                            <span>{result.genre}</span>
                          </div>
                        </div>
                        {result.statusCode === 200 ? (
                          <div className="row text-right py-2 border-bottom">
                            <div className="col-5">Status : </div>
                            <div className="col">
                              <span>{result.status}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="row text-right py-2 border-bottom">
                            <div className="col-5">Status : </div>
                            <div className="col">
                              <span>{result.status}</span>
                            </div>
                          </div>
                        )}{" "}
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Reason : </div>
                          <div className="col">
                            <span>{result.reason}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
