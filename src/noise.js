var times = require('lodash/utility/times');
var random = require('lodash/number/random');
var partial = require('lodash/function/partial');
var math = require('./utils/math');

function seed(size) {
  return times(size*2, partial(random, 0, size, false));
}

function noise(p, x) {
  return p[~~x];
}

function smooth(n, x) {
  return ~~((n(x)/2) + (n(x-1)/4) + (n(x+1)/4));
}

function interpolatedNoise(n, interpolate, x) {
  var v0 = n(x - 1);
  var v1 = n(x + 1);
  return interpolate(v0, v1, random(0, 1, true));
}

function lerpNoise(n, x) {
  return interpolatedNoise(n, math.lerp, x);
}

function cosNoise(n, x) {
  return interpolatedNoise(n, math.cosInterpolate, x);
}

function Noise(size) {
  this.p = seed(size);
  this.noise = partial(noise, this.p);
  this.smooth = partial(smooth, this.noise);
  this.normalized = partial(cosNoise, this.smooth);
  this.commit = partial(times, size);
}

module.exports = {
  createNoise: function(size) {
    return new Noise(size);
  },
  seed: seed,
  noise: noise,
  smooth: smooth,
  interpolatedNoise: interpolatedNoise,
  lerpNoise,
  cosNoise
};
