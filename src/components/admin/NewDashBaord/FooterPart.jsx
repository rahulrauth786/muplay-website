import React, { Component } from "react";



class FooterPart extends Component {
    state = {}

    componentDidCatch() { }

    render() {

        return (<>
            <div className="row   " >
                <div className="col-12 d-flex justify-content-center" style={{ fontSize: 18, fontWeight: 400, color: "grey" }}>
                    <span className="">© 2022, Developed by
                        Rahul Routh
                        for a better backend experiance for Goongunana.com.</span>
                </div>
            </div>
        </>);

    }


}


export default FooterPart;