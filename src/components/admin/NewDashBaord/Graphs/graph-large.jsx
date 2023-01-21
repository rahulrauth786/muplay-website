import React, { Component } from "react";

import "./graph.css"

class GraphLarge extends Component {
    state = {}

    componentDidCatch() { }

    render() {


        return (<>
            <div className="row ">
                <div className="col-9 ">
                    <div className="row">
                        <div className="col-12  bg-white row-1"></div>
                    </div>
                    <div className="row mt-3 ">
                        <div className="col-4 ">
                            <div className="row bg-white row-1 mr-1">
                                <div className="col-12"></div>
                            </div>
                        </div>
                        <div className="col-4 ">
                            <div className="row bg-white row-1 mr-1">
                                <div className="col-12"></div>
                            </div>
                        </div>
                        <div className="col-4 ">
                            <div className="row bg-white row-1">
                                <div className="col-12"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-6 ">
                            <div className="row row-3 bg-white mr-1">
                                <div className="col-12 "></div>
                            </div>
                        </div>
                        <div className="col-6 ">
                            <div className="row row-3 bg-white">
                                <div className="col-12 "></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-3 ">
                    <div className="row bg-white row-4 ml-1">
                        <div className="col-12"></div>
                    </div>
                </div>
            </div>


        </>)

    }
}


export default GraphLarge