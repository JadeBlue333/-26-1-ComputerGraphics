/*
Sogang Art&Technology 2026-1 Computer Graphics
20231035 M. Park
Teapot Launching showcase: modern afternoon tea
press spacebar to see different types of tea.
<afternoon waltz>
*/

let plates = [];
let songs = [];
let spinSpeed = 0.03; //spinSpeed is for plate default speed depending on the type of tea

let s; //song playing now
let amp; //amplitude
let vol; //variable to save current mp3 volume
let danceSpeed = 0; //danceSpeed is for whole scene depending on the volume of mp3
let yTarget = 0;
let yMove = 0; //increase and decrease amount of y for the teapot and plates

let teapot;
let font;

let teaRot = 0; //default teapot speed

let type = 0; //tea type indication

//class to draw many plates more easily
class Plate {
  constructor(x, y, z, f) {
    this.offset = createVector(x, y, z);
    //f is for food differentiation, only 0 or 1
    this.f = f;
    this.plateRot = 0;
  }

  display() {
    push();

    noStroke();
    fill(255);

    //let the plates spin around the teapot
    translate(0, 50 - yMove, 0);
    //rotating X-axis to make sure that the plate is heading the same direction w/ teapot
    rotateX(-PI / 7);

    //make the plate spin by first rotate the coordinate and then draw it -> Y value is fixed as same as the teapot.
    rotateY(this.plateRot);
    translate(this.offset.x, this.offset.y, this.offset.z);
    scale(2);
    //flat cylinder is for the plate shape.
    cylinder(30, 2);

    //have this here to connect food and plate location
    this.drawFood();

    pop();
    //make sure the coordinate is not confused with each other by using push() and pop()!

    //update rotation speed
    this.plateRot += spinSpeed + danceSpeed;
  }

  //food shape drawn. below is only for shapes, up to changes depending on preferences.
  drawFood() {
    //
    translate(0, -5, 0);
    scale(0.6);

    //Jasmine Green tea
    if (type == 0) {
      if (this.f == 0) {
        //cucumber sandwhich
        fill(222, 194, 160);
        box(60, 8, 30);
        translate(0, -8, 0);
        fill(111, 138, 90);
        box(60, 8, 30);
        translate(0, -8, 0);
        fill(222, 194, 160);
        box(60, 8, 30);
      }
      else if (this.f == 1) {
        //matcha chiffon cake
        translate(0, -2, 0);
        fill(92, 85, 38);
        box(50, 40, 15);
        translate(0, -25, 0);
        fill(255, 246, 235);
        box(50, 10, 15);
      }
    }
    //classic darzling
    else if (type == 1) {
      if (this.f == 0) {
        //egg sandwhich
        fill(222, 194, 160);
        box(60, 8, 30);
        translate(0, -8, 0);
        fill(245, 180, 88);
        box(60, 8, 30);
        translate(0, -8, 0);
        fill(222, 194, 160);
        box(60, 8, 30);
      } else if (this.f == 1) {
        //scone and butter
        translate(0, -8, 0);
        fill(219, 157, 94);
        sphere(23);
        translate(0, 10, 30);
        fill(245, 210, 105);
        box(30, 4, 10);
        translate(25, 0, -8);
        fill(71, 16, 16);
        cylinder(8, 2);
      }
    }
    //vanilla Rooibos
    else if (type == 2) {
      if (this.f == 0) {
        //tiramisu
        fill(66, 36, 17);
        box(60, 4, 30);
        translate(0, -9, 0);
        fill(242, 226, 203);
        box(60, 15, 30);
        translate(0, -9, 0);
        fill(97, 57, 0);
        box(60, 4, 30);
      } else if (this.f == 1) {
        //macaroons
        fill(255, 223, 179);
        cylinder(15, 4);
        translate(0, -5, 0);
        fill(255, 255, 255);
        cylinder(14, 4);
        translate(0, -4, 0);
        fill(255, 223, 179);
        cylinder(15, 4);
      }
    }
    //Hibiscus Berry
    else if (type == 3) {
      if (this.f == 0) {
        //white chocolate red velvet cake
        fill(158, 106, 60);
        box(60, 4, 30);
        translate(0, -10, 0);
        fill(156, 34, 34);
        box(60, 17, 30);
        translate(0, -10, 0);
        fill(247, 240, 237);
        box(60, 2, 30);
      } else if (this.f == 1) {
        //rose macaroons
        fill(232, 88, 88);
        cylinder(15, 4);
        translate(0, -5, 0);
        fill(255, 255, 255);
        cylinder(14, 4);
        translate(0, -4, 0);
        fill(232, 88, 88);
        cylinder(15, 4);
      }
    }
    //Blood Orange Black tea
    else if (type == 4) {
      if (this.f == 0) {
        //ganache cake
        fill(84, 42, 0);
        box(60, 4, 27);
        translate(0, -4, 0);
        fill(168, 106, 47);
        box(60, 4, 27);
        translate(0, -4, 0);
        fill(84, 42, 0);
        box(60, 4, 27);
        translate(0, -4, 0);
        fill(168, 106, 47);
        box(60, 4, 27);
        translate(0, -4, 0);
        fill(84, 42, 0);
        box(60, 4, 27);
        translate(0, -4, 0);
        fill(168, 106, 47);
        box(60, 4, 27);
        translate(0, -4, 0);
        fill(84, 42, 0);
        box(60, 4, 27);
      } else if (this.f == 1) {
        //chocolate truffles
        translate(15, -5, -10);
        fill(64, 36, 10);
        sphere(10);
        translate(-30, 0, 0);
        fill(168, 106, 47);
        sphere(10);
        translate(15, 0, 20);
        fill(230, 222, 216);
        sphere(10);
      }
    }
  }
}

