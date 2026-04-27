/*
Sogang Art&Technology 2026-1 Computer Graphics
20231035 M. Park

<Desire to Escape>
Click Screen once to start Dance

(R)        (L)

Font downloaded at https://copyright.keris.or.kr/wft/fntDwnldView?fntGrpId=GFT202210270000000000117
*/

// 팔 관절:
// 위/아래 arm up/down -> rotateZ
// 앞/뒤 arm back/front-> rotateY
// 다리 관절:
// 오/왼 leg left/right -> rotateZ
// 앞/뒤 leg back/front -> rotateX

let font;
let subtitles = [
  { start: 1, end: 5, text: "제발 지옥같은 여기서 날 꺼내줘" },
  { start: 5, end: 9, text: "이게 꿈이라면 어서 날 깨워줘" },
  { start: 9, end: 13, text: "모든 것이 다 거짓말이라고 해줘" },
  { start: 13, end: 17, text: "내게 말해줘 말해줘 나 살 수 있게" },
  { start: 17, end: 21, text: "I found a way to let you leave" },
  { start: 21, end: 25, text: "I never really had it coming" },
  { start: 25, end: 29, text: "I can't be in the sight of you" },
  { start: 29, end: 34, text: "I want you to stay away from my heart" },
];

//body parts
let head, neck, upperBody, lowerBody;
let upperArm, lowerArm, hand;
let upperLeg, lowerLeg, foot;
let music;
let Imgs = [];

//entire body rotation
let rot = 0;
//torso rotation
let torsoX = 0;

// right arm
let rightShoulderZ = 0;
let rightElbowZ = 0;
let rightShoulderY = 0;
let rightElbowY = 0;

// left arm
let leftShoulderZ = 0;
let leftElbowZ = 0;
let leftShoulderY = 0;
let leftElbowY = 0;

// right leg
let rightHipZ = 0;
let rightHipX = 0;
let rightKneeZ = 0;
let rightKneeX = 0;

// left leg
let leftHipZ = 0;
let leftHipX = 0;
let leftKneeZ = 0;
let leftKneeX = 0;

function preload() {
  head = loadModel("assets/Head.obj", true);
  neck = loadModel("assets/Neck.obj", true);
  upperBody = loadModel("assets/UpperBody.obj", true);
  lowerBody = loadModel("assets/LowerBody.obj", true);

  upperArm = loadModel("assets/UpperArm.obj", true);
  lowerArm = loadModel("assets/LowerArm.obj", true);
  hand = loadModel("assets/Hand.obj", true);

  upperLeg = loadModel("assets/UpperLeg.obj", true);
  lowerLeg = loadModel("assets/LowerLeg.obj", true);
  foot = loadModel("assets/Foot.obj", true);

  soundFormats("mp3");
  music = loadSound("assets/RobotAnimation.mp3");

  font = loadFont("assets/NanumBarunGothicBold.otf");
  
  Imgs[0] = loadImage("assets/escape01.jpg");
  Imgs[1] = loadImage("assets/escape02.jpg");
  Imgs[2] = loadImage("assets/escape03.jpg");
  Imgs[3] = loadImage("assets/escape04.jpg");
  Imgs[4] = loadImage("assets/escape05.jpg");
  Imgs[5] = loadImage("assets/escape06.jpg");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  userStartAudio(); //mouse click to start audio
}

function draw() {
  background(0);
  drawImage(); 
  
  updateCamera(); //camera move

  lights();
  noStroke();
  fill(200);

  updateAnimation(); //animation function!

  push();
  scale(0.4);

  //full body rotation
  rotateY(rot);

  //-----------------------------
  push();
  translate(0, -30, 0);

  drawBody();
  drawLeftArm();
  drawRightArm();
  drawLeftLeg();
  drawRightLeg();

  pop();
  //-----------------------------

  drawLyrics(); //lyrics texts ...
}

