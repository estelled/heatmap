// var data = [
//   '2018-08-10'= 10,
// ];

// drawGraph(data);

drawGraph();

/* 
x= Id, y=color.  
y=0 : very clear    y=1 : clear   y=2 : normal    y=3 : dark  
*/
var idTable = [['1','0'],['15','0'],['45','1'],['76','2'],['77','3'],['79','2'],['147','2'],['200','3']];
var colorTable = ['#BBE3F4','#82C9EB','#039BE5','#0A25B1'];
show_activity(idTable,colorTable);

function show_activity(idTable,colorTable) {
  var length = idTable.length;
    for (i=0; i<length; i++) {
      var circle = document.getElementById(idTable[i][0]);
      circle.style.backgroundColor = colorTable[idTable[i][1]];
  }
}


function drawGraph() {

  var c = document.getElementById('canvas');

  numRow = 7;
  numCol = Math.floor(365 / numRow);
  for (i=0; i<numRow; i++) {
      // Create  row to receive the circles
      var row = document.createElement('div');
      row.className +=  'row';
      c.appendChild(row);
      for (j=0; j<numCol; j++) {
          // Add tooltiped_circles to the row
          var elements = create_tooltiped_circle();
          var tooltip = elements[0];
          var circle = elements [1]
          circle.setAttribute('id', i * numCol + j);
          row.appendChild(tooltip);
      }
  }
}



function filter_name() {
document.getElementById("annotator").innerHTML = "Arnaud Rachez";
}
   
//returns circle
/*
<div class="tooltip">
<div class= "circle" style="margin-left:100px;"></div>
<span class="tooltipText">4 contributions on Jul 24, 2018</span>  
</div>
*/
function create_tooltiped_circle() {
  var tooltip = document.createElement('div');
  tooltip.className += 'tooltip';
  var circle = document.createElement('div');
  circle.className += 'circle';
  tooltip.appendChild(circle);
  var tooltipText = document.createElement('span');
  tooltipText.className += 'tooltipText';
  tooltipText.innerHTML = "4 contributions on Jul 24, 2018";
  tooltip.appendChild(tooltipText);
  return [tooltip, circle];
}