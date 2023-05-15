var k, x, y, dx, dy, dxr, dyr, d, d_min;
var matrix_point = [];
var centroids = [];
var clusters = [];
var sum = [];
var sum2 = [];
var temp = [];
var count_point = 0;
var colors_print;
var count;
var cluster_point;
var min_dist;
var max_x = -1;
var max_y = -1;


const canvas = document.getElementById('myCanvas'); // создание доски canvas
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#FFF8DC';
ctx.fillRect(0, 0, canvas.width, canvas.height);

document.addEventListener('click', function (clear) { //старт алгоритма
  if (clear.target.id == "clear_canvas") {
    ctx.fillStyle = '#FFF8DC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    clusters.length = 0;
    sum.length = 0;
    matrix_point.length = 0;
    centroids.length = 0;
    k = 0;
    x = 0;
    y = 0;
    max_x = -1;
    max_y = -1;
    count = 0;
    count_point = 0;
  }
});

canvas.onmousedown = function(){ // принятие точек, на которые нажимает пользователь
  x = event.offsetX;
  y = event.offsetY;
  if (x > max_x)
  {
    max_x = x;
  }
  if (y > max_y)
  {
    max_y = y;
  }
  ctx.fillStyle = "green";
  ctx.fillRect(x, y, 10, 10);
  matrix_point.push([x, y]);
  count_point = count_point + 1;
}

function distance(a, b) { // дистанция между двумя точками
  let dist = 0.0;
  for (let i = 0; i < a.length; i++) {
    dist += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(dist);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max); // функция для рандомного числа
}


document.addEventListener('click', function (start) { //старт алгоритма
  if (start.target.id == "start_alg") {
    document.getElementById("start_alg").disabled = true;


    k = document.getElementById("size").value;

    if (k <= count_point) {

      while (count != k) {
        count = 0;
        centroids.length = 0;
        clusters.length = 0;
        sum.length = 0;


        for (let i = 0; i < k; i++) {
          // var point_x = getRandomInt(501);
          // var point_y = getRandomInt(501);

          centroids.push([getRandomInt(max_x), getRandomInt(max_y)]);

        }

        for (let j = 0; j < k; j++) {
          clusters.push([]);
        }

        var max_iters = 300;
        for (let iter = 0; iter < max_iters; iter++) {  // создадим k пустых кластеров

          for (let i = 0; i < matrix_point.length; i++) { // присвоим каждому центроиду ближайшую точку
            min_dist = 3000;
            cluster_point = 0;
            for (let j = 0; j < k; j++) {
              var dist = distance(matrix_point[i], centroids[j]);
              if (dist < min_dist) {
                min_dist = dist;
                cluster_point = j;
              }
            }
            clusters[cluster_point].push(matrix_point[i]);
          }




          for (let j = 0; j < k; j++) { // вторая итерация алгоритма
            if (clusters[j].length > 0) {
              sum = new Array(clusters[j][0].length).fill(0.0);
              for (let i = 0; i < clusters[j].length; i++) {
                for (let d = 0; d < clusters[j][i].length; d++) {
                  sum[d] += clusters[j][i][d];
                }
              }
              for (let d = 0; d < sum.length; d++) {
                centroids[j][d] = sum[d] / clusters[j].length;
              }
            }
          }





        }

        clusters.length = 0;
        for (let j = 0; j < k; j++) {
          clusters.push([]);
        }

        for (let v = 0; v < matrix_point.length; v++) { // присвоим каждому центроиду ближайшую точку
          min_dist = 3000;
          cluster_point = 0;
          for (let c = 0; c < k; c++) {
            var dist = distance(matrix_point[v], centroids[c]);
            if (dist < min_dist) {
              min_dist = dist;
              cluster_point = c;
            }
          }
          clusters[cluster_point].push(matrix_point[v]);
        }

        for (let i = 0; i < k; i++)
        {
          if (clusters[i].length > 0)
          {
            count = count + 1;
          }
        }

      }
      function get_rand_color()
      {
        var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
        while(color.length < 6) {
          color = "0" + color;
        }
        return "#" + color;
      }

      for (let j = 0; j < k; j++) {
        x = centroids[j][0];
        y = centroids[j][1];
        colors_print = get_rand_color();
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, 12, 12);
        for (let i = 0; i < clusters[j].length; i++) {
          x = clusters[j][i][0];
          y = clusters[j][i][1];
          ctx.fillStyle = colors_print;
          ctx.fillRect(x, y, 10, 10);
        }
      }

    }

    else {
      alert("Количество точек должно быть больше или равно количеству кластеров.")
    }
    document.getElementById("start_alg").disabled = false;
  }
});

