import React, {Component} from 'react';
import {render} from 'react-dom';
import {gsap, TweenMax, Draggable, MotionPathPlugin} from 'gsap/all';
import './GSAPDraggable.css';
import logo from './logo.svg';

class GSAPDraggable extends Component {
    constructor(props){
        super(props);

        this.dragTarget = null;
        this.dragInstance = null;

        gsap.registerPlugin(MotionPathPlugin);
        gsap.registerPlugin(Draggable);
    }

    componentDidMount() {
    console.log(this.dragTarget);
    this.dragInstance = Draggable.create(this.dragTarget, {
      type: "x, y",
      onPress: function() {
        console.log("draggable clicked!!!");
      },
      onDragStart: function() {
        console.log("Dragging!!!");
      }
      // dragClickables: true
    });
    console.log(this.dragInstance);
  }

    /*render() {
        return (
            <div>
                <div className="draggable" ref={div => (this.dragTarget = div)}>
                    Drag & Rotate
                </div>
                </div>
        );
    }*/

    render() {
        return(
            <div ref={div => (this.dragTarget = div)}>
                <div width="5000px" height="100%" float="left" display="inline-block">
                    <svg width="100%" height="100%" className="staticLine" viewBox="-20 0 557 190" id="svg" >
                    {/*<circle cx="100" cy="100" r="3" />
                    <circle  cx="300" cy="20" r="3" />*/}
                    {/*<path id="path" d="M 0 300 600 300"/>*/}
                    <path id="path" d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37" />
                    <rect className="btn" x="0" y="295" width="600" height="20" fill="dodgerblue" onMouseMove={this.onMouseMove} onClick={this.onClickNumberLine} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>
                    <g id="rect">
                        <img src={logo} className="App-logo" alt="logo" />
                        <text x="10" y="19" fontSize="14">SVG &lt;rect&gt;</text>
                    </g>
                    </svg>
                </div>
                </div>);
    }
}

export default GSAPDraggable;
