//This code should be played on p5.js

/*
Sogang Art&Technology 2026-1 Computer Graphics
20231035 M. Park
Satisfying Room Deco Game Prototype
Try placing different furnitures in your own small place

<Space for Relax>
drag mousewheel to rotate scene
mouseclick to locate furniture. can't overlap.
left/right arrow key to rotate furniture.

press finish to see spinning view.

BGM - Chocolate World (copyright by Oneul, https://youtu.be/_YdFyzU8ryA?si=eF9j1hyvfCMQq-Tf)
*/

/*
Color & Concept - miffy
//yellow
//fill(244, 223, 106);
//orange
//fill(214, 114, 69);
//brown
//fill(101, 56, 17);
//Green
//fill(67, 111, 53);
//Blue
//fill(54, 91, 143);
*/

let furnitures = []; //array to save furniture information and sequence
let gridPositions = [];
let occupiedGrid = [];

//classes are only for furniture shape

class S_Table {
  constructor(x, y, c) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(54, 91, 143)";
  }

  display() {
    push();
    noStroke();
    fill(this.c);
    translate(this.offset.x, this.offset.y, 30);
    rotateX(-PI/2);
    box(50, 10, 50);

    push();
    translate(20, 14, -20);
    box(10, 28, 10);
    pop();

    push();
    translate(-20, 14, 20);
    box(10, 28, 10);
    pop();

    push();
    translate(20, 14, 20);
    box(10, 28, 10);
    pop();

    push();
    translate(-20, 14, -20);
    box(10, 28, 10);
    pop();

    pop();
  }
}

class S_Chair {
  constructor(x, y, c, rot) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(214, 114, 69)";
    this.rot = rot;
  }

  display() {
    push();
    noStroke();
    fill(this.c);
    translate(this.offset.x, this.offset.y, 40);
    rotateZ(this.rot);
    translate(0, -10, 0);
    box(40, 10, 30);
    translate(0, 10, -20);
    rotateX(-PI/2);
    box(40, 10, 30);

    push();
    translate(15, 10, -10);
    box(10, 15, 10);
    pop();

    push();
    translate(-15, 10, 10);
    box(10, 15, 10);
    pop();

    push();
    translate(15, 10, 10);
    box(10, 15, 10);
    pop();

    push();
    translate(-15, 10, -10);
    box(10, 15, 10);
    pop();

    pop();
  }
}

class R_Table {
  constructor(x, y, c) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(244, 223, 106)";
  }

  display() {
    push();
    noStroke();
    fill(this.c);
    translate(this.offset.x, this.offset.y, 30);
    rotateX(-PI/2);
    cylinder(25, 10);

    push();
    translate(12, 15, -12);
    cylinder(5, 30);
    pop();

    push();
    translate(-12, 15, 12);
    cylinder(5, 30);
    pop();

    push();
    translate(12, 15, 12);
    cylinder(5, 30);
    pop();

    push();
    translate(-12, 15, -12);
    cylinder(5, 30);
    pop();

    pop();
  }
}

class R_Chair {
  constructor(x, y, c, rot) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(67, 111, 53)";
    this.rot = rot;
  }

  display() {
    push();
    noStroke();
    fill(this.c);
    translate(this.offset.x, this.offset.y, 40);
    rotateZ(this.rot);
    translate(0, -15, 0);
    cylinder(17, 7);
    translate(0, 15, -20);
    rotateX(-PI/2);
    cylinder(20, 7);

    push();
    translate(12, 10, -10);
    cylinder(4, 25, 10);
    pop();

    push();
    translate(-12, 10, 10);
    cylinder(4, 25);
    pop();

    push();
    translate(12, 10, 10);
    cylinder(4, 25);
    pop();

    push();
    translate(-12, 10, -10);
    cylinder(4, 25);
    pop();

    pop();
  }
}

