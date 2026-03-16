/*
Sogang Art&Technology 2026-1 Computer Graphics
20231035 M. Park
Teapot Launching showcase
bgm - A Temple of Asadal (https://www.bgmpresident.com/youtube_func.html?idx=5770)
*/

//Minim Library import (for bgm)
import ddf.minim.*;
Minim minim;
AudioPlayer bgm;

PFont font;
PShape teapot;
PImage img01, img02, img03;

public void setup() {
  size(960, 530, P3D);
  teapot = loadShape("teapot.obj");
  teapot.setAmbient(color(255,255,255));
  teapot.setSpecular(color(255,255,255));
  teapot.setShininess(0.2);
  
  //bgm import
  minim = new Minim(this);
  bgm = minim.loadFile("A Temple of Asadal.mp3");
  bgm.play();
  
  font = createFont("SOGANG_UNIVERSITY.ttf", 32);
  img01 =loadImage("Img01.jpg");
  img02 =loadImage("Img02.jpg");
  img03 =loadImage("Img03.jpg");
}

float sec;

public void draw() {
  background(0);
  //track the playtime of the bgm. bgm.position() returns milliseconds.
  sec = bgm.position() / 1000.0;
  
  //SceneManagement tracking bgm play situation
  if (0 <= sec && sec < 1) Scene01();
  else if (1 <= sec && sec < 8) Scene02();
  else if (8 <= sec && sec < 12) Scene03();
  else if (12 <= sec && sec < 15) Scene04();
  else if (15 <= sec && sec < 18) Scene05();
  else if (18 <= sec && sec < 22) Scene06();
  else if (22 <= sec && sec < 33) Scene07();
  else if (33 <= sec) Scene08();
  
}

//for 3D room
int wallSize = 250;

void Scene01() {
  translate(width/2, height/2, 0);
  ambientLight(30, 30, 30);
  directionalLight(150, 150, 150, -1, -1, -1);
  
  rotateX(-PI/11);
  rotateY(QUARTER_PI);
  //By drawAxis(axislength), can check the axis status
  //drawAxis(300);
  
  noStroke();
  //벽면 만들기1 creating walls
  push();
  fill(230, 230, 230);
  specular(255);
  shininess(0.5);
  translate(0, 0, -(wallSize/2));
  box(wallSize, wallSize, 0.1);
  pop();
  
  //벽면 만들기2 creating walls
  push();
  fill(230, 230, 230);
  specular(255);
  shininess(0.5);
  translate((wallSize/2), 0, 0);
  rotateY(HALF_PI);
  box(wallSize, wallSize, 0.1);
  pop();
  
  //바닥면 만들기 creating floor
  push();
  fill(230, 230, 230);
  specular(255);
  shininess(0.5);
  translate(0, (wallSize/2), 0);
  rotateX(HALF_PI);
  box(wallSize, wallSize, 0.1);
  pop();
  
  push();
  // transform the teapot
  rotateX(HALF_PI);
  scale(1.5); 
  shape(teapot);
  pop();
  
  push();
  translate(0, (wallSize/4), 0);
  noStroke();
  fill(255, 255, 255, 150);
  specular(255);
  shininess(0.5);
  box(25, wallSize/2, 25);
  pop();
}

