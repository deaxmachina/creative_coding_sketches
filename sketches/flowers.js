const canvasSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm'
};

const sketch = () => {

  const drawCircle = (
    centerX, centerY, radius, context, fill, amp, freq, fillBool
    ) => {
    context.beginPath()
    let step = 2 * Math.PI / (40*radius)
    context.fillStyle = fill;
    context.strokeStyle = fill
  
    for (let angle = 0; angle <= 2 * Math.PI; angle = angle + step) { 
      let x = Math.cos(angle) * radius + centerX
      let y = Math.sin(angle) * radius + centerX
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

  const pink = '#ea9ab2' //'#b45575'
  const yellow = '#f2af29'
  const lightBlue = '#6e7786'
  const colour = pink
  const accentColour = lightBlue
  const backgroundColour = "#262a32" // '#262a32'

  return ({ context, width, height }) => {
    context.fillStyle = backgroundColour;
    context.fillRect(0, 0, width, height);
    drawCircle(width*0.7, height*0.1, 9, context, colour, 0.5, 1, true)
    drawCircle(width*0.7, height*0.1, 5, context, accentColour, 3, 5, true)

    // drawCircle(width*0.8, height*0.9, 15, context, accentColour, 1.5, 1, true)
    // drawCircle(width*0.8, height*0.9, 8, context, colour, 3, 3, true)

    drawCircle(width*0.2, height*0.4, 6, context, accentColour, 1, 1, true)
    drawCircle(width*0.2, height*0.4, 4, context, colour, 1, 1, true)

    // drawCircle(width*0.5, height*0.5, 10, context, accentColour, 1.5, 1, true)
    // drawCircle(width*0.5, height*0.5, 6, context, colour, 3, 3, true)

    


    // drawCircle(width*0.7, height*0.7, 6, context)
  };
};

canvasSketch(sketch, settings);
