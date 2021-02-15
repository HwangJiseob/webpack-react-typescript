import * as THREE from 'three'
import * as POSTPROCESSING from "postprocessing"
import { PerspectiveCamera, Scene, WebGL1Renderer } from 'three';

import smoke from "./img/smoke.png"

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)

// const renderer = new THREE.WebGLRenderer({ antialias: true})
// renderer.setSize(window.innerWidth, window.innerHeight)
// const home = document.querySelector('#home')
// home?.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
// const cube = new THREE.Mesh( geometry, material)
// scene.add(cube)

// cube.position.z = -5;
// const animate = () => {
//   // cube.rotateX += 0.01
//   cube.rotation.x += 0.01;

//   renderer.render(scene, camera);
//   requestAnimationFrame( animate );
// }

// animate()



let scene:Scene 
let camera:PerspectiveCamera
let renderer:WebGL1Renderer
let cloudParticles:Array<THREE.Mesh> = []
let composer 

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y= -0.12;
  camera.rotation.z = 0.27;

  let ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight(0xff8c19);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
  orangeLight.position.set(200, 300, 100);
  scene.add(orangeLight);

  let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
  redLight.position.set(100, 300, 200);
  scene.add(redLight);

  let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
  blueLight.position.set(300, 300, 200);
  scene.add(blueLight);

  renderer = new THREE.WebGL1Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.fog = new THREE.FogExp2(0x03544e, 0.001);
  renderer.setClearColor(scene.fog.color);
  const home = document.querySelector('#home')
  home?.appendChild(renderer.domElement);

  let loader = new THREE.TextureLoader();
  loader.load(smoke, texture => {
    let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    let cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    })

    for(let p=0; p<50; p++){
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 500,
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  })

  // const bloomEffect = new POSTPROCESSING.BloomEffect({
  //   blendFunction: POSTPROCESSING.BlendFunction.OLOR_DODGE,
  //   kernerlSize: POSTPROCESSING.KernerSize.SMALL,
  //   useLuminanceFilter: true,
  //   luminanceThreshold: 0.3,
  //   luminanceSmoothing: 0.75
  // })
  // bloomEffect.blendMode.opacity.value = 1.5

  // let effectPass = new POSTPROCESSING.EffectPass(
  //   camera,
  //   bloomEffect
  // );
  // effectPass.renderToScreen = true;

  // composer = new POSTPROCESSING.EffectComposer(renderer)

  render()
}

function render () {
  cloudParticles.forEach(p => {
    p.rotation.z += -0.001;
  })
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

init()