void Scene02() {
  push();
  noStroke();
  textFont(font);
  textAlign(CENTER);
  fill(255, 255, 255);
  textSize(12);
  text("Imagine you floating along the rhythm of the nature.", 480, 100);
  pop();
  
  translate(width/2, height/2, 0);
  
  ambientLight(30, 30, 30);
  directionalLight(150, 150, 150, -1, -1, -1);
  
  rotateX(-PI/11);
  rotateY(QUARTER_PI);
  //drawAxis(300);
  
  noStroke();
  //벽면 만들기1 creating walls
  push();
  fill(230, 230, 230);
  specular(255);
  shininess(0.5);
  translate(0, 0, -(wallSize/2));
  image(img01, -(wallSize/2), -(wallSize/2), wallSize, wallSize);
  pop();
  
  //벽면 만들기2 creating walls
  push();
  fill(230, 230, 230);
  specular(255);
  shininess(0.5);
  translate((wallSize/2), 0, 0);
  rotateY(HALF_PI);
  image(img03, -(wallSize/2), -(wallSize/2), wallSize, wallSize);
  pop();
  
  //바닥면 만들기 creating floor
  push();
  fill(230, 230, 230);
  specular(255);
  shininess(0.5);
  translate(0, (wallSize/2), 0);
  rotateX(HALF_PI);
  image(img02, -(wallSize/2), -(wallSize/2), wallSize, wallSize);
  pop();
  
  push();
  // transform the teapot
  rotateX(HALF_PI);
  scale(1.5); 
  shape(teapot);
  pop();
  
  push();
  translate(0, (wallSize/4), 0);
  noStroke();
  fill(255, 255, 255, 150);
  specular(255);
  shininess(0.5);
  box(25, wallSize/2, 25);
  pop();
}

void Scene03() {
  noStroke();
  textFont(font);
  fill(255, 255, 255);
  textSize(24);
  text("Have", 200, 280);
  text("just a cup of Tea", 265, 320);
  
  push();
  //티팟을 똑바로 세우기 위한 좌표 조정. change the coordinate to make the teapot upright.
  translate(width/2, height/2, 0);
  rotateX(HALF_PI);
  scale(4);
  //똑바로 세운 다음에 위치 변경 teapot location change.
  translate(40, 0, -10);
  pointLight(255, 255, 255, width/2, height/2, 0);
  shape(teapot);
  pop();
}

//angle, speed(velocity), acceleration
float angle = 0;
float speed = 0;
float acc = 0.0002;

void Scene04() {
  
  noStroke();
  textFont(font);
  fill(255, 255, 255);
  textSize(24);
  text("Have", 200, 280);
  text("just a cup of Tea", 265, 320);
  
  rotateY(-angle);
  
  push();
  //티팟을 똑바로 세우기 위한 좌표 조정. change the coordinate to make the teapot upright.
  translate(width/2, height/2, 0);
  rotateX(HALF_PI);
  scale(4);
  //똑바로 세운 다음에 위치 변경 teapot location change.
  translate(40, 0, -10);
  pointLight(255, 255, 255, width/2, height/2, 0);
  shape(teapot);
  pop();
  
  //add acc to speed
  speed += acc;
  angle += speed;
}

void Scene05() {
  noStroke();
  textFont(font);
  fill(255, 255, 255);
  textSize(24);
  text("Have", 200, 280);
  text("just a cup of Tea", 265, 320);
  fill(203, 253, 255);
  text("MORE", 265, 280);
  text("than", 200, 320);
  
  //make sure to rotate only one time
  if (angle <= 2*PI)
    //rotation direction reverse
    rotateY(-angle);

  push();
  //티팟을 똑바로 세우기 위한 좌표 조정. change the coordinate to make the teapot upright.
  translate(width/2, height/2, 0);
  rotateX(HALF_PI);
  scale(4);
  //똑바로 세운 다음에 위치 변경 teapot location change.
  translate(40, 0, -10);
  pointLight(203, 253, 255, width/2, height/2, 0);
  shape(teapot);
  pop();
  
  speed += acc;
  angle += speed;
}

//teapot dropping effect. influenced by waterdrop
float rot = 0;
float Z_Position = 100;
float Z_Speed = 0.1;
float Z_Acc = 0.01;