function updateCamera() {
  let t = music && music.isPlaying() ? music.currentTime() : 0;

  let camX = 0;
  let camY = 0;
  let camZ = 800;

  //제발 지옥같은 여기서 날 꺼내줘
  if (t >= 1 && t < 5) {
    camX = 0;
    camY = 0;
    camZ = 800;
  }

  //이게 꿈이라면 어서 날 깨워줘
  else if (t >= 5 && t < 9) {
    camX = 220;
    camY = -130;
    camZ = 800;
  }

  //모든 것이 다 거짓말이라고 해줘
  else if (t >= 9 && t < 13) {
    camX = -180;
    camY = 120;
    camZ = 800;
  }

  //내게 말해줘 말해줘 나 살 수 있게
  else if (t >= 13 && t < 17) {
    camX = 0;
    camY = 0;
    camZ = 800;
  }

  //이후
  else if (t >= 17) {
    camX = 0;
    camY = 0;
    camZ = 800 + (t - 17) * 40;
  }

  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0); //different location along the music
}

//joint rotation initialization function
function setPose(p) {
  torsoX = p.torsoX || 0;

  rightShoulderZ = p.rightShoulderZ || 0;
  rightShoulderY = p.rightShoulderY || 0;
  rightElbowZ = p.rightElbowZ || 0;
  rightElbowY = p.rightElbowY || 0;

  leftShoulderZ = p.leftShoulderZ || 0;
  leftShoulderY = p.leftShoulderY || 0;
  leftElbowZ = p.leftElbowZ || 0;
  leftElbowY = p.leftElbowY || 0;

  rightHipX = p.rightHipX || 0;
  rightKneeX = p.rightKneeX || 0;
  rightHipZ = p.rightHipZ || 0;
  rightKneeZ = p.rightKneeZ || 0;

  leftHipX = p.leftHipX || 0;
  leftHipZ = p.leftHipZ || 0;
  leftKneeX = p.leftKneeX || 0;
  leftKneeZ = p.leftKneeZ || 0;
}

//animation connection -> lerp!
function lerpPose(a, b, amt) {
  setPose({
    torsoX: lerp(a.torsoX || 0, b.torsoX || 0, amt),

    rightShoulderZ: lerp(a.rightShoulderZ || 0, b.rightShoulderZ || 0, amt),
    rightShoulderY: lerp(a.rightShoulderY || 0, b.rightShoulderY || 0, amt),
    rightElbowZ: lerp(a.rightElbowZ || 0, b.rightElbowZ || 0, amt),
    rightElbowY: lerp(a.rightElbowY || 0, b.rightElbowY || 0, amt),

    leftShoulderZ: lerp(a.leftShoulderZ || 0, b.leftShoulderZ || 0, amt),
    leftShoulderY: lerp(a.leftShoulderY || 0, b.leftShoulderY || 0, amt),
    leftElbowZ: lerp(a.leftElbowZ || 0, b.leftElbowZ || 0, amt),
    leftElbowY: lerp(a.leftElbowY || 0, b.leftElbowY || 0, amt),

    rightHipX: lerp(a.rightHipX || 0, b.rightHipX || 0, amt),
    rightKneeX: lerp(a.rightKneeX || 0, b.rightKneeX || 0, amt),
    rightHipZ: lerp(a.rightHipZ || 0, b.rightHipZ || 0, amt),
    rightKneeZ: lerp(a.rightKneeZ || 0, b.rightKneeZ || 0, amt),

    leftHipZ: lerp(a.leftHipZ || 0, b.leftHipZ || 0, amt),
    leftHipX: lerp(a.leftHipX || 0, b.leftHipX || 0, amt),
    leftKneeZ: lerp(a.leftKneeZ || 0, b.leftKneeZ || 0, amt),
    leftKneeX: lerp(a.leftKneeX || 0, b.leftKneeX || 0, amt),
  });
}

