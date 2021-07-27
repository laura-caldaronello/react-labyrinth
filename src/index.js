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

//condizioni
function upBlock(i,t,path,tops,directions,randoms,counter,side) {
  //fai parte del bordo superiore
  if (searchInArrayOfArrays(tops,[t + 1,i + 1])) {
    //sei un estremo del percorso
    if (whereInArrayOfArrays(path,[t + 1,i + 1]) === 0 || whereInArrayOfArrays(path,[t + 1,i + 1]) === (path.length - 1)) {
      return 0;
    }
    //non sei un estremo del percorso
    else {
      return 1;
    }
  }
  //non fai parte del bordo superiore
  else {
    //fai parte del percorso
    if (searchInArrayOfArrays(path,[t + 1,i + 1])) {
      //la direzione di marcia `e top o la direzione del precedente `e down
      if (directions[whereInArrayOfArrays(path,[t + 1,i + 1])] === 'up' || directions[whereInArrayOfArrays(path,[t + 1,i + 1]) - 1] === 'down') {
        return 0;
      }
      //altro
      else {
        return randoms[counter];
      }
    }
    //non fai parte del percorso
    else {
      //la parte sopra ha gi`a il bordo
      if (randoms[counter - side] === 1) {
        return 0;
      }
      //altro
      else {
        return randoms[counter];
      }
    }
  }
}

function rightBlock(i,t,path,rights,directions,randoms,counter,side) {
  if (searchInArrayOfArrays(rights,[t + 1,i + 1])) {
    if (whereInArrayOfArrays(path,[t + 1,i + 1]) === 0 || whereInArrayOfArrays(path,[t + 1,i + 1]) === (path.length - 1)) {
      return 0;
    }
    else {
      return 1;
    }
  }
  else {
    if (searchInArrayOfArrays(path,[t + 1,i + 1])) {
      if (directions[whereInArrayOfArrays(path,[t + 1,i + 1])] === 'right' || directions[whereInArrayOfArrays(path,[t + 1,i + 1]) - 1] === 'left') {
        return 0;
      }
      else {
        return randoms[counter];
      }
    }
    else {
      if (randoms[counter + 1] === 1) {
        return 0;
      }
      else {
        return randoms[counter];
      }
    }
  }
}

function downBlock(i,t,path,downs,directions,randoms,counter,side) {
  if (searchInArrayOfArrays(downs,[t + 1,i + 1])) {
    if (whereInArrayOfArrays(path,[t + 1,i + 1]) === 0 || whereInArrayOfArrays(path,[t + 1,i + 1]) === (path.length - 1)) {
      return 0;
    }
    else {
      return 1;
    }
  }
  else {
    if (searchInArrayOfArrays(path,[t + 1,i + 1])) {
      if (directions[whereInArrayOfArrays(path,[t + 1,i + 1])] === 'down' || directions[whereInArrayOfArrays(path,[t + 1,i + 1]) - 1] === 'up') {
        return 0;
      }
      else {
        return randoms[counter];
      }
    }
    else {
      if (randoms[counter + side] === 1) {
        return 0;
      }
      else {
        return randoms[counter];
      }
    }
  }
}

function leftBlock(i,t,path,lefts,directions,randoms,counter,side) {
  if (searchInArrayOfArrays(lefts,[t + 1,i + 1])) {
    if (whereInArrayOfArrays(path,[t + 1,i + 1]) === 0 || whereInArrayOfArrays(path,[t + 1,i + 1]) === (path.length - 1)) {
      return 0;
    }
    else {
      return 1;
    }
  }
  else {
    if (searchInArrayOfArrays(path,[t + 1,i + 1])) {
      if (directions[whereInArrayOfArrays(path,[t + 1,i + 1])] === 'left' || directions[whereInArrayOfArrays(path,[t + 1,i + 1]) - 1] === 'right') {
        return 0;
      }
      else {
        return randoms[counter];
      }
    }
    else {
      if (randoms[counter - 1] === 1) {
        return 0;
      }
      else {
        return randoms[counter];
      }
    }
  }
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
      side: 20,
    };
  }

  show() {
    this.setState({
      solution: true,
    });
  }

  go(border,tops,rights,bottoms,lefts) {
    var start = border[Math.floor(Math.random() * border.length)];
    var first = 0;
    first++;

    //creare il path da capo
    var level3 = 0;
    do {
      level3++;
      var myPath = [];
      var myDirections= [];
      myPath.push(start);
      //ciclo finch`e non riempio il path
      var level2 = 0;
      do {
        level2++
        var last = myPath[myPath.length - 1];
        var current = [last[0],last[1]];
        //ciclo finch`e la casella non `e non passata e finch`e non formo una figura chiusa
        var level1 = 0;
        do {
          level1++;
          var direction;
          if (first === 0) {
            if (searchInArrayOfArrays(tops,start)) {
              direction = 'down';
            }
            else if (searchInArrayOfArrays(rights,start)) {
              direction = 'left';
            }
            else if (searchInArrayOfArrays(bottoms,start)) {
              direction = 'up';
            }
            else if (searchInArrayOfArrays(lefts,start)) {
              direction = 'right';
            }
            first++;
          }
          else {
            direction = ['up','right','down','left'][getRandomInt(4) + 1];
          }
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
          if (level1 > 4) {
            break;
          }
        } while(searchInArrayOfArrays(myPath,currentTry));
        myPath.push(currentTry);
        myDirections.push(direction);
        if (level2 > 100) {
          break;
        }
      } while (!searchInArrayOfArrays(border,currentTry));
      console.log(myPath.length);
      console.log(myDirections);
      if (level3 > 100) {
        break;
      }
    } while (myPath.length < 10)

    var myRandoms = [];
    for (let s = 0; s < (this.state.side * this.state.side * 4); s++) {
      myRandoms.push(getRandomInt(2));
    }

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

    if (this.state.randoms !== []) {
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
            up={upBlock(i,t,this.state.path,tops,this.state.directions,this.state.randoms,counter,this.state.side)}
            right={rightBlock(i,t,this.state.path,rights,this.state.directions,this.state.randoms,counter,this.state.side)}
            down={downBlock(i,t,this.state.path,bottoms,this.state.directions,this.state.randoms,counter,this.state.side)}
            left={leftBlock(i,t,this.state.path,lefts,this.state.directions,this.state.randoms,counter,this.state.side)}
            direction={(searchInArrayOfArrays(this.state.path,[t + 1,i + 1]))? this.state.directions[whereInArrayOfArrays(this.state.path,[t + 1,i + 1])] : 0}
            />);
            counter = counter + 4;
        }
        structure.push(<div className="row" key={'row-' + (t + 1)}>{row}</div>)
      }
    }

    return (
      <div>
        <button className="new" onClick={() => this.go(border,tops,rights,bottoms,lefts)}>Nuovo</button>
        <button className="solution" onClick={() => this.show()}>Soluzione</button>
        <div className="structure">{structure}</div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

