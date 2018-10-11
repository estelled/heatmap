// var data = [
//   '2018-08-10'= 10,
// ];

// drawGraph(data);

drawGraph(45);

function show_activity() {
  var circle = document.getElementById('157');
  circle.style.backgroundColor = 'blue';
}


function drawGraph(activity_index) {

  var c = document.getElementById('canvas');

  numRow = 7;
  numCol = Math.floor(365 / numRow);
  for (i=0; i<numRow; i++) {
      // Create  row to receive the circles
      var row = document.createElement('div');
      row.className +=  'row';
      c.appendChild(row);
      for (j=0; j<numCol; j++) {
          // Add circles to the row
          var circle = document.createElement('div');
          circle.className += 'circle';
          circle.setAttribute('id', i * numCol + j);
          row.appendChild(circle);
      }
  }
}

function addRow(parentElem) {
  var div = document.createElement('div');
  parentElem.appendChild(div)
}


function filter_name() {
document.getElementById("annotator").innerHTML = "Arnaud Rachez";
}
   