//determines which pose = animation and when to play
function updateAnimation() {
  let t = music && music.isPlaying() ? music.currentTime() : 0;

  //Had to find the right angle of all joints to make the exact pose I wanted ...
  let interPose = {
    torsoX: -0.2,

    rightShoulderZ: -1,
    rightShoulderY: 0,
    rightElbowZ: -3,
    rightElbowY: 1,

    leftShoulderZ: 1,
    leftShoulderY: 0,
    leftElbowZ: -3,
    leftElbowY: -1,

    rightHipX: 0.4,
    rightHipZ: 0,
    rightKneeX: -0.8,
    rightKneeZ: 0,

    leftHipX: 0.4,
    leftHipZ: 0,
    leftKneeX: -0.8,
    leftKneeZ: 0,
  };

  let pose1 = {
    torsoX: -0.2,

    rightShoulderZ: -1,
    rightShoulderY: 0,
    rightElbowZ: -3,
    rightElbowY: 1,

    leftShoulderZ: 1,
    leftShoulderY: 0,
    leftElbowZ: 0,
    leftElbowY: 0,

    rightHipX: 0.4,
    rightHipZ: 0,
    rightKneeX: -0.8,
    rightKneeZ: 0,

    leftHipX: 0.1,
    leftHipZ: 0.5,
    leftKneeX: -0.2,
    leftKneeZ: 0,
  };

  let pose2 = {
    torsoX: -0.2,

    rightShoulderZ: -1,
    rightShoulderY: 0,
    rightElbowZ: 0,
    rightElbowY: 0,

    leftShoulderZ: 1,
    leftShoulderY: 0,
    leftElbowZ: -3,
    leftElbowY: -1,

    rightHipX: 0.1,
    rightHipZ: -0.5,
    rightKneeX: -0.2,
    rightKneeZ: 0,

    leftHipX: 0.4,
    leftHipZ: 0,
    leftKneeX: -0.8,
    leftKneeZ: 0,
  };

  let interPose2 = {
    torsoX: -0.2,

    rightShoulderZ: -2,
    rightShoulderY: 2,
    rightElbowZ: -2,
    rightElbowY: 1,

    leftShoulderZ: 2,
    leftShoulderY: -2,
    leftElbowZ: -2,
    leftElbowY: -1,

    rightHipX: 0.4,
    rightHipZ: 0,
    rightKneeX: -0.8,
    rightKneeZ: 0,

    leftHipX: 0.4,
    leftHipZ: 0,
    leftKneeX: -0.8,
    leftKneeZ: 0,
  };

  let pose3 = {
    torsoX: -0.3,

    rightShoulderZ: -2,
    rightShoulderY: 2,
    rightElbowZ: -2,
    rightElbowY: 1,

    leftShoulderZ: 2,
    leftShoulderY: -2,
    leftElbowZ: -2,
    leftElbowY: -1,

    rightHipX: 1.0,
    rightHipZ: 0,
    rightKneeX: -2.0,
    rightKneeZ: 0,

    leftHipX: 0.4,
    leftHipZ: 0,
    leftKneeX: -0.8,
    leftKneeZ: 0,
  };

  let pose4 = {
    torsoX: -0.3,

    rightShoulderZ: -2,
    rightShoulderY: 2,
    rightElbowZ: -2,
    rightElbowY: 1,

    leftShoulderZ: 2,
    leftShoulderY: -2,
    leftElbowZ: -2,
    leftElbowY: -1,

    rightHipX: 0.4,
    rightHipZ: 0,
    rightKneeX: -0.8,
    rightKneeZ: 0,

    leftHipX: 1.0,
    leftHipZ: 0,
    leftKneeX: -2.0,
    leftKneeZ: 0,
  };

  let pose5 = {
    torsoX: 0,

    rightShoulderZ: -0.9,
    rightShoulderY: 0,
    rightElbowZ: -2.2,
    rightElbowY: 0.7,

    leftShoulderZ: 0.9,
    leftShoulderY: 0,
    leftElbowZ: -2.2,
    leftElbowY: -0.7,

    rightHipX: 0,
    rightHipZ: 0,
    rightKneeX: 0,
    rightKneeZ: 0,

    leftHipX: 0,
    leftHipZ: 0,
    leftKneeX: 0,
    leftKneeZ: 0,
  };

  let pose6 = {
    torsoX: 0.2,

    rightShoulderZ: -0.9,
    rightShoulderY: 0,
    rightElbowZ: 0,
    rightElbowY: 0.7,

    leftShoulderZ: 0.9,
    leftShoulderY: 0,
    leftElbowZ: 0,
    leftElbowY: -0.7,

    rightHipX: 0,
    rightHipZ: 0,
    rightKneeX: 0,
    rightKneeZ: 0,

    leftHipX: -0.3,
    leftHipZ: 0.5,
    leftKneeX: -0.5,
    leftKneeZ: 0,
  };

  let pose7 = {
    torsoX: 0.2,

    rightShoulderZ: -0.9,
    rightShoulderY: 0,
    rightElbowZ: 0,
    rightElbowY: 0.7,

    leftShoulderZ: 0.9,
    leftShoulderY: 0,
    leftElbowZ: 0,
    leftElbowY: -0.7,

    rightHipX: -0.3,
    rightHipZ: -0.5,
    rightKneeX: -0.5,
    rightKneeZ: 0,

    leftHipX: 0,
    leftHipZ: 0,
    leftKneeX: 0,
    leftKneeZ: 0,
  };

  let pose8 = {
    torsoX: -0.2,

    rightShoulderZ: -0.9,
    rightShoulderY: -0.5,
    rightElbowZ: -1.5,
    rightElbowY: 0,

    leftShoulderZ: 0.9,
    leftShoulderY: 0.5,
    leftElbowZ: -1.5,
    leftElbowY: 0,

    rightHipX: 0.4,
    rightHipZ: 0,
    rightKneeX: -0.8,
    rightKneeZ: 0,

    leftHipX: 0.4,
    leftHipZ: 0,
    leftKneeX: -0.8,
    leftKneeZ: 0,
  };

  let pose9 = {
    torsoX: -0.2,

    rightShoulderZ: -0.9,
    rightShoulderY: -0.5,
    rightElbowZ: -1.5,
    rightElbowY: 0,

    leftShoulderZ: 0.9,
    leftShoulderY: 0.5,
    leftElbowZ: -1.5,
    leftElbowY: 0,

    rightHipX: 1,
    rightHipZ: 0,
    rightKneeX: -0.8,
    rightKneeZ: 0,

    leftHipX: 0.4,
    leftHipZ: 0,
    leftKneeX: -0.8,
    leftKneeZ: 0,
  };

  let pose10 = {
    torsoX: -0.2,

    rightShoulderZ: -0.9,
    rightShoulderY: -0.5,
    rightElbowZ: -1.5,
    rightElbowY: 0,

    leftShoulderZ: 0.9,
    leftShoulderY: 0.5,
    leftElbowZ: -1.5,
    leftElbowY: 0,

    rightHipX: 0.4,
    rightHipZ: 0,
    rightKneeX: -0.8,
    rightKneeZ: 0,

    leftHipX: 1,
    leftHipZ: 0,
    leftKneeX: -0.8,
    leftKneeZ: 0,
  };

  let pose11 = {
    torsoX: -0.2,

    rightShoulderZ: -0.9,
    rightShoulderY: 0,
    rightElbowZ: 0,
    rightElbowY: 0,

    leftShoulderZ: 0.9,
    leftShoulderY: 0,
    leftElbowZ: 0,
    leftElbowY: 0,

    rightHipX: 0,
    rightHipZ: 0,
    rightKneeX: 0,
    rightKneeZ: 0,

    leftHipX: 0,
    leftHipZ: 0,
    leftKneeX: 0,
    leftKneeZ: 0,
  };

  let poses = [
    pose1,
    pose2,
    pose3,
    pose4,
    pose5,
    pose6,
    pose7,
    pose8,
    pose9,
    pose10,
    pose11,
  ];

  
  //below is timeline for animation connection.
  if (t >= 0.5 && t < 1.1) {
    let amt = map(t, 0.5, 1.1, 0, 1);
    lerpPose(pose11, interPose, amt);
  }

  //제발 지옥같은 여기서
  else if (t >= 1.1 && t < 1.3) {
    let amt = map(t, 1.1, 1.3, 0, 1);
    lerpPose(interPose, pose1, amt);
  } else if (t >= 1.3 && t < 1.6) {
    let amt = map(t, 1.3, 1.6, 0, 1);
    lerpPose(pose1, interPose, amt);
  } else if (t >= 1.6 && t < 1.9) {
    let amt = map(t, 1.6, 1.9, 0, 1);
    lerpPose(interPose, pose2, amt);
  } else if (t >= 1.9 && t < 2.2) {
    let amt = map(t, 1.9, 2.2, 0, 1);
    lerpPose(pose2, interPose, amt);
  } else if (t >= 2.2 && t < 2.5) {
    let amt = map(t, 2.2, 2.5, 0, 1);
    lerpPose(interPose, pose1, amt);
  } else if (t >= 2.5 && t < 2.8) {
    let amt = map(t, 2.5, 2.8, 0, 1);
    lerpPose(pose1, interPose, amt);
  } else if (t >= 2.8 && t < 3.1) {
    let amt = map(t, 2.8, 3.1, 0, 1);
    lerpPose(interPose, pose1, amt);
  } else if (t >= 3.1 && t < 3.4) {
    let amt = map(t, 3.1, 3.4, 0, 1);
    lerpPose(pose1, interPose, amt);
  }

  //날 꺼내줘
  else if (t >= 3.4 && t < 3.6) {
    let amt = map(t, 3.4, 3.6, 0, 1);
    lerpPose(interPose, interPose2, amt);
  } else if (t >= 3.6 && t < 3.8) {
    let amt = map(t, 3.6, 3.8, 0, 1);
    lerpPose(interPose2, pose4, amt);
  } else if (t >= 3.8 && t < 4.0) {
    let amt = map(t, 3.8, 4.0, 0, 1);
    lerpPose(pose4, interPose2, amt);
  } else if (t >= 4.0 && t < 4.2) {
    let amt = map(t, 4.0, 4.2, 0, 1);
    lerpPose(interPose2, pose3, amt);
  } else if (t >= 4.2 && t < 4.4) {
    let amt = map(t, 4.2, 4.4, 0, 1);
    lerpPose(pose3, interPose2, amt);
  } else if (t >= 4.4 && t < 4.6) {
    let amt = map(t, 4.4, 4.6, 0, 1);
    lerpPose(interPose2, pose4, amt);
  } else if (t >= 4.6 && t < 4.8) {
    let amt = map(t, 4.6, 4.8, 0, 1);
    lerpPose(pose4, interPose2, amt);
  } else if (t >= 4.8 && t < 5.0) {
    let amt = map(t, 4.8, 5.0, 0, 1);
    lerpPose(interPose2, pose4, amt);
  } else if (t >= 5.0 && t < 5.2) {
    let amt = map(t, 5.0, 5.2, 0, 1);
    lerpPose(pose4, interPose2, amt);
  }

  //이게
  else if (t >= 5.2 && t < 5.4) {
    let amt = map(t, 5.2, 5.4, 0, 1);
    lerpPose(interPose2, interPose, amt);
  }

  //꿈이라면
  else if (t >= 5.4 && t < 5.7) {
    let amt = map(t, 5.4, 5.7, 0, 1);
    lerpPose(interPose, pose1, amt);
  } else if (t >= 5.7 && t < 6.0) {
    let amt = map(t, 5.7, 6.0, 0, 1);
    lerpPose(pose1, interPose, amt);
  } else if (t >= 6.0 && t < 6.3) {
    let amt = map(t, 6.0, 6.3, 0, 1);
    lerpPose(interPose, pose1, amt);
  } else if (t >= 6.3 && t < 6.6) {
    let amt = map(t, 6.3, 6.6, 0, 1);
    lerpPose(pose1, interPose, amt);
  } else if (t >= 6.6 && t < 6.9) {
    let amt = map(t, 6.6, 6.9, 0, 1);
    lerpPose(interPose, pose2, amt);
  } else if (t >= 6.9 && t < 7.2) {
    let amt = map(t, 6.9, 7.2, 0, 1);
    lerpPose(pose2, interPose, amt);
  } else if (t >= 7.2 && t < 7.5) {
    let amt = map(t, 7.2, 7.5, 0, 1);
    lerpPose(interPose, pose2, amt);
  } else if (t >= 7.5 && t < 7.8) {
    let amt = map(t, 7.5, 7.8, 0, 1);
    lerpPose(pose2, interPose, amt);
  }

  // 어서 날 깨워줘
  else if (t >= 7.8 && t < 8.0) {
    let amt = map(t, 7.8, 8.0, 0, 1);
    lerpPose(interPose, interPose2, amt);
  } else if (t >= 8.0 && t < 8.2) {
    let amt = map(t, 8.0, 8.2, 0, 1);
    lerpPose(interPose2, pose4, amt);
  } else if (t >= 8.2 && t < 8.4) {
    let amt = map(t, 8.2, 8.4, 0, 1);
    lerpPose(pose4, interPose2, amt);
  } else if (t >= 8.4 && t < 8.6) {
    let amt = map(t, 8.4, 8.6, 0, 1);
    lerpPose(interPose2, pose3, amt);
  } else if (t >= 8.6 && t < 8.8) {
    let amt = map(t, 8.6, 8.8, 0, 1);
    lerpPose(pose3, interPose2, amt);
  } else if (t >= 8.8 && t < 9.0) {
    let amt = map(t, 8.8, 9.0, 0, 1);
    lerpPose(interPose2, pose4, amt);
  } else if (t >= 9.0 && t < 9.2) {
    let amt = map(t, 9.0, 9.2, 0, 1);
    lerpPose(pose4, interPose2, amt);
  } else if (t >= 9.2 && t < 9.4) {
    let amt = map(t, 9.2, 9.4, 0, 1);
    lerpPose(interPose2, pose3, amt);
  } else if (t >= 9.4 && t < 9.6) {
    let amt = map(t, 9.4, 9.6, 0, 1);
    lerpPose(pose3, interPose2, amt);
  }

  // 모든 것이 다 거짓말
  else if (t >= 9.6 && t < 10.0) {
    let amt = map(t, 9.6, 10.0, 0, 1);
    lerpPose(interPose2, pose5, amt);
  } else if (t >= 10.0 && t < 10.2) {
    let amt = map(t, 10.0, 10.2, 0, 1);
    lerpPose(pose5, pose6, amt);
  } else if (t >= 10.2 && t < 10.6) {
    let amt = map(t, 10.2, 10.6, 0, 1);
    lerpPose(pose6, pose5, amt);
  } else if (t >= 10.6 && t < 10.8) {
    let amt = map(t, 10.6, 10.8, 0, 1);
    lerpPose(pose5, pose7, amt);
  } else if (t >= 10.8 && t < 11.1) {
    let amt = map(t, 10.8, 11.1, 0, 1);
    lerpPose(pose7, interPose, amt);
  }

  // 이라고 해줘
  else if (t >= 11.1 && t < 11.4) {
    let amt = map(t, 11.1, 11.4, 0, 1);
    lerpPose(interPose, pose1, amt);
  } else if (t >= 11.4 && t < 11.7) {
    let amt = map(t, 11.4, 11.7, 0, 1);
    lerpPose(pose1, interPose, amt);
  } else if (t >= 11.7 && t < 12.0) {
    let amt = map(t, 11.7, 12.0, 0, 1);
    lerpPose(interPose, pose2, amt);
  } else if (t >= 12.0 && t < 12.3) {
    let amt = map(t, 12.0, 12.3, 0, 1);
    lerpPose(pose2, interPose, amt);
  } else if (t >= 12.3 && t < 12.6) {
    let amt = map(t, 12.3, 12.6, 0, 1);
    lerpPose(interPose, pose1, amt);
  } else if (t >= 12.6 && t < 12.9) {
    let amt = map(t, 12.6, 12.9, 0, 1);
    lerpPose(pose1, interPose, amt);
  } else if (t >= 12.9 && t < 13.2) {
    let amt = map(t, 12.9, 13.2, 0, 1);
    lerpPose(interPose, pose2, amt);
  } else if (t >= 13.2 && t < 13.5) {
    let amt = map(t, 13.2, 13.5, 0, 1);
    lerpPose(pose2, interPose, amt);
  }

  //내게 말해줘 말해줘 나 살 수 있게
  else if (t >= 13.5 && t < 13.8) {
    let amt = map(t, 13.5, 13.8, 0, 1);
    lerpPose(interPose, pose8, amt);
  } else if (t >= 13.8 && t < 14.1) {
    let amt = map(t, 13.8, 14.1, 0, 1);
    lerpPose(pose8, pose9, amt);
  } else if (t >= 14.1 && t < 14.4) {
    let amt = map(t, 14.1, 14.4, 0, 1);
    lerpPose(pose9, pose10, amt);
  } else if (t >= 14.4 && t < 14.7) {
    let amt = map(t, 14.4, 14.7, 0, 1);
    lerpPose(pose10, pose9, amt);
  } else if (t >= 14.7 && t < 15.0) {
    let amt = map(t, 14.7, 15.0, 0, 1);
    lerpPose(pose9, pose10, amt);
  } else if (t >= 15.0 && t < 15.3) {
    let amt = map(t, 15.0, 15.3, 0, 1);
    lerpPose(pose10, pose9, amt);
  } else if (t >= 15.3 && t < 15.6) {
    let amt = map(t, 15.3, 15.6, 0, 1);
    lerpPose(pose9, pose10, amt);
  } else if (t >= 15.6 && t < 15.9) {
    let amt = map(t, 15.6, 16.1, 0, 1);
    lerpPose(pose10, pose11, amt);
  } else {
    //from now on it's random!
    if (t >= 17) {
      randomDance(t, poses);
    } else {
      setPose(pose11);
    }
  }

  //full body rotation
  if (t >= 7.8 && t < 9.6) {
    let amt = map(t, 7.8, 9.6, 0, 1);
    rot = lerp(0, TWO_PI, amt);
  } else if (t >= 13.5 && t < 13.8) {
    let amt = map(t, 13.5, 13.8, 0, 1);
    rot = lerp(0, HALF_PI, amt);
  } else if (t >= 13.8 && t < 15.6) {
    rot = HALF_PI;
  } else if (t >= 15.6 && t < 16.1) {
    let amt = map(t, 15.6, 16.1, 0, 1);
    rot = lerp(HALF_PI, 0, amt);
  } else {
    rot = 0;
  }

  //elbow rolling -> got help from chatgpt. Still not fully satisfying ...
  if ((t >= 9.6 && t < 10.0) || (t >= 10.2 && t < 10.6)) {
    let startTime = t < 10.0 ? 9.6 : 10.2;
    let amt = map(t, startTime, startTime + 0.4, 0, 1);
    let wave = sin(amt * TWO_PI * 2);

    rightElbowY = 0.7 + wave * 0.25;
    leftElbowY = -0.7 - wave * 0.25;
  }
}

