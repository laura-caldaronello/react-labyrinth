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
        array.splice(i + 1,t);
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
    for (let i = 1; i < this.state.side - 1; i++) {
      tops.push([0,i]);
      rights.push([i,this.state.side - 1]);
      bottoms.push([this.state.side - 1,i]);
      lefts.push([i,0]);
    }
    
    //start
    var border = tops.concat(rights).concat(bottoms).concat(lefts);
    var start = border[getRandomInt(border.length)];
    var myPath = [];
    myPath.push(start);

    var direction;
    if (searchInArrayOfArrays(tops,start)) {
      direction = 'bottom';
      myPath.push([start[0] + 1,start[1]]);
    }
    else if (searchInArrayOfArrays(rights,start)) {
      direction = 'left';
      myPath.push([start[0],start[1] - 1]);
    }
    else if (searchInArrayOfArrays(bottoms,start)) {
      direction = 'top';
      myPath.push([start[0] - 1,start[1]]);
    }
    else if (searchInArrayOfArrays(lefts,start)) {
      direction = 'right';
      myPath.push([start[0],start[1] + 1]);
    }
    var myDirections = [];
    myDirections.push(direction);

    //prosecuzione
    var current;
    var currentTry;
    do {
      do {
        current = myPath[myPath.length - 1];
        do {
          currentTry = [current[0],current[1]];
          direction = ['top','right','bottom','left'][getRandomInt(4)];
          if (direction === 'top') {
            currentTry[0]--;
          }
          else if (direction === 'right') {
            currentTry[1]++;
          }
          else if (direction === 'bottom') {
            currentTry[0]++;
          }
          else if (direction === 'left') {
            currentTry[1]--;
          }
        } while (
            myDirections[myDirections.length - 1] === direction + 2 || myDirections[myDirections.length - 1] === direction - 2 //non posso tornare indietro alla casella precedente
          )
        myDirections.push(direction);
        myPath.push(currentTry);
      } while (!searchInArrayOfArrays(border,myPath[myPath.length - 1])) //finch`e non tocco il bordo
    } while (myPath.length < 10) //non troppo corto

    for (let i = 0; i < myPath.length; i++) {
      console.log(myPath[i]);
    }

    console.log('____________________________________________');

    //while (areThereDuplicates(myPath)) {
    //  myPath = deleteFirstCircle(myPath);
    //}

    for (let i = 0; i < myPath.length; i++) {
      console.log(myPath[i]);
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

