function add2List(value, ulNode) {
  console.log('将', value, '拼接成li | ', 'append到', ulNode);
  var newLi = ulNode._$create('li');
  var innerHTML = '<div class="view"><input class="toggle" type="checkbox"><label>' + value + '</label><button class="destroy"></button></div><input class="edit" value="' + value + '">';
  newLi.innerHTML = innerHTML;
  ulNode._$insert(newLi);
}

NEJ.define([
  'util/chain/chainable',
  'base/element'
], function($, _e) {
  $('#todo-input')._$addEvent('keyup', function(_event) {
    // var val = _event.target.value;
    var val = $(this)._$val();
    if(_event.keyCode === 13) {
      // 提交到list
      add2List(val, $('#todo-list'))
    }
  })
});