let currentDancePose = null;
let nextDancePose = null;
let lastChangeTime = 0;

//random animation played after specific point
function randomDance(t, poses) {
  if (currentDancePose == null) {
    currentDancePose = poses[10]; // pose11
    nextDancePose = random(poses);
    lastChangeTime = t;
  }

  if (t - lastChangeTime > 0.15) {
    lastChangeTime = t;
    currentDancePose = nextDancePose;
    nextDancePose = random(poses);
  }

  let amt = map(t, lastChangeTime, lastChangeTime + 0.15, 0, 1);
  amt = constrain(amt, 0, 1);

  lerpPose(currentDancePose, nextDancePose, amt);
}

function drawBody() {
  push();
  translate(0, -5, 0);
  rotateX(PI);
  scale(1.2);

  translate(0, -60, 0);
  rotateX(torsoX);
  translate(0, 60, 0);

  fill(250);
  model(upperBody);

  push();
  translate(0, 110, 0);
  scale(0.3);
  fill(245, 228, 211);
  model(neck);
  pop();

  push();
  scale(0.7);
  rotateY(PI);
  translate(0, 270, 0);
  fill(245, 228, 211);
  model(head);
  pop();

  pop();

  push();
  translate(0, 140, 0);
  rotateX(PI);
  scale(0.95);
  fill(14, 43, 71);
  model(lowerBody);
  pop();
}

