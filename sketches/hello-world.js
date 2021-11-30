const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  return ({ context, width, height }) => {

    // Fill the whole canvas with pink 
    context.fillStyle = 'pink'
    context.fillRect(0, 0, width, height)

    // Draw a white rectangle at the center 
    context.strokeStyle = 'white'
    context.lineWidth = 4
    context.strokeRect(width/4, height/4, width/2, height/2)
  }
}

canvasSketch(sketch, settings)
