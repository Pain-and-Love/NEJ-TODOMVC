NEJ.define([
  'util/chain/chainable',
  'base/element',
  'base/util'
], function($, _e, _u) {
  var todoList = [];
  var listType = 'all';

  function render() {
    //  根据type和list来渲染列表
    var ulInnerHTML = '';
    _u._$forEach(todoList, function(_item, _index) {
      ulInnerHTML += '<li data-index=' + _index + '>' +
        '<div class="view">' +
        '<input class="toggle" type="checkbox">' +
        '<label>' + _item.value + '</label>' +
        '<button class="destroy"></button>' +
        '</div>' +
        '<input class="edit" value="' + _item.value + '">' +
        '</li>';
    });
    renderFooter();
    $('#todo-list')._$html(ulInnerHTML);
  }

  function renderFooter() {
    $('#footer')._$style('display', todoList.length ? 'block' : 'none');
  }

  // 增加
  function addItem(value) {
    todoList.push({
      id: Math.random(),
      value: value,
      isEditing: false,
      isCompleted: false
    });
    render();
  }

  // 删除
  function removeItem(index) {
    todoList.splice(index, 1);
    render();
    // _e._$remove(liNode, false);
  }

  $('#todo-list')._$addEvent('click', function(_event) {
    var _$dom = $(_event.target);
    var _$li = _$dom._$parent('li');
    switch(_$dom._$attr('class')) {
      case 'destroy':
        removeItem(_$li._$dataset('index'));
        break;
    }
  })
  $('#todo-input')._$addEvent('keyup', function(_event) {
    var val = $(this)._$val().trim();
    if(_event.keyCode === 13 && val) {
      addItem(val);
      $(this)._$val('');
    }
  })
});