function drawRightArm() {
  push();
  translate(-100, -20, 0);
  scale(0.8);

  push();
  translate(-75, -65, 0);

  translate(100, 0, 0); //joint offset adjusting!
  rotateZ(rightShoulderZ);
  rotateY(rightShoulderY);
  translate(-100, 0, 0);

  fill(250);
  model(upperArm);

  push();
  scale(0.8);
  translate(-220, 0, 0);

  translate(80, 0, 0); //joint offset adjusting!
  rotateZ(rightElbowZ);
  rotateY(rightElbowY);
  translate(-80, 0, 0);

  fill(245, 228, 211);
  model(lowerArm);

  push();
  scale(0.6);
  translate(-250, 0, 0);

  model(hand);
  pop();

  pop();
  pop();

  pop();

  pop();
}

function drawLeftArm() {
  push();
  translate(100, -20, 0);
  scale(0.8);

  push();
  translate(75, -65, 0);

  translate(-100, 0, 0); //joint offset adjusting!
  rotateZ(leftShoulderZ);
  rotateY(leftShoulderY);
  translate(100, 0, 0);

  rotateY(PI); //for 좌우반전

  fill(250);
  model(upperArm);

  push();
  scale(0.8);
  translate(-220, 0, 0);

  translate(80, 0, 0); //joint offset adjusting!
  rotateZ(leftElbowZ);
  rotateY(leftElbowY);
  translate(-80, 0, 0);

  fill(245, 228, 211);
  model(lowerArm);

  push();
  scale(0.6);
  translate(-250, 0, 0);

  model(hand);
  pop();

  pop();
  pop();

  pop();
}

