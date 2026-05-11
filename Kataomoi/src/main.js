/*
Sogang Art&Technology 2026-1 Computer Graphics
20231035 M. Park

<Kataomoi>
~The necklace of a cat cherishing an unrequited crush~
Not even god can stop me!
BGM - Cherish (My Love) Inst. by Illit https://youtu.be/O73guBeqTu0?si=48cDB1tEXB666fNc

Mouse Drag to see new necklace launching show lighting.
All models from Free3D
*/

//npm install -g http-server
//http-server

import * as THREE from 'three';
import { MTLLoader } from 'https://unpkg.com/three@0.184.0/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://unpkg.com/three@0.184.0/examples/jsm/loaders/OBJLoader.js';

// Scene setup
const scene = new THREE.Scene();

// Background colors
const topBackgroundColor = new THREE.Color(0xf6ede3);
const bottomBackgroundColor = new THREE.Color(0xc9ddff);

// Light colors
const topLightColor = new THREE.Color(0xffd6df);
const bottomLightColor = new THREE.Color(0xc9ddff);

// Current interpolated(보간) colors
const currentBackgroundColor = topBackgroundColor.clone();
const currentLightColor = topLightColor.clone();

scene.background = currentBackgroundColor;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Material loader for models
const mtlLoader = new MTLLoader();

// Group for transformations!
const modelGroup = new THREE.Group();
scene.add(modelGroup);

// ---------------------------------------------------------------------------

// Pendant animation variables
let pendantObject = null;
const pendantBaseY = -0.8;

// ---------------------------------------------------------------------------

// Scale and move an object to a target position
function fitObjectAt(object, maxSize, position) {
  object.position.set(0, 0, 0);
  object.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);

  if (maxDimension > 0) {
    const scale = maxSize / maxDimension;
    object.scale.multiplyScalar(scale);
  }

  object.updateMatrixWorld(true);
  box.setFromObject(object);

  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);
  object.position.add(position);
}

// ---------------------------------------------------------------------------

// Pendant Model
mtlLoader.load('../11791_Pendant_l3.mtl', (materials) => {
  materials.preload();

  const pendantLoader = new OBJLoader();
  pendantLoader.setMaterials(materials);

  pendantLoader.load('../11791_Pendant_l3.obj', (object) => {
    object.scale.set(0.5, 0.5, 0.5);
    object.position.set(-1.2, pendantBaseY, 0.3);

    object.rotation.x = -Math.PI / 2;
    object.rotation.z = Math.PI * 0.025;

    object.traverse((child) => {
    if (child.isMesh) {
      const diffuseMap = child.material?.map ?? null;

      child.material = new THREE.MeshStandardMaterial({
        map: diffuseMap,
        color: 0xffffff,
        metalness: 0.7,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

    pendantObject = object;

    modelGroup.add(object);
  });
});

// ---------------------------------------------------------------------------

// Heart Box Model
const heartLoader = new OBJLoader();

heartLoader.load('../20793_Heart_Shaped_Box_V1_1.obj', (object) => {
  object.scale.set(1, 1, 1);
  object.position.set(-4, -4, -5);

  object.rotation.y = Math.PI * 0.2;
  object.rotation.x = -Math.PI * 0.225;

  object.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0xf4f4f4,
        roughness: 0.42,
        metalness: 0.1,
        side: THREE.FrontSide,
      });

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  modelGroup.add(object);
});

// ---------------------------------------------------------------------------

// Cat Model
const catLoader = new OBJLoader();

catLoader.load('../16436_Cat_v3.obj', (object) => {
  object.rotation.set(
    Math.PI / 3,
    Math.PI,
    Math.PI / 1.5
  );

  fitObjectAt(
    object,
    5.5,
    new THREE.Vector3(4, -2.5, 1)
  );

  object.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0x1f1f1f,
        metalness: 0.5,
        roughness: 0.5,
        side: THREE.DoubleSide,
      });

      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  modelGroup.add(object);

  // Crushcat
  const facingCat = object.clone(true);

  facingCat.position.set(-2.5, 3, 11);
  facingCat.rotation.copy(object.rotation);
  facingCat.rotation.z = object.rotation.z - Math.PI;

  facingCat.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.set(0x111111);
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  modelGroup.add(facingCat);
});

// ---------------------------------------------------------------------------

// Candy Models
mtlLoader.load('../12186_Candy_v1_L3.mtl', (materials) => {
  materials.preload();

  const candyLoader = new OBJLoader();
  candyLoader.setMaterials(materials);

  candyLoader.load('../12186_Candy_v1_L3.obj', (object) => {
    const candyPositions = [
      new THREE.Vector3(3.5, 10.5, 0.3),
      new THREE.Vector3(3.35, 8.5, -0.8),
      new THREE.Vector3(2, 8, 1),
    ];

    const candyRotationsZ = [
      Math.PI * 0.12,
      -Math.PI * 0.18,
      Math.PI * 0.28,
    ];

    const candyRotationsY = [
      Math.PI * 0.03,
      Math.PI * 0.04,
      Math.PI * 0.025,
    ];

    [...object.children].forEach((candy, index) => {
      const candyGroup = new THREE.Group();

      candyGroup.add(candy);

      candyGroup.rotation.set(
        -Math.PI / 2,
        candyRotationsY[index],
        candyRotationsZ[index]
      );

      fitObjectAt(
        candyGroup,
        0.75,
        candyPositions[index]
      );

      candyGroup.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

        if (child.material) {
          child.material.side = THREE.DoubleSide;
        }
      }
    });

      modelGroup.add(candyGroup);
    });
  });
});

