/*
Sogang Art&Technology 2026-1 Computer Graphics
20231035 M. Park

<DIY met gala>
Interactive dress exhibition - create your own dress
Click 'Press Entrance' and show your piece of art off to the world.

dress 3d model purchased(2 USD) from https://free3d.com/3d-model/simple-cleavage-dress-261.html

Free ambient sound provided by 오콘스 - 오디오 콘텐츠 스튜디오_기자회견장 카메라 셔터소리 | Press Conference, Camera Flashing | 효과음
https://blog.naver.com/ocons_sound/224143636529

Font downloaded at https://typedia.kr/font/continuous/
*/

let dress;
let flash = 0;
let bgm;
let font;

let flashCheck, phongCheck;
let fillHSlider, fillSSlider, fillVSlider, specSlider, shinySlider;

//variables to save Image
let saveButton;
let saveMode = false;

function preload() {
  dress = loadModel("dress.obj", true);
  bgm = loadSound("Camera_Flashing1.mp3");
  font = loadFont("continuous.ttf");
}

function setup() {
  createCanvas(650, 450, WEBGL);

  //interaction part
  flashCheck = createCheckbox(" ", false);
  flashCheck.position(10, 10);
  flashCheck.style("color", "black");
  flashCheck.style("accent-color", "#344e6b");

  fillHSlider = createSlider(0, 360, 200);
  fillHSlider.position(10, 50);
  fillHSlider.style("accent-color", "#344e6b");

  fillSSlider = createSlider(0, 100, 50);
  fillSSlider.position(10, 70);
  fillSSlider.style("accent-color", "#344e6b");

  fillVSlider = createSlider(20, 100, 100);
  fillVSlider.position(10, 90);
  fillVSlider.style("accent-color", "#344e6b");

  phongCheck = createCheckbox(" ", false);
  phongCheck.position(10, 120);
  phongCheck.style("color", "black");
  phongCheck.style("accent-color", "#344e6b");

  specSlider = createSlider(0, 360, 200);
  specSlider.position(10, 160);
  specSlider.style("accent-color", "#344e6b");

  shinySlider = createSlider(5, 150, 80);
  shinySlider.position(10, 190);
  shinySlider.style("accent-color", "#344e6b");

  saveButton = createButton("  ");
  saveButton.style("background-color", "#344e6b");
  saveButton.position(90, 425);
  saveButton.size(15, 15);
  saveButton.mousePressed(saveImage);
}

function draw() {
  background(0);
  noStroke();

  textFont(font);
  textSize(14);
  fill(255);
  push();
  translate(-325, -225, 0);
  if (!saveMode) {
    text("Press Entrance", 29, 28);
    text("Dress Color", 13, 50);
    text("H", 145, 68);
    text("S", 145, 88);
    text("V", 145, 108);
    text("Shiny Textile", 29, 138);
    text("Reflected Color", 13, 160);
    text("Shininess", 13, 192);
    text("Take Photo", 16, 440);
  }
  textSize(40);
  textAlign(RIGHT);
  text("2026\nDIY Gala", 630, 355);
  textSize(14);
  text("my design, my runway", 630, 430);
  pop();

  pointLight(200, 200, 200, 0, 0, -300);
  pointLight(255, 255, 255, 0, -100, 300);

  drawStairs();

  //flash effect
  if (flashCheck.checked()) {
    if (!bgm.isPlaying()) bgm.loop();

    if (random(10) < 2) flash = 240;
    flash *= 0.5;

    pointLight(flash, flash, flash, random(-200, 200), -50, 200);
  } else {
    bgm.stop();
  }

  rotateY(PI + frameCount * 0.008);
  rotateX(PI / 2);

  push();
  scale(1);

  colorMode(HSB);

  //Lambert
  fill(fillHSlider.value(), fillSSlider.value(), fillVSlider.value());

  //Blinn-Phong
  if (phongCheck.checked()) {
    specularMaterial(specSlider.value(), 100, 100);
    shininess(shinySlider.value());
  }

  model(dress);
  pop();

  if (saveMode) {
    if (flashCheck.checked()) flash = 240;
    saveCanvas("DIY_Gala", "png");
    saveMode = false;
  }
}

//Stairs + Carpet
function drawStairs() {
  let stairDepth = 60;

  push();
  translate(0, 80, -400);
  rotateX(-PI / 8);
  translate(0, 10, 100);

  fill(45, 60, 77);
  box(200, 1, 600);

  fill(52, 78, 107);

  let width = 500;
  translate(0, -10, -100);

  for (let i = 0; i < 12; i++) {
    box(width - i * 10, 30, stairDepth);
    translate(0, -30, -stairDepth);
  }

  pop();
}

function saveImage() {
  saveMode = true;
}
