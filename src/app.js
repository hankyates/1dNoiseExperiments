var Noise = require('./noise');
var partial = require('lodash/function/partial');
var compose = require('lodash/function/compose');
var times = require('lodash/utility/times');
var Chart = require('chart.js');

function init(size){
  var n = Noise.createNoise(size);

  var data = {
    labels: times(size),
    datasets: [
      {
        label: "Initial Noise",
        fillColor: "rgba(223,223,223, 1)",
        data: n.p
      },
      {
        label: "Normalized Data",
        fillColor: "rgba(0,127,127, 0.3)",
        data: n.commit(
        n.smooth

        )
      }
    ]
  };

  var ctx = document.getElementById('myChart').getContext('2d');
  var myNewChart = new Chart(ctx).Line(data, {
    animation: false,
    bezierCurve : false,
    datasetStrokeWidth : 1,
    scaleGridLineWidth : 1
  });

  return {
    n: n,
  };
}

window.init = init;
document.addEventListener("DOMContentLoaded", function(event) { 
  window.n = init(100);
});
