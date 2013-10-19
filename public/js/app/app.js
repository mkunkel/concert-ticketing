'use strict';

$(document).ready(initialize);

var totals = {};
totals.vip = {};
totals.genAdmission = {};
totals.vip.people = 0;
totals.vip.cost = 0;
totals.genAdmission.people = 0;
totals.genAdmission.cost = 0;


function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createButton').click(clickCreateSeats);
  $('#vip').on('dblclick', 'div', dblClickVip);
  $('#genAdmission').on('dblclick', 'div', dblClickGenAdmission);
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
  $('#name').focus();
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
  cost = parseFloat(cost);
  amount = parseInt(amount, 10);
  var $div = $('<div>').addClass('seat');
  var $span = $('<span>').addClass('seatNum');
  $section.data('cost', cost);
  var prefix = section === '#vip' ? 'V' : 'G';
  for(var i = 0; i < amount; i++){
    var $seat = $div.clone();
    var $id = $span.clone().addClass('seatNum').text(prefix + (i + 1));
    $seat.append($id);
    $section.append($seat);
  }
  for(i = 0; i < $('select option').length; i++) {
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
  // debugger;
  var reserved = $seat.hasClass('reserved');
  var section = $seat.parent().attr('id');
  var name = $('#name').val();

  if (!reserved) {
    totals[section].people++;
    totals[section].cost += $seat.parent().data('cost');
    $seat.addClass('reserved').prepend($('<span>').addClass('resName').text(name));
    htmlUpdateTotals(section);
  }
}

function htmlUpdateTotals(section) {
  $('#vipTotal').text(formatCurrency(totals.vip.cost));
  $('#genAdmissionTotal').text(formatCurrency(totals.genAdmission.cost));
  var cost = totals.vip.cost + totals.genAdmission.cost;
  $('#grandTotal').text(formatCurrency(cost));
  $('#vipPeople').text(totals.vip.people);
  $('#gaPeople').text(totals.genAdmission.people);
  var people = totals.vip.people + totals.genAdmission.people;
  $('#totalPeople').text(people);

  // update people list
  // _.map($('#vip .reserved'), function(seat){ return seat * 3; });

  $('#' + section + 'List .peopleList').empty();
  for (var i = 0; i < $('#' + section + ' .reserved').length; i++) {
    var string;
    string = $($('#' + section + ' .reserved')[i]).children('.seatNum').text();
    string += ' - ';
    string += $($('#' + section + ' .reserved')[i]).children('.resName').text();

    var $div = $('<div>').text(string);
    $('#' + section + 'List .peopleList').append($div);
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
  // number = number.replace('$', '');
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
