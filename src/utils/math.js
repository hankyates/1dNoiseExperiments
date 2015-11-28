function lerp(v0, v1, t) {
  return (v0 * (1-t)) + (v1 * t);
}

function cosInterpolate(v0, v1, t) {
  var ft = t * Math.PI;
  var f = (1 - Math.cos(ft)) / 2;
  return lerp(v0, v1, f);
}

module.exports = {
  lerp: lerp,
  cosInterpolate: cosInterpolate,
  primes: function(num, beg) {
    //Sieve of Eratosthenes
    //https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
    if (num === 0 || num === 1) return [];
    var marked = [,,2];
    var primes = [];
    for (var p = 2; p <= num;) {
      primes.push(p);
      // Populate multiples for p
      for (var i = 2; i*p < num; i++) {
        marked[i*p] = i*p;
      }
      // Find next p
      marked.every(function(markedNumber, index) {
        if (!marked[index+1] && primes.indexOf(index+1) === -1) {
          p = index+1;
          return false;
        }
        return true;
      });
    }
    return primes;
  }
};
