function setup() {
    createCanvas(500, 500);
  }
  
  function draw() {
    background(0);
    
    let grain = 5;
  
    
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
  