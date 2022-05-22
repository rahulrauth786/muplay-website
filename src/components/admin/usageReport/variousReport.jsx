import React, { Component } from "react";
//import download from "download";
// import { CSVLink } from "react-csv";
import { ExportToCsv } from "export-to-csv";
import EditProduct from "../editProduct";
import { downloadSong, getReport } from "../../../services/musicService";
import { Link } from "react-router-dom";
class UsageReport extends Component {
  state = {
    reports: [
      { name: "Most Song Played Report", apiend: "mostPlayedSong" },
      { name: "Most Search Songs Report", apiend: "mostSearchSong" },
      { name: "Most Favourite Songs Report", apiend: "mostFavSong" },
      { name: "Most played Chart Report", apiend: "mostPlayedChart" },
      { name: "All Songs Details", apiend: "allSongsReport" },
    ],
    reportSel: "",
    data: [],
    editId: null,
  };

  downloadReport = async (apiEnd) => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    try {
      let response = await getReport(apiEnd);

      csvExporter.generateCsv(response.data);
    } catch (error) {}
  };
  viewReport = async (apiEnd) => {
    this.setState({ reportSel: apiEnd });
    try {
      let response = await getReport(apiEnd);
      this.setState({ data: response.data, editId: null });
    } catch (error) {
      console.log(error);
    }
  };

  handleEdit = (id) => {
    this.setState({ editId: id });
  };
  render() {
    const { reports, data, reportSel, editId } = this.state;
    return (
      <>
        {reports.map((report) => (
          <div className="row mx-1 " id="Usage Report">
            <div className="col-7 col-sm-9 col-md-10 py-2 border border-dark bg-dark text-white my-1">
              <span
                style={{
                  fontSize: "clamp(12px,2vw,20px)",
                  fontFamily: "Serif",
                }}
              >
                {report.name}
              </span>
            </div>
            <div className="col border p-0 my-1">
              <button
                className="btn btn-warning w-100 text-center"
                style={{
                  height: "100%",
                  fontSize: "clamp(8px,2vw,14px)",
                  fontWeight: "bold",
                  borderRadius: 0,
                }}
                onClick={() => this.viewReport(report.apiend)}
              >
                View
              </button>
            </div>
            <div className="col border p-0 my-1">
              <button
                className="btn btn-warning w-100"
                style={{
                  height: "100%",
                  fontSize: "clamp(8px,2vw,14px)",
                  fontWeight: "bold",
                  borderRadius: 0,
                }}
                onClick={() => this.downloadReport(report.apiend)}
              >
                Download
              </button>
            </div>
          </div>
        ))}

        {data && data.length > 0 && editId === null ? (
          <>
            {reportSel === "mostSearchSong" ? (
              <>
                {" "}
                <div
                  className="row mx-1 mt-2 text-center bg-primary text-white mb-1"
                  style={{
                    fontSize: "clamp(10px,2vw,20px)",
                    fontFamily: "Serif",
                  }}
                >
                  <div className="col-md-1  d-md-block d-none">S.NO</div>
                  <div className="col-2 col-sm-2 border">KeyWord</div>
                  <div className="col border ">Total Volume Count</div>
                </div>
              </>
            ) : (
              ""
            )}

            {reportSel === "mostFavSong" ? (
              <>
                {" "}
                <div
                  className="row mx-1 mt-2 text-center bg-dark text-white mb-1"
                  style={{
                    fontSize: "clamp(10px,2vw,20px)",
                    fontFamily: "Serif",
                  }}
                >
                  <div className="col-12">
                    <div className="row bg-dark" style={{ width: 1492 }}>
                      <div className="col-md-1  d-md-block d-none">S.NO</div>{" "}
                      <div className="col-2 col-sm-2 border">Song Id</div>
                      <div className="col border">Song Title</div>
                      <div className="col border ">Song Image</div>
                      <div className="col border ">Artist</div>
                      <div className="col border ">Total Volume Count</div>
                      <div className="col border d-block text-right p-0 "></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {reportSel === "mostPlayedSong" ? (
              <>
                {" "}
                <div
                  className="row mx-1 mt-2 text-center bg-dark text-white mb-1"
                  style={{
                    fontSize: "clamp(10px,2vw,20px)",
                    fontFamily: "Serif",
                    width: 1492,
                  }}
                >
                  <div className="col-12 d-sm-block d-none">
                    <div className="row bg-dark">
                      <div className="col-md-1  d-md-block d-none">S.NO</div>
                      <div className="col-2 col-sm-2 border">Song Id</div>
                      <div className="col border">Song Title</div>
                      <div className="col border ">Song Image</div>
                      <div className="col border ">Artist</div>
                      <div className="col border ">Total Volume Count</div>
                      <div className="col border d-block text-right p-0 "></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {reportSel === "mostPlayedChart" ? (
              <>
                <div
                  className="row mx-1 mt-2 text-center bg-dark text-white mb-1"
                  style={{
                    fontSize: "clamp(10px,2vw,20px)",
                    fontFamily: "Serif",
                  }}
                >
                  <div className="col-12">
                    <div className="row bg-dark">
                      <div className="col-md-1  d-md-block d-none">S.NO</div>
                      <div className="col-2 col-sm-2 border">Playlist Name</div>
                      <div className="col border">Genre</div>
                      <div className="col border ">Imagee</div>
                      <div className="col border ">Total Volume Count</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {reportSel === "allSongsReport" ? (
              <>
                <div
                  className="row mx-1 mt-2 text-center bg-warning  text-dark mb-1"
                  style={{
                    fontSize: "clamp(10px,2vw,20px)",
                    fontFamily: "Serif",
                  }}
                >
                  <div className="col-sm-12 d-none d-sm-block text-light">
                    <div className="row " style={{ width: 1492 }}>
                      <div className="col-md-1  d-md-block d-none">S.NO</div>{" "}
                      <div className="col-2 col-sm-2 border">Song Id</div>
                      <div className="col border">Playlist Name</div>
                      <div className="col border">Song Title</div>
                      <div className="col border ">Song Image</div>
                      <div className="col border ">Genre</div>
                      <div className="col border ">Genre Image</div>
                      <div className="col border">Artist</div>
                      <div className="col border d-block text-right p-0 "></div>
                      <div className="col border d-block text-right p-0 "></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {data.map((obj, index) => (
              <>
                {reportSel === "mostSearchSong" ? (
                  <>
                    <div
                      className="row mx-1 mt-2 text-center bg-dark text-white mb-1"
                      style={{
                        fontSize: "clamp(10px,2vw,20px)",
                        fontFamily: "Serif",
                      }}
                    >
                      <div className="col-12">
                        <div className="row bg-dark">
                          <div className="col-md-1 border d-md-block d-none">
                            {index + 1}
                          </div>{" "}
                          <div className="col-2 col-sm-2 border">
                            {obj.keyword}
                          </div>
                          <div className="col border ">{obj.volume}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {reportSel === "mostFavSong" ? (
                  <>
                    <div
                      className="row mx-1 mt-2 text-center mb-1 "
                      style={{
                        fontSize: "clamp(14px,2vw,16px)",
                        fontFamily: "Serif",
                      }}
                    >
                      <div className="col-12 d-sm-block d-none">
                        <div className="row bg-dark text-light">
                          <div className="col-md-1 border d-md-block d-none">
                            {index + 1}
                          </div>
                          <div className="col-2 col-sm-2 border">{obj.id}</div>
                          <div className="col border">{obj.name}</div>
                          <div className="col border ">
                            {" "}
                            <img
                              src={obj.img}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                          <div className="col border">{obj.artist}</div>
                          <div className="col border ">{obj.volume}</div>
                          <div
                            className="col border d-block text-right p-0"
                            style={{ verticalAlign: "center" }}
                          >
                            <button
                              className="btn btn-warning w-100"
                              style={{
                                overflow: "hidden",
                                height: "100%",
                                borderRadius: 0,
                              }}
                              onClick={() => this.handleEdit(obj.id)}
                            >
                              <i className="fa fa-edit"></i> &nbsp;Edit
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className=" col-12 d-sm-none border  my-2 shadow text-light bg-dark">
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Song Id : </div>
                          <div className="col">
                            <span>{obj.id}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Title : </div>
                          <div className="col ">
                            <span>{obj.name}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Song Image : </div>
                          <div className="col ">
                            <img
                              src={obj.img}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Artist : </div>
                          <div className="col ">
                            <span>{obj.artist}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Volume : </div>
                          <div className="col ">
                            <span>{obj.volume}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {reportSel === "mostPlayedSong" ? (
                  <>
                    <div
                      className="row mx-1 mt-2 text-center mb-1 "
                      style={{
                        fontSize: "clamp(14px,2vw,16px)",
                        fontFamily: "Serif",
                      }}
                    >
                      <div className="col-12 d-sm-block d-none">
                        <div className="row bg-dark text-light">
                          <div className="col-md-1 border d-md-block d-none">
                            {index + 1}
                          </div>
                          <div className="col-2 col-sm-2 border">{obj.id}</div>
                          <div className="col border">{obj.name}</div>
                          <div className="col border ">
                            {" "}
                            <img
                              src={obj.img}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                          <div className="col border">{obj.artist}</div>
                          <div className="col border ">{obj.volume}</div>
                          <div
                            className="col border d-block text-right p-0"
                            style={{ verticalAlign: "center" }}
                          >
                            <button
                              className="btn btn-warning w-100"
                              style={{
                                overflow: "hidden",
                                height: "100%",
                                borderRadius: 0,
                              }}
                              onClick={() => this.handleEdit(obj.id)}
                            >
                              <i className="fa fa-edit"></i> &nbsp;Edit
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className=" col-12 d-sm-none border  my-2 shadow text-light bg-dark">
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Song Id : </div>
                          <div className="col">
                            <span>{obj.id}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Title : </div>
                          <div className="col ">
                            <span>{obj.name}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Song Image : </div>
                          <div className="col ">
                            <img
                              src={obj.img}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Artist : </div>
                          <div className="col ">
                            <span>{obj.artist}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Volume : </div>
                          <div className="col ">
                            <span>{obj.volume}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {reportSel === "allSongsReport" ? (
                  <>
                    <div
                      className="row mx-1 text-center"
                      style={{
                        fontSize: "clamp(14px,2vw,16px)",
                        fontFamily: "Serif",
                      }}
                    >
                      <div className="col-12 d-sm-block d-none">
                        <div className="row text-dark" style={{ width: 1492 }}>
                          <div className="col-md-1 border d-md-block d-none">
                            {index + 1}
                          </div>
                          <div className="col col-sm-2 border">{obj.id}</div>
                          <div className="col border text-truncate playlistName">
                            {obj.playlist}
                          </div>
                          <div className="col border text-truncatec">
                            {obj.title}
                          </div>
                          <div className="col border text-truncate songImage p-2 ">
                            {" "}
                            <img
                              src={obj.img}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                          <div
                            className="col border text-truncate genre"
                            style={{ textTransform: "capitalize" }}
                          >
                            {obj.genre}
                          </div>
                          <div className="col border text-truncate greImg p-2">
                            <img
                              src={obj.genreImg}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                          <div className="col border text-truncate artist ">
                            {obj.artist}{" "}
                          </div>
                          <div
                            className="col border d-block text-right p-0"
                            style={{ verticalAlign: "center" }}
                          >
                            <a href={obj.track} rel="nofollow">
                              <button
                                className="btn btn-warning w-100 "
                                style={{
                                  overflow: "hidden",
                                  height: "100%",
                                  borderRadius: 0,
                                }}
                              >
                                Download
                              </button>
                            </a>
                          </div>
                          <div
                            className="col border d-block text-right p-0"
                            style={{ verticalAlign: "center" }}
                          >
                            <button
                              className="btn btn-warning w-100 "
                              style={{
                                overflow: "hidden",
                                height: "100%",
                                borderRadius: 0,
                              }}
                              onClick={() => this.handleEdit(obj.id)}
                            >
                              <i className="fa fa-edit"></i> &nbsp;Edit
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 d-sm-none border text-light my-2 shadow"
                        style={{ backgroundColor: "#343a40" }}
                      >
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Song Id : </div>
                          <div className="col ">
                            <span>{obj.id}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5">Song Image </div>
                          <div className="col ">
                            <img
                              src={obj.img}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5 pl-0">Playlist Name : </div>
                          <div className="col ">
                            <span style={{ textTransform: "capitalize" }}>
                              {obj.playlist}
                            </span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5 pl-0">Title : </div>
                          <div className="col ">
                            <span>{obj.title}</span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5 pl-0">Genre : </div>
                          <div className="col ">
                            <span style={{ textTransform: "capitalize" }}>
                              {obj.genre}
                            </span>
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5 pl-0">Genre Image : </div>
                          <div className="col ">
                            <img
                              src={obj.genreImg}
                              style={{ width: 120, height: 120 }}
                            />
                          </div>
                        </div>
                        <div className="row text-right py-2 border-bottom">
                          <div className="col-5 pl-0">Artist : </div>
                          <div className="col ">
                            <span>{obj.artist}</span>
                          </div>
                        </div>
                        <div className="row text-right">
                          <div className="col-12">
                            <button className="btn btn-warning my-2 btn-sm mr-1">
                              <a
                                href={obj.track}
                                rel="nofollow"
                                className="text-dark"
                              >
                                Download
                              </a>
                            </button>

                            <button
                              className="btn btn-warning my-2 btn-sm"
                              onClick={() => this.handleEdit(obj.id)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
                {reportSel === "mostPlayedChart" ? (
                  <>
                    <div
                      className="row mx-1 mt-2 text-center bg-dark text-white mb-1"
                      style={{
                        fontSize: "clamp(10px,2vw,20px)",
                        fontFamily: "Serif",
                      }}
                    >
                      <div className="col-12">
                        <div className="row bg-dark">
                          <div className="col-md-1 border d-md-block d-none">
                            {index + 1}
                          </div>
                          <div className="col-2 col-sm-2 border">
                            {obj.name}
                          </div>
                          <div className="col border">{obj.genre}</div>
                          <div className="col border ">
                            <img
                              src={obj.img}
                              style={{ width: 50, height: 80 }}
                            />
                          </div>
                          <div className="col border ">{obj.volume}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            ))}
          </>
        ) : (
          ""
        )}

        {editId !== null ? (
          <div className="row">
            <div className="col-12">
              <EditProduct id={editId} />
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default UsageReport;
