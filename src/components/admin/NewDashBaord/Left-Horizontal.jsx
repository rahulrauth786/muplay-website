import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMusic, faCirclePlay, faChartArea, faTriangleCircleSquare, faUserCircle, faHeartMusicCameraBolt } from "@fortawesome/free-solid-svg-icons";
import "./leftBar.css"

class LeftBar extends Component {
    state = {
        list: [{ name: "Dashboard", icon: faHome },
        { name: "Album", icon: faMusic },
        { name: "Music", icon: faHeartMusicCameraBolt },
        { name: "Playlist", icon: faCirclePlay },
        { name: "Profile", icon: faUserCircle },
        { name: "Settings", icon: faHome },
        { name: "Reports", icon: faChartArea }],
        list_sel: "Dashboard"
    }

    componentDidCatch() { }

    changeOption = (name) => {
        this.setState({ list_sel: name })
        this.props.optionSelected(name);
    }

    render() {
        let list = this.state.list
        return (<>

            <div className="row">
                <div className="col-12  pt-4 pb-4 logo-div">
                    <div className="d-flex flex-row justify-content-center">
                        <div className="p-2 logo-new-sq1">
                            <div className="p-2 logo-new-sq2">

                            </div>
                        </div>

                        <div className="m-2 pl-1 pt-1 text-wrap logo_co logo_text ">GOONGU NANA</div>
                    </div>
                </div>
                <div className="col-12 list_container">
                    <div className="d-flex flex-column  mt-1">
                        {list ? list.map(lis => <>
                            {this.state.list_sel === lis.name ?
                                <>
                                    <div className="p-2  d-flex  justify-content-center  "
                                        style={{ fontWeight: 100 }} onClick={() => this.changeOption(lis.name)}>
                                        <div className="list text-success " >
                                            <FontAwesomeIcon icon={lis.icon} className=" pt-1 pb-1 mr-4 mt-1" />
                                            <label className=" pr-1 pl-1 pt-1">{lis.name}</label>
                                        </div>

                                    </div>
                                </> :
                                <>
                                    <div className="p-2  d-flex  justify-content-center  "
                                        style={{ fontWeight: 100, color: "lightgray" }} onClick={() => this.changeOption(lis.name)}>
                                        <div className="list ">
                                            <FontAwesomeIcon icon={lis.icon} className=" pt-1 pb-1 mr-4 mt-1" />
                                            <label className=" pr-1 pl-1 pt-1">{lis.name}</label>
                                        </div>

                                    </div>
                                </>}
                        </>) :
                            <></>}


                    </div>


                </div>

            </div>
            <div className="row mb-2 mt-4 signout_div">
                <div className="col-12">
                    <div className="signout d-flex justify-content-center py-2 ">
                        SIGN OUT
                    </div>

                </div>
            </div>

        </>);
    }


}


export default LeftBar;