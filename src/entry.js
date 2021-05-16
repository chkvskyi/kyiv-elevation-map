/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import { OrbitControls } from './OrbitControls';
import SeedScene from './objects/Scene.js';

let scene = new Scene();
let camera = new PerspectiveCamera();
let renderer = new WebGLRenderer({antialias: true});
let seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(-350,650,0);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xdddddd, 1);

// render loop
let onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
let windowResizeHanlder = () => { 
  let { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

let controls = new OrbitControls(camera, renderer.domElement);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );
