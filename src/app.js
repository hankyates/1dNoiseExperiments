var Noise = require('./noise');
var partial = require('lodash/function/partial');
var compose = require('lodash/function/compose');
var times = require('lodash/utility/times');


function lineMaker(length, n, color) {
  var geometry = new THREE.Geometry();
  var material = new THREE.LineBasicMaterial({ color: color });
  for (var i = 0; i < length; i++) {
    geometry.vertices.push(new THREE.Vector3((i*5-300), n(i)/2, -150));
  }
  var line = new THREE.Line( geometry, material );
  return line;
}

function adder(funcs, x) {
  var total = 0;
  for (var i = 1; i <= funcs.length; i++) {
    var frequency = Math.pow(1, i);
    var amplitude = Math.pow(0.5, i);
    total += funcs[i-1](x * frequency) * amplitude;
  }
  return total;
}

function initScene(size){
  var n = Noise.createNoise(size, 100);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

  var scene = new THREE.Scene();
  var light = new THREE.PointLight( 0xFFFF00 );

  var sin = x => Math.sin(x)*100;

  var makeLine = partial(lineMaker, size);
  var added = partial(adder, [sin, n.noise]);
  var lines = [
    makeLine(n.noise, 0xFF0000),
    makeLine(added, 0xFFFFFF),
    makeLine(n.normalized, 0x0000FF),
    //makeLine(sin, 0xFFFF00),
    //makeLine(n.smooth, 0x00FF00)
  ];

  lines.forEach(function(l) { scene.add(l) });

  scene.add(light);
  light.position.set( 10, 0, 10 );
  camera.position.set(0, 0, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 100));
  renderer.setClearColor( 0x000000, 1);
  renderer.render( scene, camera );

  return {
    n: n,
  };
}

document.addEventListener("DOMContentLoaded", function(event) { 
  window.n = initScene(100);
});
