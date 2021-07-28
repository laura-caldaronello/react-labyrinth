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
        style={{
          marginRight: this.props.marginRight + 'px',
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

  show() {
    this.setState({
      solution: !this.state.solution,
    });
  }

  go() {

  }

  render() {

    var structure = [];
    for (var r = 0; r < this.state.side; r++) {
      var rowHorizontal = [];
      for (let i = 0; i < this.state.side; i++) {
        rowHorizontal.push(<Horizontal key={'horizontal-' + r + '-' + i}/>);
      }
      var rowVertical = [];
      for (let i = 0; i < this.state.side; i++) {
        rowVertical.push(<Vertical 
          key={'vertical-' + r + '-' + i}
          marginRight={this.state.side * 2}
        />);
      }
      structure.push(<div className="noMargin">{rowHorizontal}</div>,<div className="noMargin">{rowVertical}</div>);
    }
    var rowHorizontal = [];
    for (let i = 0; i < this.state.side; i++) {
      rowHorizontal.push(<Horizontal key={'horizontal-' + r + '-' + i}/>);
    }
    structure.push(<div className="noMargin">{rowHorizontal}</div>);

    return (
      <div>
        <button className="new" onClick={() => this.go()}>Nuovo</button>
        <button className="solution" onClick={() => this.show()}>Soluzione</button>
        <div>{structure}</div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

