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

  // Simplest recursion - draw concentric circles
  const drawCircles = (x, y, radius, context) => {
    if (radius < 0.25) return // stopping condition
    context.beginPath()
    //context.moveTo(x+radius, y) // to move to the right start
    context.arc(x, y, radius, 0, 2*Math.PI, false)
    context.fillStyle = 'white'
    context.strokeStyle = 'white'
    context.lineWidth = 2
    //context.fill()
    context.stroke()
    // call the function again with a smaller radius 
    drawCircles(x, y, radius-0.5, context)
  }

  // Just draw a pentagon
  function pentagon(x, y, radius, rotation, context){
    context.beginPath()
    for(var i = 0; i < 5; i ++){
        const ang = (i / 5) * Math.PI * 2 + rotation;
        context.lineTo(
            Math.cos(ang) * radius + x,
            Math.sin(ang) * radius + y
        );
     }
     context.closePath();
     context.fillStyle = 'white'
     context.strokeStyle = 'white'
     //context.fill();
     context.stroke();
}


  // Draw recursive pantagons with randomness
  const drawPentagramsRecursive = (rotation, x, y, width, height, radius, lineWidth, depth, context) => {
    if (depth > 9) return 

    //context.strokeStyle = `hsl(${240+depth*5}, 50%, 50%)` //'white'
    context.strokeStyle = `hsl(${280+depth*5}, 50%, 50%)`
    context.fillStyle = `hsl(${220+depth*5}, 50%, 50%)`
    context.lineWidth = lineWidth

    x = x + Random.noise3D(x, y, depth, 0.5, 1)
    y = y + Random.noise3D(x, y, depth, 0.5, 1)
    rotation = rotation + Random.noise3D(x, y, depth, 0.75, 1)

    const drawPentagram = (x, y) => {
      for(var i = 0; i < 5; i ++){
        const ang = (i / 5) * Math.PI * 2 + rotation;
        context.lineTo(
            Math.cos(ang) * radius + x,
            Math.sin(ang) * radius + y
        );
     }
    }

     context.beginPath()
     drawPentagram(x + width, y)
     context.closePath();
     context.globalAlpha = 0.8
     if (Math.random() > 0.9) context.fill()
     context.stroke();

     context.beginPath()
     drawPentagram(x + width, y + height)
     context.closePath();
     if (Math.random() > 0.7) context.fill()
     context.stroke();

     context.beginPath()
     drawPentagram(x, y + height)
     context.closePath();
     if (Math.random() > 0.9) context.fill()
     context.stroke();

     context.beginPath()
     drawPentagram(x, y)
     context.closePath();
     if (Math.random() > 0.8) context.fill()
     context.stroke();

     if (Random.range(0, 1) < 0.95) {
      drawPentagramsRecursive(rotation, x, y, width/2, height/2, radius/1.5, lineWidth/2, depth+1, context)
    }
    if (Random.range(0, 1) < 0.8) {
      drawPentagramsRecursive(rotation, x+width/2, y, width/2, height/2, radius/2, lineWidth/2, depth+1, context)
    }
    if (Random.range(0, 1) < 0.95) {
      drawPentagramsRecursive(rotation, x, y+height/2, width/2, height/2, radius/2, lineWidth/2, depth+1, context)
    }
    if (Random.range(0, 1) < 0.7) {
      drawPentagramsRecursive(rotation, x+width/2, y+height/2, width/2, height/2, radius/2, lineWidth/2, depth+1, context)
    }

  }

  // Draw recursive circles with randomness
  const drawCirclesRecursive = (x, y, width, height, radius, lineWidth, depth, context) => {
    if (depth > 9) return 

    x = x + Random.noise3D(x, y, depth, 0.75, 1)
    y = y + Random.noise3D(x, y, depth, 0.5, 2)

    context.fillStyle = 'white'
    context.strokeStyle = '#f5f3f4'
    context.lineWidth = lineWidth

    context.beginPath()
    context.arc(x + width, y, radius, Random.value(), 2*Math.PI*Random.value(), false)
    context.stroke()

    context.beginPath()
    context.arc(x + width, y + height, radius, Random.value(), 2*Math.PI*Random.value(), false)
    context.stroke()

    context.beginPath()
    context.arc(x, y + height, radius, Random.value(), 2*Math.PI*Random.value(), false)
    context.stroke()

    context.beginPath()
    context.arc(x, y, radius, Random.value(), 2*Math.PI*Random.value(), false)
    context.stroke()

    if (Random.range(0, 1) < 0.95) {
      drawCirclesRecursive(x, y, width/2, height/2, radius/2, lineWidth/2, depth+1, context)
    }
    if (Random.range(0, 1) < 0.8) {
      drawCirclesRecursive(x+width/2, y, width/2, height/2, radius/2, lineWidth/2, depth+1, context)
    }
    if (Random.range(0, 1) < 0.95) {
      drawCirclesRecursive(x, y+height/2, width/2, height/2, radius/3, lineWidth/2, depth+1, context)
    }
    if (Random.range(0, 1) < 0.9) {
      drawCirclesRecursive(x+width/2, y+height/2, width/2, height/2, radius/2, lineWidth/2, depth+1, context)
    }
    
  }

  return ({ context, width, height }) => {
    context.fillStyle = '#8895b3' // '#8895b3' '#f0e6ef' '#1a1423' '#eca400' '#46414b' '#b388eb' '#8093f1';
    context.fillRect(0, 0, width, height);

    //drawCircles(width/2, height/2, 2, context)
    const startRadius = 10
    //drawCirclesRecursive(0, 0, width, height, startRadius, 0.3, 1, context)

    const rotation = -Math.PI
    drawPentagramsRecursive(rotation, 5, 5, width, height, startRadius, 0.2, 1, context)

  };
};

canvasSketch(sketch, settings);
