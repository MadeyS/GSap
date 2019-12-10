import React from 'react';
import { gsap, TweenLite, MotionPathPlugin, Draggable } from "gsap/all";

class DrawElasticHorizontalLine extends React.Component {
    constructor(props){
        super(props);
        this.myRef = null;
        //let initialEmptyPath = 'M '+this.constructCoordinate(0, 0)+this.constructCoordinate(0, 0);
        let initialEmptyPath = "";
        this.state = {
            lineInfo : {
                startX : 0,
                startY : 0,
                endX : 0,
                endY : 0,
                path : ""
            }
        }
    }

    componentDidMount() {
        console.log("DrawElasticHorizontalLine: componentDidMount");
        console.log(this.myRef);
        Draggable.create(this.myRef, {
        type:"x",
        onPress: function() {
            console.log("OnPress");
        },
        onDrag: (e) => {
            //   console.log("dragging");
                console.log(e.offsetX);
                console.log(e.offsetY);
                this.setState((state) => {
                    let info = this.state.lineInfo;

                    //modify the end point only along the x-axis
                    info.endX = e.offsetX;

                    //modify the path with the new end point
                    const curvePath = ("M"+this.constructCoordinate(info.startX, info.startY)+this.constructCoordinate(info.endX, info.endY));
                    info.path = curvePath;

                    return {lineInfo:info}
                });
        },
        onDragStart: (e) => {
            console.log("DragStart");
        },
        onDragEnd:(e) => {
            console.log("DragEnd");
        },
        });
}

    constructCoordinate = (x, y) => {
        const xy = (x+" "+y+" ");
        return xy;
    }

    onClickCircle = () => {
        console.log("circle click");
    }

    render() {
        return(
            <svg viewBox="0 0 500 190" id="svg" ref={div => (this.myRef = div)}>
                <path d={this.state.lineInfo.path}/>
              <circle className="btn" cx="0" cy="0" r="10" onClick={this.onClickCircle.bind(this)}/>
            </svg>
        );
    }
}

export default DrawElasticHorizontalLine;