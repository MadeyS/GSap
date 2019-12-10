import React from 'react';
import logo from './logo.svg';
import arrow from './arrow-16.png';
import './App.css';
import { gsap, MotionPathPlugin, Draggable } from "gsap/all";
import Curve from './Curve';
import DrawElasticHorizontalLine from './DrawElasticHorizontalLine';

class App extends React.Component {
  constructor(props){
    super(props);
    this.plotted = false;
    this.mouseDown = false;
    this.myElement = null;
    this.parbolicCurves = [];
    this.moveCiclePoint = false;
    this.mouseCoordinates = {x:0, y:0};
    this.curveInstance = null;
    this.curveRef = React.createRef();
    this.targetInstance = null;

    this.state = {
      points: [],
      numberLineControlCoordinates: {x:0, y: 50},
      numberLineStartCoordinates: {x: 0, y: 300},
      numberLineEndCoordinates: {x: 650, y: 300},
      };

      this.handleLoad = this.handleLoad.bind(this);
      //this.getSVGPathString = this.getSVGPathString.bind(this);
      this.onClickNumberLine = this.onClickNumberLine.bind(this);
      this.generateMarkup = this.generateMarkup.bind(this);
      this.constructCoordinate = this.constructCoordinate.bind(this);
      //this.onMouseDown = this.onMouseDown.bind(this);
      //this.onMouseUp = this.onMouseUp.bind(this);
      //this.onMouseMove = this.onMouseMove.bind(this);

      gsap.registerPlugin(MotionPathPlugin);
      gsap.registerPlugin(Draggable);
      
      // for representing the quad/curve in the parabola. This is out of the state variable as of now
      // the x coordinate below will keep changing depending on the distance of the drag
      //this.numberLineControlCoordinates = {x: 0, y: 50};
  }

  handleLoad = () => {
    console.log("loaded");

    gsap.to("#rect", {
    duration: 1, 
    repeat: 0,
    repeatDelay: 3,
    yoyo: false,
    // ease: "power1.inOut",
    motionPath:{
      path: "#path"
    }
  });
  }

   componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }


 onClickNumberLine = () => {
   //click point
   let x = this.mouseCoordinates.x;
   let y = this.mouseCoordinates.y;
  
    const coords = this.state.points;
    
    let startX = null;
    let startY = null;
    
    if(this.state ) {
      if(this.state.points.length === 0){
        //first click
        startX = this.state.numberLineStartCoordinates.x;
        startY = this.state.numberLineStartCoordinates.y;

        this.plotted = true;
      } else {
        const length = this.state.points.length;
        console.log("Length:"+length);
        startX = this.state.points[length-1].item.eX;
        startY = this.state.numberLineStartCoordinates.y;
      }
    }
    
    const controlX = startX + (x - startX)*0.5;
    const controlY = this.state.numberLineControlCoordinates.y;

    const endX = x;
    const endY = startY; //y always remains the same as startY

    const curvePath = ("M"+this.constructCoordinate(startX, startY)
            +"Q"+this.constructCoordinate(controlX, controlY)
            +this.constructCoordinate(endX, endY));

    const item = {
      prefix:"M",
      sX:startX,
      sY:startY,
      cX:controlX,
      cY:controlY,
      eX:endX,
      eY:endY
    };
        
    coords.push({item, curvePath});

    //this will trigger a re-render
    this.setState({points: coords});
 }

 clearPointsArray = () => {
   console.log("clearing the points array");
   this.state.points.splice(0);
 }

 onMouseMove = (e) => {
   this.mouseCoordinates = {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY};
   console.log(this.mouseCoordinates);
 }

 onMouseDown = (e) => {
 }

 onMouseUp = (e) => {
 }

//  getSVGPathString = (dto, index) => {
//    console.log("getSVGPathString"+dto);

//    let startX = null;
//    let startY = null;

//    if(index === 0) {
//     startX = this.state.numberLineStartCoordinates.x;
//     startY = this.state.numberLineStartCoordinates.y;
//    }
//    else {
//     startX = this.state.points[index-1];
//     startY = this.state.points[index-1];
//    }

//    const controlX = (dto.x - startX)*0.5;
//    const controlY = this.state.numberLineControlCoordinates.y;

//    console.log(dto.x);
//    console.log(dto.y);

//    return ("M"+this.constructCoordinate(startX, startY)
//           +"Q"+this.constructCoordinate(controlX, controlY)
//           +this.constructCoordinate(dto.x, dto.y));
//  }

  generateMarkup = () => {
    //returns the markup/updated markup to be rendered
    let arr1=[];
    this.state.points.map((dto, index) => {
      console.log(dto);
      const x = dto.item.sX;
      const y = dto.item.sY;
      const w = dto.item.eX - dto.item.sX;
      const h = dto.item.cY;
      
      const viewBox = "{x} {y} {w} {h}";
      console.log(viewBox);
      
      const keyId = "svg-number-line-"+index;

     arr1.push (
       
        <Curve key={keyId.toString()} path={dto.curvePath} 
        startX={dto.item.sX} startY={dto.item.sY} 
        controlX={dto.item.cX} controlY={dto.item.cY}
        endX={dto.item.eX} endY={dto.item.eY}  />
      
     )
   }, this);

   return  arr1;
  }
  
 constructCoordinate = (x, y) => {
   const xy = (x+" "+y+" ");
   return xy;
 }

  render() {
    return (
    <div className="App">
      <h5>MotionPathPlugin (new in GSAP 3)</h5>
        <div>
            <svg width="100%" height="100%"  viewBox="0 0 500 190" id="svg" >
              
              <path id="path" d="M 0 300 500 300"/>
              <rect className="btn" x="0" y="295" width="500" height="20" fill="dodgerblue" onMouseMove={this.onMouseMove} onClick={this.onClickNumberLine} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>
              <g id="rect">
                <img src={logo} className="App-logo" alt="logo" />
                  <text x="10" y="19" fontSize="14">SVG &lt;rect&gt;</text>
              </g>              

              {this.state.points.length > 0 && this.generateMarkup()}

              <DrawElasticHorizontalLine/>

            </svg>
        </div>
      </div>
    );
  }
}

export default App;
