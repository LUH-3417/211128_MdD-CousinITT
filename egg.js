function setup() { 
    createCanvas(500, 500);
  } 
  
  function draw() { 
    background(0);
  
    var r = map(mouseX, 0, width, 0, 255);
    var g = map(mouseX, 0, width, 0, 255);
    var b = map(mouseY, 0, height, 0, 200);
    
    /*fill(r, g, b);
    ellipse(mouseX, 200, r, b);
  */
  
    
    function egg (x, y, diam) {
      //Eggwhite
      noStroke();
      fill(255);
      ellipse(mouseX, 200, r, g);
      /*beginShape();
      vertex(0, -100);
      bezierVertex(25, -100, 40, -65, 40, -40);
      bezierVertex(40, -15, 25, 0, 0, 0);
      bezierVertex(-25, 0, -40, -15, -40, -40);
      bezierVertex(-40, -65, -25, -100, 0, -100);
      endShape();*/
      
      //Eggyolk
      noStroke();
      fill(219,213,1);
      ellipse(mouseX, 200, r/2, g/2);
    }
      
  
    if (mouseIsPressed) {
      ellipse(mouseX, 200, r/2, g/2);
      egg(mouseX,200,r/2,g/2);
    
      
    }else{
      fill(r, g, b);
      ellipse(mouseX, 200, r, b);
    }
  
  }