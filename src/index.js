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

class Square extends React.Component {
  render() {
    return (
      <div
        className="square"
        style={{
          borderTop: this.props.up + 'px solid black',
          borderRight: this.props.right + 'px solid black',
          borderBottom: this.props.down + 'px solid black',
          borderLeft: this.props.left + 'px solid black',
          backgroundColor: this.props.passed? 'blue' : 'lightblue',
        }}
      >
        {this.props.show? <i className={'fas fa-arrow-' + this.props.direction}></i> : ''}
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
      solution: false,
      randoms: [],
      side: 10,
    };
  }

  show() {
    this.setState({
      solution: true,
    });
  }

  go(border) {
    var start = border[Math.floor(Math.random() * border.length)];

    var level1 = 0;
    var level2 = 0;
    var level3 = 0;

    do {
      level3++;
      if (level1 > 100) {
        alert('Riprova!');
        break;
      }
      var myPath = [];
      var myDirections= [];
      myPath.push(start);
      do {
        level2++;
        if (level1 > 100) {
          break;
        }
        var last = myPath[myPath.length - 1];
        var current = [last[0],last[1]];
        do {
          level1++;
          if (level1 > 100) {
            break;
          }
          var direction = ['up','right','down','left'][getRandomInt(4) + 1];
          var currentTry = [current[0],current[1]];
          switch (direction) {
            case 'up':
              currentTry[0]--;
              break;
            case 'right':
              currentTry[1]++;
              break;
            case 'down':
              currentTry[0]++;
              break;
            case 'left':
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
        myDirections.push(direction);
      } while (!searchInArrayOfArrays(border,currentTry) && myPath.length < 50);
    } while (myPath.length < 10)

    console.log(myPath);
    console.log(myDirections);

    var myRandoms = [];
    for (let s = 0; s < (this.state.side * this.state.side * 4); s++) {
      myRandoms.push(getRandomInt(2));
    }
    console.log(myRandoms);

    this.setState({
      path: myPath,
      directions: myDirections,
      solution: false,
      randoms: myRandoms,
    });

  }

  
  render() {

    //percorso
    var tops = [];
    var rights = [];
    var bottoms = [];
    var lefts = [];
    for (var i = 0; i < this.state.side; i++) {
      tops.push([1,i + 1]);
      rights.push([i + 1,this.state.side]);
      bottoms.push([this.state.side,i + 1]);
      lefts.push([i + 1,1]);
    }
    var border = tops.concat(rights).concat(bottoms).concat(lefts);    

    if (this.state.randoms != []) {
      //base
      var structure = [];
      var counter = 0;
      for (let t = 0; t < this.state.side; t++) {
        var row = [];
        for (let i = 0; i < this.state.side; i++) {
          row.push(<Square
            key={'square-' + (t + 1) + '-' + (i + 1)}
            passed={(searchInArrayOfArrays(this.state.path,[t + 1,i + 1]) && this.state.solution)? true : false}
            show={this.state.solution? true : false}
            up={(searchInArrayOfArrays(this.state.path,[t + 1,i + 1]) && this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1])] === 'up') || this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1]) - 1] === 'down'? 0 : this.state.randoms[counter]}
            right={(searchInArrayOfArrays(this.state.path,[t + 1,i + 1]) && this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1])] === 'right') || this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1]) - 1] === 'left'? 0 : this.state.randoms[counter + 1]}
            down={(searchInArrayOfArrays(this.state.path,[t + 1,i + 1]) && this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1])] === 'down') || this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1]) - 1] === 'up'? 0 : this.state.randoms[counter + 2]}
            left={(searchInArrayOfArrays(this.state.path,[t + 1,i + 1]) && this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1])] === 'left') || this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1]) - 1] === 'right'? 0 : this.state.randoms[counter + 3]}
            direction={(searchInArrayOfArrays(this.state.path,[t + 1,i + 1]))? this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1])] : 0}
            />);
            counter = counter + 4;
        }
        structure.push(<div className="row" key={'row-' + (t + 1)}>{row}</div>)
      }
    }

    return (
      <div>
        <button className="new" onClick={() => this.go(border)}>Nuovo</button>
        <button className="solution" onClick={() => this.show()}>Soluzione</button>
        <div className="structure">{structure}</div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

