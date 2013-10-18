'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#createButton').click(clickCreateSeats);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickCreateSeats(){
  var section = $('#section').val();
  var amount = $('#amount').val();
  var cost = $('#cost').val();
  htmlCreateSeats(section, amount, cost);
}




// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlCreateSeats(section, amount, cost){
  var $section = $(section);
  cost = formatCurrency(cost);
  console.log(cost);
  amount = parseInt(amount, 10);
  var $div = $('<div>').addClass('seat');
  $section.data('cost', cost);
  for(var i = 0; i < amount; i++){
    $section.append($div.clone());
  }
}



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function formatCurrency(number){
  number = number.replace('$', '');
  number = parseFloat(number);
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}
