//CHECKERBOARD

let grain = 5;
  
function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() { 
    background(0);
    
    //DRAW CHECKERBOARD
    for (var x = grain; x <= width; x += grain*2) {
      for (var y = grain; y <= height; y += grain*2) {
        rect(x, y, grain, grain);
      }
    }
    for (var x = 0; x <= width; x += grain*2) {
      for (var y = 0; y <= height; y += grain*2) {
        rect(x, y, grain, grain);
      }
    }
  }
  