class Wardrobe {
  constructor(x, y, c, rot) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(54, 91, 143)";
    this.rot = rot;
  }

  display() {
    push();
    noStroke();
    fill(250);
    translate(this.offset.x, this.offset.y - 5, 30);
    rotateZ(this.rot);
    box(40, 20, 60);

    push();
    translate(0, 6, 20);
    fill(this.c);
    box(35, 10, 15);
    translate(0, 5, 0);
    fill(250);
    sphere(3);
    pop();

    push();
    translate(0, 6, 2);
    fill(this.c);
    box(35, 10, 15);
    translate(0, 5, 0);
    fill(250);
    sphere(3);
    pop();

    push();
    translate(0, 6, -16);
    fill(this.c);
    box(35, 10, 15);
    translate(0, 5, 0);
    fill(250);
    sphere(3);
    pop();

    pop();
  }
}

class Frame {
  constructor(x, y, c) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(244, 223, 106)";
  }

  display() {
    push();
    noStroke();
    fill(255);
    translate(this.offset.x, this.offset.y - 25, 100);
    rotateX(-PI/2);
    box(25, 35, 1);
    fill(this.c);
    translate(0, -17.5, 2);
    box(25, 5, 4);
    translate(0, 35, 0);
    box(25, 5, 4);
    translate(-12.5, -17.5, 0);
    rotateZ(-PI/2);
    box(40, 5, 4);
    translate(0, 25, 0);
    box(40, 5, 4);
    pop();
  }
}

class Pot {
  constructor(x, y, c, rot) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(214, 114, 69)";
    this.rot = rot;
  }

  display() {
    push();
    noStroke();
    fill(101, 56, 17);
    translate(this.offset.x, this.offset.y, 15);
    rotateZ(this.rot);
    rotateX(-PI/2);
    cylinder(15, 30);

    push();
    rotateX(PI/2);
    translate(0, 0, 15);
    torus(15, 3);
    pop();

    translate(0, -25, 0);
    fill(67, 111, 53);
    cylinder(1.5, 20);

    push();
    translate(-5, -1, 0);
    rotateX(-PI/2);
    cylinder(4, 1.5);
    translate(10, 0, 0);
    cylinder(4, 1.5);
    pop();

    translate(0, -10, 0);
    fill(this.c);
    sphere(7);

    pop();
  }
}

class Teddy {
  constructor(x, y, c, rot) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(244, 223, 106)";
    this.rot = rot;
  }

  display() {
    push();
    noStroke();
    fill(this.c);
    translate(this.offset.x, this.offset.y, 10);
    rotateZ(this.rot);
    sphere(9.5);

    push();
    translate(-6, 6, 3);
    sphere(5);
    translate(12, 0, 0);
    sphere(5);
    translate(0, 0, -5);
    sphere(6);
    translate(-12, 0, 0);
    sphere(6);
    pop();

    translate(0, 0, 15);
    sphere(13);

    push();
    translate(-12, 0, 0);
    cylinder(7, 3);
    translate(24, 0, 0);
    cylinder(7, 3);
    pop();

    fill(30, 30, 30);
    translate(5.5, 10, 0);
    sphere(2);
    translate(-11, 0, 0);
    sphere(2);
    translate(5.5, 0.5, -4.5);
    sphere(2);

    pop();
  }
}

class Window {
  constructor(x, y, c) {
    this.offset = createVector(x, y);
    this.c = c || "rgb(101, 56, 17)";
  }

  display() {
    push();
    noStroke();
    translate(this.offset.x, this.offset.y - 25, 100);
    rotateX(-PI/2);
    fill(54, 91, 143);
    box(40, 40, 1);
    fill(this.c);
    translate(0, -20, 2);
    box(40, 5, 4);
    translate(0, 20, 0);
    box(40, 5, 4);
    translate(0, 20, 0);
    box(40, 5, 4);
    translate(-20, -20, 0);
    rotateZ(-PI/2);
    box(45, 5, 4);
    translate(0, 20, 0);
    box(45, 5, 4);
    translate(0, 20, 0);
    box(45, 5, 4);
    pop();
  }
}

//camRotY is for scene rotation
let camRotY = 0;

let cloud = 0; //cloud moving speed

let f1, f2, f3, f4, f5, f6, f7, f8, f9, f10;
let c1, c2, c3, c4, c5, c6, c7;
let clearB, finishB;

let buttonWidth = 130;
let buttonHeight = 60;
let buttonPosition = buttonWidth + 5;

let showGrid = false;
let selectedF = null;
let colorPick;

let finish = false;

let bgm;