document.addEventListener('click', function (start) { //старт алгоритма
  if (start.target.id == "start_alg") {
    document.getElementById("start_alg").disabled = true;


    k = document.getElementById("size").value;

    if (k <= count_point) {

      while (count != k) {
        count = 0;
        centroids.length = 0;
        clusters.length = 0;
        sum.length = 0;


        for (let i = 0; i < k; i++) {
          // var point_x = getRandomInt(501);
          // var point_y = getRandomInt(501);

          centroids.push([getRandomInt(max_x), getRandomInt(max_y)]);

        }

        for (let j = 0; j < k; j++) {
          clusters.push([]);
        }

        var max_iters = 300;
        for (let iter = 0; iter < max_iters; iter++) {  // создадим k пустых кластеров

          for (let i = 0; i < matrix_point.length; i++) { // присвоим каждому центроиду ближайшую точку
            min_dist = 3000;
            cluster_point = 0;
            for (let j = 0; j < k; j++) {
              var dist = distance(matrix_point[i], centroids[j]);
              if (dist < min_dist) {
                min_dist = dist;
                cluster_point = j;
              }
            }
            clusters[cluster_point].push(matrix_point[i]);
          }




          for (let j = 0; j < k; j++) { // вторая итерация алгоритма
            if (clusters[j].length > 0) {
              sum = new Array(clusters[j][0].length).fill(0.0);
              for (let i = 0; i < clusters[j].length; i++) {
                for (let d = 0; d < clusters[j][i].length; d++) {
                  sum[d] += clusters[j][i][d];
                }
              }
              for (let d = 0; d < sum.length; d++) {
                centroids[j][d] = sum[d] / clusters[j].length;
              }
            }
          }





        }

        clusters.length = 0;
        for (let j = 0; j < k; j++) {
          clusters.push([]);
        }

        for (let v = 0; v < matrix_point.length; v++) { // присвоим каждому центроиду ближайшую точку
          min_dist = 3000;
          cluster_point = 0;
          for (let c = 0; c < k; c++) {
            var dist = distance(matrix_point[v], centroids[c]);
            if (dist < min_dist) {
              min_dist = dist;
              cluster_point = c;
            }
          }
          clusters[cluster_point].push(matrix_point[v]);
        }

        for (let i = 0; i < k; i++)
        {
          if (clusters[i].length > 0)
          {
            count = count + 1;
          }
        }

      }
      function get_rand_color()
      {
        var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
        while(color.length < 6) {
          color = "0" + color;
        }
        return "#" + color;
      }

      for (let j = 0; j < k; j++) {
        x = centroids[j][0];
        y = centroids[j][1];
        colors_print = get_rand_color();
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, 12, 12);
        for (let i = 0; i < clusters[j].length; i++) {
          x = clusters[j][i][0];
          y = clusters[j][i][1];
          ctx.fillStyle = colors_print;
          ctx.fillRect(x, y, 10, 10);
        }
      }

    }

    else {
      alert("Количество точек должно быть больше или равно количеству кластеров.")
    }
    document.getElementById("start_alg").disabled = false;
  }
});