function drawRightLeg() {
  push();
  fill(14, 43, 71);
  translate(-50, 210, 0);
  rotateX(PI);

  translate(0, 100, 0); //joint offset adjusting!
  rotateZ(rightHipZ);
  rotateX(rightHipX);
  translate(0, -100, 0);

  model(upperLeg);

  push();
  translate(0, -180, 0);

  translate(0, 80, 0); //joint offset adjusting!
  rotateZ(rightKneeZ);
  rotateX(rightKneeX);
  translate(0, -80, 0);

  model(lowerLeg);

  push();
  translate(0, -100, -30);
  scale(0.6);

  fill(200);
  model(foot);
  pop();

  pop();
  pop();
}

function drawLeftLeg() {
  push();
  fill(14, 43, 71);
  translate(50, 210, 0);
  rotateX(PI);

  translate(0, 100, 0); //joint offset adjusting!
  rotateZ(leftHipZ);
  rotateX(leftHipX);
  translate(0, -100, 0);

  model(upperLeg);

  push();
  translate(0, -180, 0);

  translate(0, 80, 0); //joint offset adjusting!
  rotateZ(leftKneeZ);
  rotateX(leftKneeX);
  translate(0, -80, 0);

  model(lowerLeg);

  push();
  translate(0, -100, -30);
  scale(0.6);

  fill(200);
  model(foot);
  pop();

  pop();
  pop();
}