function preload() {
  bgm = loadSound('ChocolateWorld.mp3');
}

function setup() {
  createCanvas(700, 700, WEBGL);
  getGrid();

  UIbuttons();
  
  bgm.setVolume(0.3);
  bgm.loop();
}

function draw() {
  background(54, 91, 143);
  
  lights();
  noStroke();

  push();
  if (!finish) rotateX(-PI / 10);
  /*
  if you want to fix camera view when placing furnitures
  
  if (showGrid) {
    rotateY(0);
    camRotY = 0;
  }
  else
  */
  rotateY(camRotY);
  
  if (finish) camRotY += 0.01;
  
  drawRoom();
  highlightGrid();
  pop();

  translate(0, -50, 0);
  rotateX(-PI / 11);

  drawEnvironment();
}

function drawEnvironment() {
  //draw sun
  push();
  fill(244, 223, 106);
  translate(230, -230, -40);
  sphere(25);
  pop();

  //draw mountains
  push();
  fill(67, 111, 53);
  translate(0, 450, 0);
  sphere(350);
  translate(-400, 150, -300);
  sphere(300);
  translate(800, 0, 0);
  sphere(300);
  pop();

  //draw tree
  push();
  rotateX(PI);
  translate(-400, -210, 300);
  fill(101, 56, 17);
  cone(15, 250);
  translate(0, 70, 0);
  fill(67, 111, 53);
  sphere(60);
  translate(15, -90, 0);
  rotateZ(-PI / 4);
  fill(101, 56, 17);
  cylinder(7, 30);
  pop();

  //draw clouds
  push();
  fill(245);
  translate(-(120 + cloud), -200, -20);
  rotateX(PI / 2);
  cylinder(40, 15);
  translate(-35, 0, -10);
  cylinder(25, 15);
  translate(70, 0, 5);
  cylinder(30, 15);
  pop();

  //cloud animation
  if (cloud >= 280) cloud = -550;
  else cloud += 0.1;
}

function drawRoom() {
  translate(0, -65, 0);

  //When finished, remove walls so that we can clearly see the furniture location
  if (!finish) {
    push();
    //Green
    fill(67, 111, 53);
    translate(127.5, 0, 0);
    rotateY(PI / 2);
    box(250, 200, 5);
    pop();

    push();
    //Blue
    fill(54, 91, 143);
    translate(0, 0, -127.5);
    box(250, 200, 5);
    pop();
  }

  //floor
  push();
  translate(0, 100, 0);
  rotateX(PI / 2);
  //seeAxis();
  box(250, 250, 5);

  //draw Grid lines only when furniture selected
  if (showGrid) drawGrid();

  //sequentially display saved furnitures
  for (let f of furnitures) {
    f.display();
  }

  pop();
}

function getGrid() {
  let size = 250;
  let divisions = 5;
  let step = size / divisions;
  let start = -size / 2 + step / 2;

  for (let i = 0; i < divisions; i++) {
    for (let j = 0; j < divisions; j++) {
      let x = start + i * step;
      let y = start + j * step;
      gridPositions.push(createVector(x, y));
    }
  }
}

//for Grid I got help from Ai

function drawGrid() {
  
  if (finish) return;
  
  translate(0, 0, 3);

  stroke(214, 114, 69);
  strokeWeight(1.5);

  let size = 250;
  let divisions = 5;
  let step = size / divisions;

  for (let i = 0; i <= divisions; i++) {
    let x = -size / 2 + i * step;
    line(x, -size / 2, x, size / 2);
  }

  for (let i = 0; i <= divisions; i++) {
    let y = -size / 2 + i * step;
    line(-size / 2, y, size / 2, y);
  }
}

function getClosestGrid(x, y) {
  let closest = null;
  let minDist = Infinity;

  for (let pos of gridPositions) {
    let d = dist(x, y, pos.x, pos.y);
    if (d < minDist) {
      minDist = d;
      closest = pos;
    }
  }

  return closest;
}

