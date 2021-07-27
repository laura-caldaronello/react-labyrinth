import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <div
        className="square"
        style={{
          borderTop: this.props.top + 'px solid black',
          borderRight: this.props.right + 'px solid black',
          borderBottom: this.props.bottom + 'px solid black',
          borderLeft: this.props.left + 'px solid black',
          backgroundColor: this.props.passed? 'blue' : 'lightblue',
        }}
      >
        <i class={'fas fa-arrow-' + this.props.direction}>{this.props.direction}</i>
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: [],
      directions: [],
    };
  }

  go(border) {
    var start = border[Math.floor(Math.random() * border.length)];

    var level1 = 0;
    var level2 = 0;
    var level3 = 0;

    do {
      level3++;
      if (level3 > 100) {
        break;
      }
      var myPath = [];
      var myDirections= [];
      myPath.push(start);
      do {
        level2++;
        if (level2 > 100) {
          break;
        }
        var last = myPath[myPath.length - 1];
        var current = [last[0],last[1]];
        do {
          level1++;
          if (level1 > 100) {
            break;
          }
          var direction = getRandomInt(4) + 1;
          var currentTry = [current[0],current[1]];
          switch (direction) {
            case 1:
              currentTry[0]--;
              break;
            case 2:
              currentTry[1]++;
              break;
            case 3:
              currentTry[0]++;
              break;
            case 4:
              currentTry[1]--;
              break;
            default:
              //
          }
        } while(!(
          currentTry[0] >= 1 &&
          currentTry[0] <= 10 &&
          currentTry[1] >= 1 &&
          currentTry[1] <= 10
        ) || searchInArrayOfArrays(myPath,currentTry));
        myPath.push(currentTry);
        console.log(direction);
        myDirections.push(direction);
      } while (!searchInArrayOfArrays(border,currentTry) && myPath.length < 50);
    } while (myPath.length < 10)

    this.setState({
      path: myPath,
      directions: myDirections,
    });
  }

  render() {
    const side = 10;
    
    //base
    var structure = [];
    var counter = 0;
    for (let t = 0; t < side; t++) {
      var row = [];
      for (let i = 0; i < side; i++) {
        if (searchInArrayOfArrays(this.state.path,[i + 1,t + 1])) {
          counter++;
        };
        row.push(<Square
          key={'square-' + (i + 1) + '-' + (t + 1)}
          passed={searchInArrayOfArrays(this.state.path,[i + 1,t + 1])? true : false}
          top={1}
          right={1}
          bottom={1}
          left={1}
          direction={(searchInArrayOfArrays(this.state.path,[i + 1,t + 1]))? this.state.directions[counter] : 0}
        />);
      }
      structure.push(<div className="row" key={'row-' + (t + 1)}>{row}</div>)
    }

    //percorso
    var tops = [];
    var rights = [];
    var bottoms = [];
    var lefts = [];
    for (var i = 0; i < side; i++) {
      tops.push([1,i + 1]);
      rights.push([i + 1,side]);
      bottoms.push([side,i + 1]);
      lefts.push([i + 1,1]);
    }
    var border = tops.concat(rights).concat(bottoms).concat(lefts);

    return (
      <div>
        <button className="new" onClick={() => this.go(border)}>Nuovo</button>
        <div className="structure">{structure}</div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

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