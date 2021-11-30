// Circles on a grid - basic example 
// Generate a grid of points with u-v cords before drawing 
// Random radius and randomly drop some of the points on the grid
// Or 1D or 2D Perlin-like noise - experiment with the values and dropping of points 
// as well as the max size of the radius

import canvasSketch from 'canvas-sketch'
import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'

const settings = {
  dimensions: [ 2048, 2048 ]
};

// Based on how many points we want i.e. n, create n x n grid
// where the numbers inside are between 0 and 1
const createGrid = (count) => {
  const points = []
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      // get coords between 0 and 1 
      const u = x/(count - 1)
      const v = y/(count - 1)
      points.push({
        fill: 'deeppink',
        position: [ u, v ],
        // experiment with radius which is purely random or 1D or 2D noise 
        // change the values for the frequency and amplitude 
        //radius: Math.abs(0.01 + random.gaussian() * 0.01),
        //radius: Math.abs(random.noise1D(x, 1, 1)),
        radius: Math.abs(random.noise2D(x, y, 0.1, 0.5))
      })
    }
  }
  return points
}

// remove some of the points at random
// experiment with the random value to remove together with noise2D 
const points = createGrid(100).filter(() => random.value() >= 0.1)
const margin = 100


const sketch = () => {
  return ({ context, width, height }) => {

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height)

    points.forEach(data => {
      const { fill, position, radius } = data
      const [ u, v ] = position

      // convert u-v coords to x-y coords 
      // i.e. 0-1 goes to 0-width for x and 0-1 goes to 0-height for y
      // also include the margin
      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height-margin, v)

      // draw circles 
      context.beginPath()
      context.arc(x, y, radius*10, 0, 2*Math.PI, false)
      context.fillStyle = fill
      context.strokeStyle = 'cyan'
      context.fill()
      //context.stroke()

    })

  }
}

canvasSketch(sketch, settings);