//this function is to color the section to put furniture on.
//turns red when occupied. . .
function highlightGrid() {
  
  if (finish) return;
  
  if (showGrid) {
    let gridPos = getClosestGrid(mouseX - width / 2, mouseY - height / 2);

    push();
    translate(0, 95, 0);
    rotateX(PI / 2);

    //if the section is occupied, color changed.
    if (isOccupied(gridPos)) fill(255, 114, 69, 220);
    else fill(214, 114, 69, 150);

    rectMode(CENTER);
    rect(gridPos.x, gridPos.y, 50, 50);

    pop();
  }
}

function mouseWheel(event) {
  if (!finish) {
    camRotY += event.delta * 0.001;
    camRotY = constrain(camRotY, 0, PI / 2);
  }
}

let f_rot = 0;

function keyPressed() {
  if (keyCode === RIGHT_ARROW) f_rot -= HALF_PI;
  if (keyCode === LEFT_ARROW) f_rot += HALF_PI;
}

function isOccupied(pos) {
  for (let o of occupiedGrid) {
    if (o.x == pos.x && o.y == pos.y) {
      return true;
    }
  }
  return false;
}

function mousePressed() {
  //make sure that the furniture is not generated while clicking UIs
  if (mouseY > 500) return;

  if (!selectedF || finish) return;

  let gridPos = getClosestGrid(mouseX - width / 2, mouseY - height / 2);

  if (gridPos) {
    if (isOccupied(gridPos)) return;

    if (selectedF == "S_Table")
      furnitures.push(new S_Table(gridPos.x, gridPos.y, colorPick));
    else if (selectedF == "S_Chair")
      furnitures.push(new S_Chair(gridPos.x, gridPos.y, colorPick, f_rot));
    else if (selectedF == "R_Table")
      furnitures.push(new R_Table(gridPos.x, gridPos.y, colorPick));
    else if (selectedF == "R_Chair")
      furnitures.push(new R_Chair(gridPos.x, gridPos.y, colorPick, f_rot));
    else if (selectedF == "Wardrobe")
      furnitures.push(new Wardrobe(gridPos.x, gridPos.y, colorPick, f_rot));
    else if (selectedF == "Frame")
      furnitures.push(new Frame(gridPos.x, gridPos.y, colorPick, f_rot));
    else if (selectedF == "Pot")
      furnitures.push(new Pot(gridPos.x, gridPos.y, colorPick, f_rot));
    else if (selectedF == "Teddy")
      furnitures.push(new Teddy(gridPos.x, gridPos.y, colorPick, f_rot));
    else if (selectedF == "Window")
      furnitures.push(new Window(gridPos.x, gridPos.y, colorPick, f_rot));

    occupiedGrid.push(gridPos.copy());
  }

  showGrid = false;
  selectedF = null;
}

