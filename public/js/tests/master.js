'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('seat generation', function(){
  expect(4);
  debugger;
  $('#section').val('#genAdmission');
  $('#amount').val('30');
  $('#cost').val('$50');
  $('#createButton').trigger('click');
  $('#section').val('#vip');
  $('#amount').val('15');
  $('#cost').val('$110');
  $('#createButton').trigger('click');

  deepEqual($('#vip div').length, 15, 'there are 15 vip seats');
  deepEqual($('#vip').data('cost'), '$110', 'vip seats are $110');
  deepEqual($('#genAdmission div').length, 30, 'there are 30 genAdmission seats');
  deepEqual($('#genAdmission').data('cost'), '$50', 'genAdmission seats are $110');
});
