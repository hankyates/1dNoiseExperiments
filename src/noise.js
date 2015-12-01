var times = require('lodash/utility/times');
var random = require('lodash/number/random');
var partial = require('lodash/function/partial');
var math = require('./utils/math');

function seed(size, l) {
  var limit = l ? l : size;
  return times(size*2, partial(random, -limit, limit, false));
}

function noise(p, x) {
  var value = math.isInt(x) ? p[x] :
    math.lerp(p[~~x], p[(~~x)+1], x%1);
  return value;
}

function smooth(n, x) {
  return (n(x)/2) + (n(x-1)/4) + (n(x+1)/4);
}

function interpolatedNoise(n, interpolate, x) {
  var v0 = n(x);
  var v1 = n(x + 1);
  return interpolate(v0, v1, random(0, 1, true));
}

function lerpNoise(n, x) {
  return interpolatedNoise(n, math.lerp, x);
}

function cosNoise(n, x) {
  return interpolatedNoise(n, math.cosInterpolate, x);
}

function Noise(size, limit) {
  this.p = seed(size, limit);
  this.noise = partial(noise, this.p);
  this.smooth = partial(smooth, this.noise);
  this.normalized = partial(cosNoise, this.smooth);
  this.commit = partial(times, size);
}

module.exports = {
  createNoise: function(size, limit) {
    return new Noise(size, limit);
  },
  seed: seed,
  noise: noise,
  smooth: smooth,
  interpolatedNoise: interpolatedNoise,
  lerpNoise,
  cosNoise
};
