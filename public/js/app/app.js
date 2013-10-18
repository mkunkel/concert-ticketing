'use strict';

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createButton').click(clickCreateSeats);
  $('#vip').on('click', 'div', dblClickVip);
  $('#genAdmission').on('click', 'div', dblClickGenAdmission);
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

function dblClickVip() {
  htmlReserveSeat($(this));
}

function dblClickGenAdmission() {
  htmlReserveSeat($(this));
  $('#name').focus();
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
  var $span = $('<span>').addClass('seatNum');
  $section.data('cost', cost);
  var prefix = section === '#vip' ? 'V' : 'G';
  for(var i = 0; i < amount; i++){
    var $seat = $div.clone();
    var $id = $span.clone().text(prefix + (i + 1));
    $seat.append($id);
    $section.append($seat);
  }
  for(var i = 0; i < $('select option').length; i++) {
    if ($($('select option')[i]).val() === section) {
      $($('select option')[i]).remove();
    }
  }
  if ($('select option').length === 1) {
    $('.createSeats').remove();
    $('#name').focus();
  }
}

function htmlReserveSeat($seat) {
  var reserved = $seat.hasClass('reserved');

  if (!reserved) {
    $seat.addClass('reserved').prepend($('#name').val());
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
