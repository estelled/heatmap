/* input : Table with contributions > 0. remove all input where contributions = 0 */
var contTable = [['2018-09-24','8'],['2018-06-12','24'],['2018-02-24','35'],['2018-07-24','2'],['2018-12-24','34'],['2018-06-14','18']]
/* 
x= Id, y=color.  
y=0 : very clear    y=1 : clear   y=2 : normal    y=3 : dark  
*/
var colorTable = ['#BBE3F4','#82C9EB','#039BE5','#0A25B1'];

drawGraph(contTable);
show_activity(contTable,colorTable);
show_info(contTable);


function toId(contDate) {
  var startMonth = 08 ;
  var date = new Date(contDate);
  var month = date.getMonth()+1; //0->11 range to 1->12 
  // fix needed later : deal with 28 & 30 & 31 month difference . Deal with year transition.
  var id = date.getDate();
  var temp = month-startMonth
  if (temp >=0) {
    id += temp*30;
  } else {
    id += (12-startMonth+month)*30;
  }
  return id;
}


function toValue(contNumber,contMax) {
  if (contNumber==0 || contMax==0){
    return null;
  }
  var ratio = contNumber/contMax*100;
  if (ratio <= 25){
    return 0;
  } else if (ratio <= 50){
    return 1;
  } else if (ratio <= 75){
    return 2;
  } else {
    return 3;
  }
  
}

function findMax(contTable) {
  var length = contTable.length;
  var max = 0;
  for (i=0; i<length; i++) {
    temp = contTable[i][1];
    max = Math.max(temp,max) ;
  }
  return max
}

function show_activity(contTable,colorTable) {
  var length = contTable.length;
  var contMax = findMax(contTable);
    for (i=0; i<length; i++) {
      var id = toId(contTable[i][0]);
      var value = toValue(contTable[i][1],contMax);
      var circle = document.getElementById(id);
      circle.style.backgroundColor = colorTable[value];
  }
}

/** show date even on no contributions */
function show_info(contTable){
  var length = contTable.length;
  for (i=0; i<length; i++) {
    var id = toId(contTable[i][0]);
    var idText = id + 1000; //to make it different from cicle
    var date = new Date(contTable[i][0]);
    var number = contTable[i][1] ;
    var text = document.getElementById(idText);
    text.innerHTML = "";
    text.innerHTML = number+" contributions"+" on "+ date.toDateString();
  }
}


/**change id to fit with the id of contTable */
function drawGraph(contTable) {

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
          var circle = elements[1];
          var text = elements[2];
          circle.setAttribute('id', i * numCol + j);
          text.setAttribute('id', i * numCol + j +1000);  
          row.appendChild(tooltip);
          // show default message 
          text.innerHTML = "no contributions";
      }
  }
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
  //tooltipText.innerHTML = "4 contributions on Jul 24, 2018";
  tooltip.appendChild(tooltipText);
  return [tooltip, circle,tooltipText];
}