function drawImage() {
  if (!music || !music.isPlaying()) return;

  let t = music.currentTime();

  push();
  resetMatrix();

  translate(0, 0, -700);
  noStroke();

  let spacing = width - 50;
  let speed = 70;
  tint(255, 100); //opacity adjusting ...

  for (let i = 0; i < Imgs.length; i++) {
    let x = (i * spacing - t * speed) % (spacing * Imgs.length);

    if (x < -spacing * 2) {
      x += spacing * Imgs.length;
    }

    push();
    translate(x - width, 30, 0);
    texture(Imgs[i]);
    plane(width / 1.5, height / 2);
    pop();
  }

  pop();
}

//got help from chatGPT
function drawLyrics() {
  if (!music || !music.isPlaying()) return;

  let t = music.currentTime();

  for (let s of subtitles) {
    if (t >= s.start && t < s.end) {
      let words = s.text.split(" "); //split the lyrics text!
      let duration = s.end - s.start;

      let progress = map(t, s.start, s.end, 0, words.length);
      let wordIndex = floor(progress);
      wordIndex = constrain(wordIndex, 0, words.length - 1);

      push();
      resetMatrix();

      textAlign(LEFT, TOP);
      textStyle(BOLD);
      textSize(50);
      textFont(font);

      let x = -width / 2 + 35;
      let y = -height / 2 + 35;

      let maxWidth = width - 200;

      let currentX = x;
      let currentY = y;
      let lineHeight = 55;

      //for words already shown
      for (let i = 0; i < wordIndex; i++) {
        let w = words[i];
        let wWidth = textWidth(w + " ");

        if (currentX + wWidth > x + maxWidth) {
          currentX = x;
          currentY += lineHeight;
        }

        fill(255);
        text(w, currentX, currentY);

        currentX += wWidth;
      }

      //for word newly coming out
      let currentWord = words[wordIndex];
      let wWidth = textWidth(currentWord + " ");

      if (currentX + wWidth > x + maxWidth) {
        currentX = x;
        currentY += lineHeight;
      }

      let wordStart = s.start + (duration / words.length) * wordIndex;
      let fade = map(t, wordStart, wordStart + 0.25, 0, 255);
      fade = constrain(fade, 0, 255);

      fill(255, fade); //fade in effect!
      text(currentWord, currentX, currentY);

      pop();
      break;
    }
  }
}

function mousePressed() {
  if (music && !music.isPlaying()) {
    music.play();
    currentDancePose = null;
    nextDancePose = null;
    lastChangeTime = 0;
  }
}
