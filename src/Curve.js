import React from 'react';
import { gsap, TweenLite, MotionPathPlugin, Draggable } from "gsap/all";

class Curve extends React.Component {
    constructor(props){
        super(props);
        this.myRef = null;
        
        this.state = {
            curveInfo : {
                startX : this.props.startX,
                startY : this.props.startY,
                controlX : this.props.controlX,
                controlY : this.props.controlY,
                endX : this.props.endX,
                endY : this.props.endY,
                path : this.props.path
            }
        }
    }

    componentDidMount() {
        console.log("Curve: componentDidMount");
        console.log(this.props);
        Draggable.create(this.myRef, {
      type:"x",
      onPress: function() {
        console.log("OnPress");
      },
      onDrag: (e) => {
            this.setState((state) => {
                let info = this.state.curveInfo;

                //modify the end point x
                info.endX = e.offsetX;

                //modify the control point x
                info.controlX = (e.offsetX - info.startX)*0.5;

                //modify the path
                const curvePath = ("M"+this.constructCoordinate(info.startX, info.startY)
                +"Q"+this.constructCoordinate(info.controlX, info.controlY)
                +this.constructCoordinate(info.endX, info.endY));
                info.path = curvePath;

                return {curveInfo:info}
                });
            }
        });
    }

    constructCoordinate = (x, y) => {
    const xy = (x+" "+y+" ");
    return xy;
    }

    onClickCirclePointStart = () => {
    }

    onClickCirclePointControl = () => {
    }

    onClickCirclePointEnd = () => {
    }

    render() {
        return(
            <svg width="100%" height="100%" className="dynamicsvg" viewBox="0 0 500 190" ref={div => (this.myRef = div)}>
                <path d={this.state.curveInfo.path}/>
                <circle className="btn" cx={this.state.curveInfo.startX} cy={this.state.curveInfo.startY} r="10" onClick={this.onClickCirclePointStart.bind(this)}/>
                <circle className="btn" cx={this.state.curveInfo.controlX} cy={this.state.curveInfo.controlY} r="10" onClick={this.onClickCirclePointControl.bind(this)}/>
                <circle className="btn" cx={this.state.curveInfo.endX} cy={this.state.curveInfo.endY} r="10" onClick={this.onClickCirclePointEnd.bind(this)}/>
            </svg>
        );
    }
}

export default Curve;