// ---------------------------------------------------------------------------

// Scroll-controlled values

let targetCameraY = 11;
let targetRotationY = -Math.PI * 0.55;

const lookAtTarget = new THREE.Vector3(0, 0, 0);

window.addEventListener("wheel", (event) => {
  const delta = event.deltaY;

  targetCameraY -= delta * 0.01;

  targetCameraY = THREE.MathUtils.clamp(
    targetCameraY,
    0,
    11
  );

  targetRotationY += delta * 0.002;

  targetRotationY = THREE.MathUtils.clamp(
    targetRotationY,
    -Math.PI * 0.55,
    Math.PI * 0.05
  );

  updateAudioTarget();
});

// ---------------------------------------------------------------------------

// Audio setup
const cherishAudio = new Audio('../Cherish.mp3');
cherishAudio.loop = true;
cherishAudio.volume = 0;

let targetAudioVolume = 0;
let currentAudioVolume = 0;

// Update audio volume
function updateAudioTarget() {
  targetAudioVolume = 1 - (targetCameraY / 11);

  if (targetAudioVolume > 0.01 && cherishAudio.paused) {
    cherishAudio.play().catch(() => {});
  }
}

// ---------------------------------------------------------------------------

// Lights
const hemiLight = new THREE.HemisphereLight(
  0xffffff,
  0x444444,
  1.2
);

hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(
  0xffffff,
  1.5
);

dirLight.position.set(2, 20, 30);
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;

dirLight.shadow.camera.left = -20;
dirLight.shadow.camera.right = 20;
dirLight.shadow.camera.top = 20;
dirLight.shadow.camera.bottom = -20;

dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 80;

scene.add(dirLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.9);

scene.add(ambient);

// Pink pointlight
const pinkPointLight = new THREE.PointLight(0xffd6df, 0, 4, 2);

pinkPointLight.position.set(1, 0, 2);
pinkPointLight.castShadow = true;

modelGroup.add(pinkPointLight);

// Crush cat spotlight
const crushCatSpotLight = new THREE.SpotLight(0xc9ddff, 0);

crushCatSpotLight.position.set(-2.5, 3.0, 14);
crushCatSpotLight.target.position.set(-5, -3.75, -5); // toward the heart box!
crushCatSpotLight.angle = Math.PI * 0.07;
crushCatSpotLight.penumbra = 0.12;
crushCatSpotLight.intensity = 200;
crushCatSpotLight.decay = 2;
crushCatSpotLight.distance = 22;
crushCatSpotLight.castShadow = true;

scene.add(crushCatSpotLight);
scene.add(crushCatSpotLight.target);

// ---------------------------------------------------------------------------

// Initial camera and model state
camera.position.set(0, targetCameraY, 6);
camera.lookAt(lookAtTarget);

modelGroup.rotation.x = targetCameraY * 0.02;
modelGroup.rotation.y = targetRotationY;

// ---------------------------------------------------------------------------

function animate() {
  requestAnimationFrame(animate);

  // rotate model group on Y axis
  modelGroup.rotation.y = THREE.MathUtils.lerp(
    modelGroup.rotation.y,
    targetRotationY,
    0.08
  );

  // rotate model group on X axis
  modelGroup.rotation.x = THREE.MathUtils.lerp(
    modelGroup.rotation.x,
    targetCameraY * 0.02,
    0.02
  );

  // move camera vertically
  camera.position.y = THREE.MathUtils.lerp(
    camera.position.y,
    targetCameraY,
    0.08
  );

  camera.lookAt(lookAtTarget);

  // Scroll progress from top to bottom
  const t = 1 - (targetCameraY / 11);

  const bottomLightAmount = THREE.MathUtils.smoothstep(
    t,
    0.2,
    1.0
  );

  const pinkLightFlicker =
    0.4 +
    Math.abs(Math.sin(performance.now() * 0.001)) * 0.6;

  pinkPointLight.intensity =
    bottomLightAmount *
    pinkLightFlicker *
    50;

  targetAudioVolume = t;
  currentAudioVolume = THREE.MathUtils.lerp(
    currentAudioVolume,
    targetAudioVolume,
    0.06
  );

  cherishAudio.volume = THREE.MathUtils.clamp(
    currentAudioVolume,
    0,
    0.5
  );

  if (
    currentAudioVolume < 0.005 &&
    targetAudioVolume === 0 &&
    !cherishAudio.paused
  ) {
    cherishAudio.pause();
    cherishAudio.currentTime = 0;
  }

  // Pendant bobbing animation
  if (pendantObject) {
    const bottomAmount = THREE.MathUtils.smoothstep(
      t,
      0.75,
      0.95,
    );

    const bobbing =
      Math.sin(performance.now() * 0.003)
      * 0.06
      * bottomAmount;

    pendantObject.position.y = pendantBaseY + bobbing;
  }

  // Background color
  currentBackgroundColor.lerpColors(
    topBackgroundColor,
    bottomBackgroundColor,
    t
  );

  scene.background.copy(currentBackgroundColor);

  // Light color
  currentLightColor.lerpColors(
    topLightColor,
    bottomLightColor,
    t
  );

  hemiLight.color.copy(currentLightColor);
  dirLight.color.copy(currentLightColor);
  ambient.color.copy(currentLightColor);

  renderer.render(scene, camera);
}

window.addEventListener('resize', resize);

function resize() {
  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
}

// Start animation loop
animate();