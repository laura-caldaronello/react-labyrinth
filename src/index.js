import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function searchInArrayOfArrays(bigArray,smallArray){
  for (let i = 0; i < bigArray.length; i++) {
    if (bigArray[i].toString() === smallArray.toString()) {
      return true;
    }
  }
  return false;
}

function whereInArrayOfArrays(bigArray,smallArray){
  for (let i = 0; i < bigArray.length; i++) {
    if (bigArray[i].toString() === smallArray.toString()) {
      return i;
    }
  }
  return -1;
}

//ci sono duplicati?
function areThereDuplicates(array) {
  for (let i = 0; i < array.length; i++) {
    for (let t = i + 1; t < array.length; t++) {
      if (array[i].toString() === array[t].toString()) {
        return true;
      }
    }
  }
  return false;
}

//elimino le figure chiuse
function deleteFirstCircle(array) {
  for (let i = 0; i < array.length; i++) {
    for (let t = i + 1; t < array.length; t++) {
      if (array[i].toString() === array[t].toString()) {
        array.splice(i + 1,t - i);
        return array;
      }
    }
  }
  return array;
}

class Horizontal extends React.Component {
  render() {
    return (
      <div className="horizontal"></div>
    );
  }
}

class Vertical extends React.Component {
  render() {
    return (
      <div className="vertical"></div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <div 
        className="square"
        style={{
          backgroundColor: (this.props.passed && this.props.solution)? 'yellow' : 'lightgoldenrodyellow'
        }}
      ></div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: [],
      directions: [],
      solution: false,
      randoms: [],
      side: 20,
    };
  }
  
  //rendering
  horizontalRender(r,i) {
    return <Horizontal key={'horizontal-' + r + '-' + i}/>
  };
  verticalRender(r,i) {
    return <Vertical key={'vertical-' + r + '-' + i}/>
  };
  squareRender(r,i) {
    return <Square 
      key={'square-' + r + '-' + i}
      passed={(searchInArrayOfArrays(this.state.path,[r,i])? true : false)}
      solution={this.state.solution? true : false}
    />
  };

  show() {
    this.setState({
      solution: !this.state.solution,
    });
  }

  go() {

    //bordi
    var tops = [];
    var rights = [];
    var bottoms = [];
    var lefts = [];
    for (let i = 0; i < this.state.side; i++) {
      tops.push([0,i]);
      rights.push([i,this.state.side - 1]);
      bottoms.push([this.state.side - 1,i]);
      lefts.push([i,0]);
    }
    
    //start
    var border = tops.concat(rights).concat(bottoms).concat(lefts);
    var start;
    do {
      start = border[getRandomInt(border.length)];
    } while (
      start.toString() === [0,0].toString() ||
      start.toString() === [0,19].toString() ||
      start.toString() === [19,0].toString() ||
      start.toString() === [19,19].toString()
    )
    var myPathStart = [];
    myPathStart.push(start);

    var directionStart;
    var directions = ['top','right','bottom','left'];
    if (searchInArrayOfArrays(tops,start)) {
      directionStart = 'bottom';
      myPathStart.push([start[0] + 1,start[1]]);
      directions = directions.concat('right').concat('bottom').concat('left');
    }
    else if (searchInArrayOfArrays(rights,start)) {
      directionStart = 'left';
      myPathStart.push([start[0],start[1] - 1]);
      directions = directions.concat('left').concat('bottom').concat('top');
    }
    else if (searchInArrayOfArrays(bottoms,start)) {
      directionStart = 'top';
      myPathStart.push([start[0] - 1,start[1]]);
      directions = directions.concat('right').concat('top').concat('left');
    }
    else if (searchInArrayOfArrays(lefts,start)) {
      directionStart = 'right';
      myPathStart.push([start[0],start[1] + 1]);
      directions = directions.concat('right').concat('bottom').concat('top');
    }

    //prosecuzione
    var currentSquare;
    var newSquare;
    var direction;
    var myPath = [];
    var myDirections = [];

    while (myPath.length < 20) {
      console.log('tentativo');
      myPath = [myPathStart[0],myPathStart[1]];
      myDirections = [];
      myDirections.push(directionStart);

      do {
        currentSquare = myPath[myPath.length - 1];
        newSquare = [currentSquare[0],currentSquare[1]];
        direction = directions[getRandomInt(7)];
        if (direction === 'top') {
          newSquare[0]--;
        }
        else if (direction === 'right') {
          newSquare[1]++;
        }
        else if (direction === 'bottom') {
          newSquare[0]++;
        }
        else if (direction === 'left') {
          newSquare[1]--;
        }
        myDirections.push(direction);
        myPath.push(newSquare);
      } while (!searchInArrayOfArrays(border,currentSquare))

      myDirections.splice(myDirections.length - 1,1);
      myPath.splice(myPath.length - 1,1);
      while (areThereDuplicates(myPath)) {
        myPath = deleteFirstCircle(myPath);
      }
      console.log(myPath.length);
    }
    
    this.setState({
      path: myPath,
      directions: myDirections,
      solution: false,
    });

  }

  render() {

    var structure = [];
    for (var r = 0; r < this.state.side; r++) {
      var rowHorizontal = [];
      for (let i = 0; i < this.state.side; i++) {
        rowHorizontal.push(this.horizontalRender(r,i));
      }
      var rowVertical = [];
      for (var i = 0; i < this.state.side; i++) {
        rowVertical.push(this.verticalRender(r,i));
        rowVertical.push(this.squareRender(r,i));
      }
      rowVertical.push(this.verticalRender(r,i));
      structure.push(<div className="noMargin" key={'row-horizontal-' + r}>{rowHorizontal}</div>,<div className="noMargin" key={'row-vertical-' + r}>{rowVertical}</div>);
    }
    rowHorizontal = [];
    for (let i = 0; i < this.state.side; i++) {
      rowHorizontal.push(this.horizontalRender(r,i));
    }
    structure.push(<div className="noMargin" key={'row-horizontal-' + r}>{rowHorizontal}</div>);

    return (
      <div>
        <button className="new" onClick={() => this.go()}>Nuovo</button>
        <button className="solution" onClick={() => this.show()}>Soluzione</button>
        <div className="structure">{structure}</div>
      </div>
    );

  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