function UIbuttons() {
  //furniture buttons
  f1 = createButton("Square Table");
  f1.position(10, 560);
  f1.size(buttonWidth, buttonHeight);
  f1.style("border-radius", "8px");
  f1.mousePressed(() => {
    selectedF = "S_Table";
    showGrid = true;
  });

  f2 = createButton("Square Chair");
  f2.position(10, 625);
  f2.size(buttonWidth, buttonHeight);
  f2.style("border-radius", "8px");
  f2.mousePressed(() => {
    selectedF = "S_Chair";
    showGrid = true;
  });

  f3 = createButton("Round Table");
  f3.position(10 + buttonPosition, 560);
  f3.size(buttonWidth, buttonHeight);
  f3.style("border-radius", "8px");
  f3.mousePressed(() => {
    selectedF = "R_Table";
    showGrid = true;
  });

  f4 = createButton("Round Chair");
  f4.position(10 + buttonPosition, 625);
  f4.size(buttonWidth, buttonHeight);
  f4.style("border-radius", "8px");
  f4.mousePressed(() => {
    selectedF = "R_Chair";
    showGrid = true;
  });

  f5 = createButton("Wardrobe");
  f5.position(10 + 2 * buttonPosition, 560);
  f5.size(buttonWidth, buttonHeight);
  f5.style("border-radius", "8px");
  f5.mousePressed(() => {
    selectedF = "Wardrobe";
    showGrid = true;
  });

  f6 = createButton("Picture Frame");
  f6.position(10 + 2 * buttonPosition, 625);
  f6.size(buttonWidth, buttonHeight);
  f6.style("border-radius", "8px");
  f6.mousePressed(() => {
    selectedF = "Frame";
    showGrid = true;
  });

  f7 = createButton("Flower Pot");
  f7.position(10 + 3 * buttonPosition, 560);
  f7.size(buttonWidth, buttonHeight);
  f7.style("border-radius", "8px");
  f7.mousePressed(() => {
    selectedF = "Pot";
    showGrid = true;
  });

  f8 = createButton("Teddy Bear");
  f8.position(10 + 3 * buttonPosition, 625);
  f8.size(buttonWidth, buttonHeight);
  f8.style("border-radius", "8px");
  f8.mousePressed(() => {
    selectedF = "Teddy";
    showGrid = true;
  });

  f9 = createButton("Window");
  f9.position(10 + 4 * buttonPosition, 560);
  f9.size(buttonWidth, buttonHeight);
  f9.style("border-radius", "8px");
  f9.mousePressed(() => {
    selectedF = "Window";
    showGrid = true;
  });

  //color buttons;

  c1 = createButton("", "rgb(244, 223, 106)");
  c1.position(10 + 4 * buttonPosition, 625);
  c1.style("background-color", "rgb(244, 223, 106)");
  c1.style("border-radius", "8px");
  c1.size(25, 25);

  c2 = createButton("", "rgb(214, 114, 69)");
  c2.position(10 + 4 * buttonPosition + 30, 625);
  c2.style("background-color", "rgb(214, 114, 69)");
  c2.style("border-radius", "8px");
  c2.size(25, 25);

  c3 = createButton("", "rgb(101, 56, 17)");
  c3.position(10 + 4 * buttonPosition + 60, 625);
  c3.style("background-color", "rgb(101, 56, 17)");
  c3.style("border-radius", "8px");
  c3.size(25, 25);

  c4 = createButton("", "rgb(67, 111, 53)");
  c4.position(10 + 4 * buttonPosition, 655);
  c4.style("background-color", "rgb(67, 111, 53)");
  c4.style("border-radius", "8px");
  c4.size(25, 25);

  c5 = createButton("", "rgb(54, 91, 143)");
  c5.position(10 + 4 * buttonPosition + 30, 655);
  c5.style("background-color", "rgb(54, 91, 143)");
  c5.style("border-radius", "8px");
  c5.size(25, 25);

  c6 = createButton("", "rgb(250, 250, 250)");
  c6.position(10 + 4 * buttonPosition + 90, 625);
  c6.style("background-color", "rgb(250, 250, 250)");
  c6.style("border-radius", "8px");
  c6.size(25, 25);

  c7 = createButton("", "rgb(30, 30, 30)");
  c7.position(10 + 4 * buttonPosition + 60, 655);
  c7.style("background-color", "rgb(30, 30, 30)");
  c7.style("border-radius", "8px");
  c7.size(25, 25);

  c1.mousePressed(() => (colorPick = "rgb(244, 223, 106)"));
  c2.mousePressed(() => (colorPick = "rgb(214, 114, 69)"));
  c3.mousePressed(() => (colorPick = "rgb(101, 56, 17)"));
  c4.mousePressed(() => (colorPick = "rgb(67, 111, 53)"));
  c5.mousePressed(() => (colorPick = "rgb(54, 91, 143)"));
  c6.mousePressed(() => (colorPick = "rgb(250, 250, 250)"));
  c7.mousePressed(() => (colorPick = "rgb(30, 30, 30)"));

  clearB = createButton("Restart");
  clearB.position(10, 535);
  clearB.size(60, 20);
  clearB.style("border-radius", "8px");

  //when restart, make sure to empty these variables
  clearB.mousePressed(() => {
    furnitures = [];
    occupiedGrid = [];
    finish = false;
    camRotY = 0;
    selectedF = null;
  });

  finishB = createButton("Finish");
  finishB.position(75, 535);
  finishB.size(60, 20);
  finishB.style("border-radius", "8px");

  finishB.mousePressed(() => (finish = true));
}

/*
for debugging

function seeAxis() {
  strokeWeight(2);

  stroke(255, 0, 0);
  line(0, 0, 0, 500, 0, 0);

  stroke(0, 255, 0);
  line(0, 0, 0, 0, 500, 0);

  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 500);

  noStroke();
}
*/
