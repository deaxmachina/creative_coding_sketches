import canvasSketch from 'canvas-sketch'
import { lerp } from 'canvas-sketch-util/math'
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'

// Concentric circles made of circles, where radius of small cirlces 
// is either noise based on x and y coordinates or the angle 
// and the colours are from the nice colour palettes library 
// play with radius, noise type, opacity of cirlces, number of big cirlces

const settings = {
  dimensions: [ 2048, 2048 ]
};

// Create concentric circles 
const palette = random.pick(palettes)
const createCircle = (radius, step, width, height, context) => {
  const centerX = width/2
  const centerY = height/2
  const circRad = 10 // each small circle making up the large one 
  for (let angle = 0; angle <= 2*Math.PI; angle+=step) {
    const x = radius * Math.cos(angle) + centerX
    const y = radius * Math.sin(angle) + centerY
    context.beginPath()
    context.arc(
      x, y, 
      Math.abs(random.noise2D(x, y, 0.2, 1))*50, // to vary in x-y space
      //Math.abs(random.noise1D(angle, 0.1, 0.5))*80, // to vary just by angle
      0, 2*Math.PI, false
    )
    context.fillStyle = random.pick(palette)
    context.globalAlpha = 0.6
    context.fill()
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // experiment with radius to see whole shape or go out of screen
    for (let radius=100; radius<=800; radius+=50) {
      createCircle(radius, 20/radius, width, height, context)
    }

  };
};

canvasSketch(sketch, settings);