void Scene06() {
  push();
  noStroke();
  textFont(font);
  fill(255, 255, 255);
  textSize(24);
  text("Be part of them", 500, 265);
  textAlign(RIGHT);
  text("Just one sip", 440, 265);
  pop();
  
  push();
  //티팟을 똑바로 세우기 위한 좌표 조정. change the coordinate to make the teapot upright.
  translate(width/2, height/2, 0);
  rotateX(HALF_PI);
  //drawAxis(200);
  scale(2);
  //똑바로 세운 다음에 위치 변경 teapot location change.
  translate(0, 0, Z_Position);
  rotateY(-QUARTER_PI);
  rotateX(rot);
  pointLight(203, 253, 255, width/2, height/2, 0);
  shape(teapot);
  pop();
  
  rot += 0.05;
  Z_Speed += Z_Acc;
  Z_Position -= Z_Speed;
}

//teapot is coming toward the audience while spinning around
float rot2 = 0;
float Coming = 10;

void Scene07() {
  push();
  noStroke();
  textFont(font);
  fill(255, 255, 255);
  textSize(24);
  text("Be part of them", 500, 265);
  textAlign(RIGHT);
  text("Just one sip", 440, 265);
  pop();
  
  push();
  //티팟을 똑바로 세우기 위한 좌표 조정. change the coordinate to make the teapot upright.
  translate((width/2)-2, height/2+2, Coming);
  //drawAxis(200);
  rotateZ(rot2);
  scale(2);
  //똑바로 세운 다음에 위치 변경 teapot location change.
  //translate(0, 0, Z_Position);
  pointLight(255, 255, 255, width/2, height/2, 0);
  shape(teapot);
  pop();
  
  rot2 += 0.01;
  Coming += 0.61;
}

//sceneRot and sceneHue is changing through mouseWheel scroll!
float sceneRot = 0;
float sceneHue = 0;

void Scene08() {
  //text is not set to be rotating
  push();
  noStroke();
  textFont(font);
  fill(255, 255, 255, 200);
  textSize(32);
  text("The highest virtue resembles water.", 60, 100);
  textSize(12);
  text("Water benefits all things, does not compete.", 60, 125);
  text("Fill yourself with the highest virtue of Daoism.", 60, 140);
  text("Fill yourself with the simplest teapot.", 60, 155);
  pop();
  
  translate(width/2, height/2, 0);
  //rotating whole things around Y axis
  rotateY(sceneRot);
  
  ambientLight(130, 130, 130);
  
  colorMode(HSB, 360, 100, 100);
  //change light color when scrolling the wheel
  directionalLight(sceneHue, 30, 95, -1, sceneRot+100, -1);
  
  colorMode(RGB, 255, 255, 255);
  
  push();
  //티팟을 똑바로 세우기 위한 좌표 조정. change the coordinate to make the teapot upright.
  rotateX(HALF_PI);
  //똑바로 세운 다음에 위치 변경 teapot location change.
  translate(100, 0, -80);
  rotateY(-QUARTER_PI/2);
  //drawAxis(200);
  scale(9);
  shape(teapot);
  pop();
  
  noStroke();
  
  //for moon
  push();
  translate(-width/2, -height/2, 0);
  translate(850, 100, -30);
  fill(255, 228, 172);
  sphere(30);
  pop();
  
  //for cloud
  push();
  translate(-width/2, -height/2, 0);
  fill(255, 255, 255, 70);
  randomSeed(0);
  for(int i=10; i<450; i+=110) {
    push();
    translate(i, 510, 0);
    sphere(random(60, 80));
    pop();
  }
  for(int i=100; i<350; i+=100) {
    push();
    translate(i, 450, 0);
    sphere(random(50, 70));
    pop();
  }
  pop();
}

void mouseWheel(MouseEvent event) {
  if (sec >= 33.5) {
    //multiply different float, bc hue should be changed dramatically
     sceneRot += event.getCount() * 0.1;
     sceneHue -= event.getCount() * 5;
  }
}

/*
//축 시각화 함수
//X = red / Y = Green / Z = Blue
void drawAxis(float len) {
  strokeWeight(1.5);
  
  //X
  stroke(255, 0, 0);
  line(0, 0, 0, len, 0, 0);

  //Y
  stroke(0, 255, 0);
  line(0, 0, 0, 0, len, 0);

  //Z
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, len);
}
*/
