// CLOCK

frameRate = 60
let fr = frameRate

let a = 0 // 'ANGLE' for COS & SIN

let mybg = {
  h: 50,
  s: 100, 
  l: 50
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSL, 360, 100, 100)
  blendMode (SUBTRACT)
  noStroke()
}

function draw() {
  translate(width/2, height/2)
  mybg.h = (mybg.h+0.1) % 360;
  background(color(mybg.h, mybg.s, mybg.l))
  fill(color(mybg.h-180, mybg.s, mybg.l))

  //ROTATING STAR
  let minDia = 20
  let maxDia = 250
  
  // Summits = s
  let s = frameCount/fr
  
    /*MILISECONDS
    push();
    fill(color(mybg.h-155, mybg.s, mybg.l+25))
    rotate(frameCount/(fr/fr));
    star(0, 0, minDia, maxDia*2, s%(fr^3)/(fr/fr)); 
    pop();
    */
  
    //SECONDS
    push();
    rotate(frameCount/fr);
    star(0, 0, minDia, maxDia, s%(fr^2)); 
    pop();
  
    //MINUTES
    push();
    fill(color(mybg.h, mybg.s-25, mybg.l-25))
    rotate(frameCount/(fr^2));
    star(0, 0, minDia, maxDia/2, s%(fr)/fr)
    pop();
  
    //HOURS
    push();
    fill(color(mybg.h, mybg.s-50, mybg.l-50))
    rotate(frameCount/fr^3);
    star(0, 0, minDia/2, maxDia/3, s%fr/(fr^2))
    pop();

  // STAR FUNCTION
  function star(x, y, radius1, radius2, s) {
   /* if (s<fr ) {
      s = s+1
    }else{
      s = s-1
    } */

    let angle = TWO_PI/s;
    let halfAngle = angle/2;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  // INCREASE 'ANGLE'
  const increment = TAU/360
  a += increment
}
