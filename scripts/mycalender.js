var week1 = [];
var week2 = [];
var week3 = [];
var week4 = [];
var week5 = [];
var week6 = [];
var year = 0;
var month = 0;

$(document).ready(function(){
  setDate();
});

function setDate(){
  cleanCalender();

  year = $('#optYear').val();
  month = $('#optMonth').val();

  $('#calenderYear').text(year);
  $('#calenderMonth').text($("#optMonth option:selected").text());

  getFirstWeek(year, month);
  setOtherWeeks(year, month);
  setDaysInCalender();
}

function getFirstWeek(year, month){
  var firstDate = year + '-' + month + '-1';
  var firstDay = moment(firstDate, 'YYYY-MM-DD').format('d'); //3 - we

  var day = 0;
  var firstDaySet = false;
  for(var i = 0; i <= 6; i++){
    if(i < firstDay){
      week1.push('');
    }else{
      week1.push(++day);
    }
  }
}

function setOtherWeeks(year, month){
  var daysInMonth = moment(year + '-' + month, "YYYY-MM").daysInMonth();
  var needWeek6 = false;

  var endOfWeek1 = week1[6];
  var day = endOfWeek1;

  //Set 2nd weeks' days
  for(var i = 0; i <= 6; i++){
    week2.push(++day);
  }

  //Set 3rd weeks' days
  for(var i = 0; i <= 6; i++){
    week3.push(++day);
  }

  //Set 4th weeks' days
  for(var i = 0; i <= 6; i++){
    week4.push(++day);
  }

  var lastDayOfWeek5 = 0;

  //Set 5th weeks' days
  for(var i = 0; i <= 6; i++){
    if(day < daysInMonth){
      week5.push(++day);
    }
  }
  lastDayOfWeek5 = week5[week5.length - 1];

  //Fill 5th week
  var week5FillCount = 7 - week5.length;
  if(week5.length < 7){
    for(var i = 0; i < week5FillCount; i++){
      week5.push("");
    }
  }

  //Check if week 6 is required
  //Populate week6 if needed
  if(daysInMonth > lastDayOfWeek5){
    //Set 6th weeks' days
    for(var i = 0; i <= 6; i++){
      if(day < daysInMonth){
        week6.push(++day);
      }
    }

    //Fill 6th week
    var week6FillCount = 7 - week6.length;
    if(week6.length < 7){
      for(var i = 0; i < week6FillCount; i++){
        week6.push("");
      }
    }
  }
}

function setDaysInCalender(){
  //Merge week to build month array
  var month = week1.concat(week2);
  month = month.concat(week3);
  month = month.concat(week4);
  month = month.concat(week5);
  month = month.concat(week6);

  for(var i = 0; i < 42; i++){
    $('#box-' + i).text('');
    $('#box-' + i).text(month[i]);
  }
}

function cleanCalender(){
  week1 = [];
  week2 = [];
  week3 = [];
  week4 = [];
  week5 = [];
  week6 = [];
}

function goToPreviousMonth(){
  cleanCalender();

  var momentPreviousMonth = moment(year + '-' + month, 'YYYY-MM').subtract(1, 'months');

  year = momentPreviousMonth.format('YYYY');
  month = momentPreviousMonth.format('M');

  $('#calenderYear').text(year);
  $('#calenderMonth').text(momentPreviousMonth.format('MMMM'));

  getFirstWeek(year, month);
  setOtherWeeks(year, month);
  setDaysInCalender();
}

function goToNextMonth(){
  cleanCalender();

  var momentNextMonth = moment(year + '-' + month, 'YYYY-MM').add(1, 'months');

  year = momentNextMonth.format('YYYY');
  month = momentNextMonth.format('M');

  $('#calenderYear').text(year);
  $('#calenderMonth').text(momentNextMonth.format('MMMM'));

  getFirstWeek(year, month);
  setOtherWeeks(year, month);
  setDaysInCalender();
}