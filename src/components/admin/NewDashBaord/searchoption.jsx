import React, { Component } from "react";
import "./searchoption.css"

class Search extends Component {
    state = {
        search: "",
        showSearchOption: true
    }
    render() {
        let { search } = this.state;
        return (<>
            <div className="row d-lg-block d-none">
                <div className="col-12">
                    {this.state.showSearchOption ? (
                        <div className="row">

                            <div className="col-12  px-0" style={{ minWidth: 500 }}>
                                <form onSubmit={this.handleSubmit}>
                                    <input
                                        type="text"
                                        className="form-control bg-white"
                                        value={search}
                                        onChange={this.handleChange}
                                        style={{
                                            minWidth: 250,
                                            height: 50,
                                        }}
                                        placeholder="Search for Songs,Artist,Playlist and More"
                                    />
                                    <button
                                        className="btn btn-dark"
                                        style={{
                                            position: "absolute",

                                            top: 0,
                                            right: 0,
                                            width: 150,
                                            height: 50
                                        }}
                                    >
                                        <svg width="25" height="25" viewBox="0 0 25 25">
                                            <path
                                                className="fill_path"
                                                style={{ opacity: 1 }}
                                                fill="#FFF"
                                                fillRule="evenodd"
                                                d="M69.5 34a6.5 6.5 0 0 1 6.5 6.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 69.5 47a6.5 6.5 0 1 1 0-13zm0 2C67 36 65 38 65 40.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z"
                                                transform="translate(-59 -32)"
                                            ></path>
                                        </svg>{" "}
                                        Search
                                    </button>
                                </form>
                            </div>
                            {/* <div>
                                <div className="row ml-2 mt-2">
                                    <div className="col-12 d-flex">
                                        <div>
                                            <span
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: 500,
                                                    color: "#999999",
                                                }}
                                            >
                                                {name}
                                            </span>
                                        </div>
                                        <div
                                            className="ml-3 d-flex"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div
                                                className="border text-center mr-2"
                                                style={{
                                                    width: 140,
                                                    backgroundColor: "#efefef",
                                                    height: 27,
                                                    color: "red",
                                                    borderRadius: 50,
                                                }}
                                                onClick={() =>
                                                    this.props.history.push(
                                                        `/${playlist}/Naach Meri Rani`
                                                    )
                                                }
                                            >
                                                Naach Meri Rani
                                            </div>
                                            <div
                                                className="border text-center  mr-2"
                                                style={{
                                                    width: 140,
                                                    backgroundColor: "#efefef",
                                                    height: 27,
                                                    color: "red",
                                                    borderRadius: 50,
                                                }}
                                                onClick={() =>
                                                    this.props.history.push(
                                                        `/${playlist}/Badaami Rang`
                                                    )
                                                }
                                            >
                                                Badaami Rang
                                            </div>
                                            <div
                                                className="border text-center  mr-2"
                                                style={{
                                                    width: 140,
                                                    backgroundColor: "#efefef",
                                                    height: 27,
                                                    color: "red",
                                                    borderRadius: 50,
                                                }}
                                                onClick={() =>
                                                    this.props.history.push(
                                                        `/${playlist}/BurjKhalifa`
                                                    )
                                                }
                                            >
                                                Burj Khalifa
                                            </div>
                                            <div
                                                className="border text-center  mr-2"
                                                style={{
                                                    width: 40,
                                                    backgroundColor: "#efefef",
                                                    height: 27,
                                                    color: "red",
                                                    borderRadius: 50,
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => this.handlePopBox()}
                                            >
                                                +7
                                            </div>
                                        </div>

                                        {showPopBox ? (
                                            <div
                                                className="pop-up-box bg-white rounded shadow border py-2"
                                                style={{
                                                    position: "absolute",
                                                    zIndex: 1,
                                                    top: 40,
                                                    right: 20,
                                                    width: 280,
                                                    height: "auto",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        top: -15,
                                                        left: 235,
                                                        width: 0,
                                                        height: 0,
                                                        borderLeft: "15px solid transparent",
                                                        borderRight: "15px solid transparent",
                                                        borderBottom: "26px solid white",
                                                    }}
                                                ></div>
                                                <div className="row mx-1">
                                                    <div className="col-12 d-flex flex-wrap">
                                                        {trending.map((obj) => (
                                                            <span
                                                                className="border text-center mr-2 d-block px-2 my-2"
                                                                style={{
                                                                    backgroundColor: "#efefef",
                                                                    height: 27,
                                                                    color: "red",
                                                                    borderRadius: 50,
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    this.props.history.push(
                                                                        `/${playlist}/${obj.link}`
                                                                    )
                                                                }
                                                            >
                                                                {obj.list}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div></>)
    }
}

export default Search;