function preload() {
  teapot = loadModel("asset/teapot.obj");
  font = loadFont("asset/SOGANG_UNIVERSITY.ttf");

  //load classic songs to array one by one
  songs[0] = loadSound("asset/vienneWaltz.mp3");
  songs[1] = loadSound("asset/foxTrot.mp3");
  songs[2] = loadSound("asset/waltz.mp3");
  songs[3] = loadSound("asset/polka.mp3");
  songs[4] = loadSound("asset/tango.mp3");
}

function setup() {
  createCanvas(650, 500, WEBGL);

  textFont(font);
  textSize(52);

  //save plates into array
  plates.push(new Plate(160, 0, 80, 0));
  plates.push(new Plate(-160, 0, -80, 1));

  //try to access the volume of the music using amplitude of p5.sound.js
  amp = new p5.Amplitude();
  s = songs[0];
  s.loop();
}

//enables to change the tea taste when spacebar is pressed
function keyPressed() {
  if (key === " ") {
    type++;
    //type is limited from 0 to 4
    type = type % 5;

    //change song w type
    if (s && s.isPlaying()) s.stop();
    s = songs[type];
    s.loop();
  }

  //set default plate spin speed depending on the type
  if (type == 0) spinSpeed = 0.025;
  else if (type == 1) spinSpeed = 0.015;
  else if (type == 2) spinSpeed = 0.01;
  else if (type == 3) spinSpeed = 0.03;
  else spinSpeed = 0.02;
}

function draw() {
  //get the volume, and make it decides the scene speed and dancing animation
  vol = amp.getLevel();
  danceSpeed = map(vol, 0, 0.3, 0, 0.15);
  yTarget = map(vol, 0, 0.3, 0, 600);
  yMove = lerp(yMove, yTarget, 0.1);
  
  //only for the text
  fill(255, 255, 255, 8);

  //decide the color of the teapot, background and light, plus light angle.
  if (type == 0) jasmineGreen();
  else if (type == 1) classicDarzling();
  else if (type == 2) vanillaRooibos();
  else if (type == 3) hibiscusBerry();
  else orangeBlack();
  
  //draw the teapot and the plates.
  teapotRender();
  for (let p of plates) p.display();
}

//try and look how the color and angle of the light is changing as type changes.

function jasmineGreen() {
  background(52, 56, 35);
  text("Jasmine\nGreen Tea", -330, -190);
  pointLight(255, 255, 255, 600, -700, 1000);
  fill(212, 232, 125);
}

function classicDarzling() {
  background(66, 42, 25);
  text("Classic\nDarzling", -330, -190);
  pointLight(255, 245, 224, 700, -600, 1000);
  fill(214, 164, 126);
}

function vanillaRooibos() {
  background(61, 55, 45);
  text("Vanilla\nRooibos", -330, -190);
  pointLight(255, 235, 196, 800, -500, 1000);
  fill(237, 202, 104);
}

function hibiscusBerry() {
  background(69, 39, 45);
  text("Hibiscus\nBerry", -330, -190);
  pointLight(255, 229, 176, 900, -300, 1000);
  fill(230, 115, 147);
}

function orangeBlack() {
  background(79, 52, 43);
  text("Blood Orange\nBlack Tea", -330, -190);
  pointLight(255, 219, 148, 1000, -100, 1000);
  fill(242, 124, 85);
}

//function to actually visualize the teapot onto canvas. teapotRender() was made because this same code is repeated through all of these tea types but always up to changes.
function teapotRender() {
  push();
  // transform the teapot
  translate(0, 50 + yMove, 0);
  rotateX(PI / 3);
  rotateZ(teaRot);
  scale(8.5);
  noStroke();
  model(teapot);
  pop();
  teaRot += (0.002 + danceSpeed);
}

//plates were initally planned to made by functions, then changed into class because I was not sure how many plates I want
/*
function plates() {
  push();
  noStroke();
  fill(255);
  translate(0, 50, 0);

  //rotating X-axis to make sure that the plate is heading the same direction w/ teapot
  rotateX(-PI/7);
  
  //make the plate spin by first rotate the coordinate and then draw it -> Y value is fixed as same as the teapot.
  rotateY(plateRot);
  translate(150, 0, 70); 

  scale(2);
  cylinder(30, 2);
  pop();

  plateRot += 0.01;
}
*/

//seeAxis() is for visualizing the x / y / z axis. used for debugging
/*
function seeAxis() {
  strokeWeight(2);

  stroke(255, 0, 0);
  line(0, 0, 0, 300, 0, 0);

  stroke(0, 255, 0);
  line(0, 0, 0, 0, 300, 0);

  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 300);
  
  noStroke();
}
*/
