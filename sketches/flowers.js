const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');
const { lerp } = require('canvas-sketch-util/math')

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm'
};

const margin = 2
const pink ='#ea9ab2' // '#ea9ab2' //'#b45575'
const yellow = '#d8b982' // '#f2af29' //'#d8b982'
const lightBlue =  '#8594aa' //'#6e7786'
const colour = pink
const accentColour = lightBlue
const backgroundColour = '#262a32' //"#262f3d" // '#262a32'


const sketch = () => {

  const getPoints = () => {
    const points = []
    const numPoints = 30 
    for (let x = 0; x < numPoints; x++) {
      for (let y = 0; y < numPoints; y++) {
        const u = x / (numPoints - 1)
        const v = y / (numPoints - 1)
        points.push([u, v])
      }
    }
    return points
  }

  const drawCircle = (
    centerX, centerY, radius, context, fill, amp, freq, fillBool
    ) => {
    context.beginPath()
    let step = 2 * Math.PI / (40*radius)
    context.fillStyle = fill;
    context.strokeStyle = fill
  
    for (let angle = 0; angle <= 2 * Math.PI; angle = angle + step) { 
      let x = Math.cos(angle) * radius + centerX
      let y = Math.sin(angle) * radius + centerY
      let noiseX = x + Random.noise1D(angle, amp, freq)
      let noiseY = y + Random.noise1D(angle, amp, freq)
      
      let noiseZ = Math.abs(Random.noise1D(angle, 1, 1))
        context.moveTo(centerX, centerY)
        //context.lineTo(noiseX, noiseY)
        context.arc(noiseX, noiseY, 0.07*radius*noiseZ, 0, 2 * Math.PI, false) 
      
      context.lineWidth = 0.02
      context.stroke()
      if (fillBool) context.fill()
    }
  }


  return ({ context, width, height }) => {
    context.fillStyle = backgroundColour;
    context.fillRect(0, 0, width, height);

    // draw a background shapes 
    // We set our grid cell size, for the X and Y axis
    let stepX = 0.2
    let stepY = 0.2
    context.lineWidth = 0.01
    context.strokeStyle = '#8594aa'
    for (let x = 0; x <= width; x = x + stepX) {
      for (let y = 0; y <= height; y = y + stepY) {
        // We create our 2-dimensional noise. The function takes 4 parameters instead of three: the first two are the coordinates, 
        // and the last two are frequency and amplitude, just like in the noise1D case.
        
        let heightPercent = 1 - y / height
        let noiseXY = Random.noise2D(x, y, 0.6 * heightPercent, 0.7 * heightPercent)

        context.beginPath();
        context.moveTo(x, y)
        //context.arc(x + noiseXY, y + noiseXY, 0.1, 0, 2 * Math.PI, false)
        context.lineTo(x + noiseXY, y + noiseXY)
        context.stroke()
      }
    }




    // drawCircle(width*0.7, height*0.1, 9, context, colour, 0.5, 1, true)
    // drawCircle(width*0.7, height*0.1, 4, context, accentColour, 3, 5, true)

    // // drawCircle(width*0.75, height*0.95, 10, context, accentColour, 2, 1, true)
    // // drawCircle(width*0.75, height*0.95, 7, context, colour, 3, 3, true)

    // drawCircle(width*0.15, height*0.47, 6, context, accentColour, 1, 1, true)
    // drawCircle(width*0.15, height*0.47, 4, context, colour, 1, 1, true)

    drawCircle(width*0.5, height*0.5, 9.5, context, accentColour, 1.5, 1, true)
    drawCircle(width*0.5, height*0.5, 6, context, colour, 3, 3, true)

    


    // drawCircle(width*0.7, height*0.7, 6, context)
  };
};

canvasSketch(sketch, settings);
