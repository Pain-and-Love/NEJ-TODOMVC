NEJ.define([
  'util/chain/chainable',
  'base/element',
  'base/util'
], function($, _e, _u) {
  var todoList = [];
  var listType = 'all';
  var _$input = null;

  function render() {
    renderList();
    renderFooter();
  }

  function getItemClass(item) {
    return (item.isEditing ? 'editing' : '') + (item.isCompleted ? 'completed' : '');
  }

  function renderList() {
    //  根据type和list来渲染列表
    var ulInnerHTML = '';
    _u._$forEach(todoList, function(_item, _index) {
      ulInnerHTML += '<li class="' + getItemClass(_item) + '" data-index=' + _index + '>' +
        '<div class="view">' +
        '<input class="toggle" type="checkbox">' +
        '<label class="content">' + _item.value + '</label>' +
        '<button class="destroy"></button>' +
        '</div>' +
        '<input class="edit" value="' + _item.value + '">' +
        '</li>';
    });
    $('#todo-list')._$html(ulInnerHTML);
  }

  function renderFooter() {
    $('#num')._$text(todoList.length);
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
  }

  // 编辑
  function edit(index) {
    todoList[index].isEditing = true;
    render();
  }

  // 保存
  function save(index, value) {
    if(value === '') {
      removeItem(index);
    } else {
      todoList[index].isEditing = false;
      todoList[index].value = value;
      render();
    }
  }

  // list事件绑定
  $('#todo-list')._$addEvent('click dblclick', function(_event) {
    var _$dom = $(_event.target);
    var _$li = _$dom._$parent('li');
    var _$index = _$li._$dataset('index');
    console.log(_event.type);
    switch(_$dom._$attr('class')) {
      case 'destroy':
        removeItem(_$index);
        break;
      case 'content':
        if(_event.type === 'dblclick') {
          edit(_$index);
          // todo 在input上绑定保存事件
          _$input = _$dom._$parent('div')._$siblings('input');
          setTimeout(function() {
            console.log(_$input[0]);
            _$input[0].id = 'xxxxxx';
          }, 2000);
        }
        break;
      // case 'edit':
      //    save(_$index, _$dom._$val());
      //   break;
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
