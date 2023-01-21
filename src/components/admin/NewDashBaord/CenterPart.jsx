import React, { Component } from "react";
import AddSingleProduct from "../addSingleProduct";
import GraphLarge from "./Graphs/graph-large";
import Graph from "./Graphs/graph-large";
import "./centre.css"
import UsageReport from "../usageReport/variousReport";



class CenterPart extends Component {
    state = {}

    componentDidCatch() { }

    render() {

        let { optionSelected } = this.props
        return (<>
            <div className="row ">
                <div className="col-12"></div>
                <div className="col-12">
                    <div className="row ml-2 mr-2 mt-1 row-center ">

                        <div className="col-12">
                            {/* // {optionSelected ? (optionSelected === 'graph' ? <GraphLarge /> : "") : (<GraphLarge />)} */}
                            {optionSelected ? (optionSelected === 'Playlist' ? <AddSingleProduct /> : <GraphLarge />) : (<GraphLarge />)}

                            {/* {optionSelected ? (optionSelected === 'Reports' ? <UsageReport /> : <GraphLarge />) : (<GraphLarge />)} */}

                        </div>
                    </div>
                </div>
            </div>


        </>)

    }
}


export default CenterPart