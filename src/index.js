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
      <div 
        className="vertical"
        //style={
          
        //}
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

  show() {
    this.setState({
      solution: !this.state.solution,
    });
  }

  go() {

  }

  render() {

    var rowHorizontal = [];
    for (let i = 0; i < this.state.side; i++) {
      rowHorizontal.push(<Horizontal key={'horizontal-' + i}/>);
    }
    var rowVertical = [];
    for (let i = 0; i < this.state.side; i++) {
      rowVertical.push(<Vertical key={'vertical-' + i}/>);
    }

    return (
      <div>
        <button className="new" onClick={() => this.go()}>Nuovo</button>
        <button className="solution" onClick={() => this.show()}>Soluzione</button>
        <div>{rowHorizontal}</div>
        <div>{rowVertical}</div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

