// Illusion of life
// Jamie Shilvock
// 29/01/23

var easycam;
var speed = 2000;
var seed = 0;
var c;
var button;

function setup() { 
  c = createCanvas(windowWidth, windowHeight, WEBGL);

  // Define initial state
  var state = {
    distance : 4000,
  };
  easycam = new Dw.EasyCam(this._renderer, state);
  
  // Slower transitions look nicer in the ortho mode
  easycam.setDefaultInterpolationTime(2000); //slower transition

  // Start with an animated rotation with 2.5 second transition time
  easycam.setRotation(Dw.Rotation.create({angles_xyz:[PI/2, PI/2, PI/2]}), 2500);
  easycam.setDistance(1000, 2500);

  addGUI();
} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position(c.width/2, c.height-200);
}

function draw(){
  
  // Ortho projection from easycam
  var cam_dist = easycam.getDistance();
  var oscale = cam_dist * 0.001;
  var ox = width  / 2 * oscale;
  var oy = height / 2 * oscale;
  ortho(-ox, +ox, -oy, +oy, -10000, 10000);
  easycam.setPanScale(0.004 / sqrt(cam_dist));
  
  // Mouseloc variables for light
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  
  // BG
  background(0);
  noStroke();

  // Lights
  ambientLight(100);
  pointLight(255, 255, 255, locX, locY, 0);
  
  // Boxes forloop
  randomSeed(seed);
  for(var i = 0; i < 2000; i++){

    var distance = 500;
    var cubeX = random(-distance, distance);
    var cubeY = random(-distance, distance);
    var cubeZ = random(-distance, distance);

    var r = ((cubeX / distance) * 0.5 + 0.5) * Math.abs(sin(millis() / speed)*255);
    var g = ((cubeY / distance) * 0.5 + 0.5) * Math.abs(cos(millis() / speed)*255);
    var b = ((cubeZ / distance) * 0.5 + 0.5) * Math.abs(tan(millis() / speed)*255);
    
    var randomSize = random(1, 100);
    
    // Push and Pop to set cube location & material
    push();
    translate(cubeX, cubeY, cubeZ);
    ambientMaterial(r, g, b);

    // Draw box
    // Theres a bug when using tan that it tries to use tan as a colour, but I like how it looks so keeping it as is
    box((Math.abs(sin(millis() / speed)) * randomSize), (Math.abs(cos(millis() / speed)) * randomSize), (Math.abs(tan(millis() / speed)) * randomSize));

    pop();
  }
}

function keyPressed() {
  if (keyCode === 83) {
    saveCanvas(c, 'myCanvas', 'jpg');
  }
}

function addGUI() {
  // add a button
  button = createButton('Randomise Seed');
  button.position(c.width/2, c.height-200);
  button.addClass('button');
  button.mousePressed(buttonClicked);
}

function buttonClicked() {
    seed = random(0, 512);
    console.log('here');
}