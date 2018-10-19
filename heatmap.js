/* input : Table with contributions > 0. remove all input where contributions = 0 */
var inputTable = [['2019-08-03', '86'], ['2015-06-04', '99'], ['2018-06-12', '24'], ['2018-08-01', '8'], ['2019-02-24', '35'], ['2019-07-24', '2'], ['2018-12-24', '34'], ['2019-07-31', '18']]
var colorTable = ['#BBE3F4', '#82C9EB', '#039BE5', '#0A25B1'];
var startDate = '2019-03-02';

var contTable = yearClean(inputTable, startDate);
showMonth(startDate);
drawGraph(startDate);
showActivity(contTable, colorTable, startDate);
showInfo(contTable, startDate);

function showMonth(startDate) {
  var monthTable = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var startDate =  new Date(startDate);
  var startMonth = startDate.getMonth(); //1-12
  var monthRow = document.getElementsByClassName("month-row");
    for (i=0; i<12; i++){
      var mIndex = (startMonth+i) % 12;
      var month = document.createElement('span');
      month.innerHTML = monthTable[mIndex];
      monthRow[0].appendChild(month); //index needed because class and not id
  } 
}

// a year has 366 days every 4 year. bissextile function no enough, had to check if february in the year, getting messy.
function calcYearDays(startDate) {
  var startDate = new Date(startDate);
  var day = startDate.getDate();
  var month = startDate.getMonth();
  var year = startDate.getFullYear() + 1;
  var endDate = new Date(year, month, day);

  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var days = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / (oneDay)));

  return days;
}

//returns contTable with only the data regarding the ongoing year.
function yearClean(inputTable, startDate) {
  var contTable = inputTable.slice(0); //copy of input
  var length = inputTable.length;
  var endDate = new Date(startDate);
  var daysInYear = calcYearDays(startDate);
  endDate.setDate(endDate.getDate() + daysInYear); //change later with exact year days number
  var startDate = new Date(startDate);
  //reverse loop to not mess up the index after splice
  for (i = length - 1; i >= 0; i--) {
    tempDate = new Date(inputTable[i][0]);
    tempId = inputTable[i][1];
    if (tempDate < startDate || tempDate > endDate) {
      contTable.splice(i, 1);
    } else { }
  }

  return contTable;
}

function id2date(startDate, id) {
  var result = new Date(startDate);
  result.setDate(result.getDate() + id);
  return result;
}

function date2id(contDate, startDate) {
  var startDate = new Date(startDate);
  var contDate = new Date(contDate);
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var id = Math.round(Math.abs((startDate.getTime() - contDate.getTime()) / (oneDay)));
  return id;
}

function toValue(contNumber, contMax) {
  if (contNumber == 0 || contMax == 0) {
    return null;
  }
  var ratio = contNumber / contMax * 100;
  if (ratio <= 25) {
    return 0;
  } else if (ratio <= 50) {
    return 1;
  } else if (ratio <= 75) {
    return 2;
  } else {
    return 3;
  }

}

function findMax(contTable) {
  var length = contTable.length;
  var max = 0;
  for (i = 0; i < length; i++) {
    temp = contTable[i][1];
    max = Math.max(temp, max);
  }
  return max
}

function showActivity(contTable, colorTable, startDate) {
  var length = contTable.length;
  var contMax = findMax(contTable);
  for (i = 0; i < length; i++) {
    var id = date2id(contTable[i][0], startDate);
    var value = toValue(contTable[i][1], contMax);
    var circle = document.getElementById(id);
    circle.style.backgroundColor = colorTable[value];
  }
}

function showInfo(contTable, startDate) {
  var length = contTable.length;
  for (i = 0; i < length; i++) {
    var id = date2id(contTable[i][0], startDate);
    var idText = id + 1000; //to make it different from circle
    var date = new Date(contTable[i][0]);
    var number = contTable[i][1];
    var text = document.getElementById(idText);
    text.innerHTML = "";
    text.innerHTML = number + " contributions" + " on " + date.toDateString();
  }
}


function drawGraph(startDate) {

  var c = document.getElementById('canvas');
  var daysInYear = calcYearDays(startDate);
  numRow = 7; //number of days in a week
  numCol = Math.floor(daysInYear / numRow);
  lastRow = daysInYear - (numRow * numCol);
  id = 0;
  if (lastRow > 0) {
    numCol += 1;
  }
  for (i = 0; i < numCol; i++) {
    var col = document.createElement('div');
    col.className += 'col';
    c.appendChild(col);
    if (i == numCol - 1) {
      numRow = lastRow;
    }
    for (j = 0; j < numRow; j++) {
      var elements = createTooltipedCircle();
      var tooltip = elements[0];
      var circle = elements[1];
      var text = elements[2];
      var id = i * 7 + j; //fix numRow number so that circles in the last column have the proper id
      circle.setAttribute('id', id);
      text.setAttribute('id', id + 1000);
      col.appendChild(tooltip);
      // show default message 
      var date = id2date(startDate, id);
      text.innerHTML = "no contributions on " + date.toDateString();
    }
  }
}//drawGraph()

function createTooltipedCircle() {
  var tooltip = document.createElement('div');
  tooltip.className += 'tooltip';
  var circle = document.createElement('div');
  circle.className += 'circle';
  tooltip.appendChild(circle);
  var tooltipText = document.createElement('span');
  tooltipText.className += 'tooltipText';
  tooltip.appendChild(tooltipText);
  return [tooltip, circle, tooltipText];
}