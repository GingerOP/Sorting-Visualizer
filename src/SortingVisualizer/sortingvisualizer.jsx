import React from "react";
import { getBubbleSortAnimations, getMergeSortAnimations } from '../SortingAlgorithm/sortingalgorithm.js';
import './SortingVisualiser.css';

// Default valuesgit
const ANIMATION_SPEED_MS = 5;
const MAX_BAR_HEIGHT = 500; // Maximum height of bars

let NUMBER_OF_ARRAY_BARS = 30; // Initial number of bars

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export class SortingVisulaizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      numberOfBars: NUMBER_OF_ARRAY_BARS, // Number of bars in the array
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5, 710));
    }
    this.setState({ array });
  }

  handleSliderChange = (event) => {
    NUMBER_OF_ARRAY_BARS = event.target.value;
    this.setState({ numberOfBars: NUMBER_OF_ARRAY_BARS }, this.resetArray);
  };

  Bubblesort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIdx, newHeight] = animations[i];
        setTimeout(() => {
          const scaledHeight = Math.min(newHeight, MAX_BAR_HEIGHT);
          arrayBars[barIdx].style.height = `${scaledHeight}px`;
          if (this.state.numberOfBars <= 30) {
            arrayBars[barIdx].innerText = `${newHeight}`;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  Mergesort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const scaledHeight = Math.min(newHeight, MAX_BAR_HEIGHT);
          arrayBars[barOneIdx].style.height = `${scaledHeight}px`;
          if (this.state.numberOfBars <= 30) {
            arrayBars[barOneIdx].innerText = `${newHeight}`;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array, numberOfBars } = this.state;

    // Calculate the width of each bar
    const BAR_WIDTH = Math.max(2, 1000 / numberOfBars); // Ensure width doesn't go below 2px

    return (
      <div className="array-container">
        <div className="array-bar-container">
          {array.map((value, idx) => {
            const barHeight = Math.min(value, MAX_BAR_HEIGHT);
            return (
              <div
                className="array-bar"
                key={idx}
                style={{
                  height: `${barHeight}px`,
                  width: `${BAR_WIDTH}px`,
                }}
              >
                {numberOfBars <= 55 && `${value}`} {/* Display the value inside the bar only if number of bars is <= 30 */}
              </div>
            );
          })}
        </div>
        <div className="controls">
          <button onClick={() => this.resetArray()}>Generate new array</button>
          <button onClick={() => this.Bubblesort()}>Bubble Sort</button>
          <button onClick={() => this.Mergesort()}>Merge Sort</button>
          <br />
          <label htmlFor="numBars">Number of Bars: {numberOfBars}</label>
          <input
            id="numBars"
            type="range"
            min="5"
            max="500"
            value={numberOfBars}
            onChange={this.handleSliderChange}
            className="slider"
          />
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
