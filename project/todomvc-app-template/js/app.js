NEJ.define([
  'util/chain/chainable',
  'base/element',
  'base/util'
], function($, _e, _u) {
  var todoList = [];
  var listType = 'all';
  var _$todoInput = $('#todo-input');
  var _$list = $('#todo-list');
  var _$toggleAllInput = $('#toggle-all');
  var _$toggleAll = $('#toggle-all-label');
  var _$clearBtn = $('#clearBtn');
  var ENTER = 13;
  var ESC = 27;

  function render() {
    renderList();
    renderFooter();
  }

  function getItemClass(item) {
    return (item.isEditing ? 'editing' : '') + (item.isCompleted ? 'completed' : '');
  }

  function getCheckboxStatus(item) {
    return item.isCompleted ? 'checked' : '';
  }

  function renderList() {
    //  根据type和list来渲染列表
    var ulInnerHTML = '';
    _u._$forEach(todoList, function(_item, _index) {
      ulInnerHTML += '<li class="' + getItemClass(_item) + '" data-index=' + _index + '>' +
        '<div class="view">' +
        '<input class="toggle" type="checkbox"' + getCheckboxStatus(_item) + '>' +
        '<label class="content">' + _item.value + '</label>' +
        '<button class="destroy"></button>' +
        '</div>' +
        '<input class="edit" value="' + _item.value + '">' +
        '</li>';
    });
    _$list._$html(ulInnerHTML);
  }

  function renderFooter() {
    var leftItems = todoList.filter(function(item) {
      return !item.isCompleted;
    });
    $('#num')._$text(leftItems.length);
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
    var item = todoList[index];
    if(item.isCompleted) return;
    item.isEditing = true;
    render();
  }

  // 切换完成状态
  function toggleCompleted(index) {
    todoList[index].isCompleted = !todoList[index].isCompleted;
    isAllCompleted() ? _$toggleAllInput[0].checked = true : _$toggleAllInput[0].checked = false;
    render();
  }

  // 是否所有item都已完成
  function isAllCompleted() {
    return todoList.every(function(item) {
      return item.isCompleted;
    })
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

  function triggerSave(index) {
    var _$input = _$list._$children('li[data-index=' + index + ']')._$children('input');
    var oldValue = _$input._$val();
    _$input[0].focus();
    _$input._$addEvent('blur keyup', function(_event) {
      switch(_event.type) {
        case 'blur':
          $(this)._$clearEvent();
          save(index, $(this)._$val());
          break;
        case 'keyup':
          if(_event.keyCode === ENTER) {
            $(this)._$clearEvent();
            save(index, $(this)._$val());
          }
          if(_event.keyCode === ESC) {
            $(this)._$clearEvent();
            save(index, oldValue);
          }
          break;
      }
    });

  }

  _$todoInput._$addEvent('keyup', function(_event) {
    var val = $(this)._$val().trim();
    if(_event.keyCode === ENTER && val) {
      addItem(val);
      $(this)._$val('');
    }
  })
  _$toggleAll._$addEvent('click', function() {
    var flag = isAllCompleted();
    if(flag) {
      todoList.forEach(function(item) {
        item.isCompleted = false;
      })
    } else {
      todoList.forEach(function(item) {
        item.isCompleted = true;
      })
    }
    render();
  })
  // list事件代理
  _$list._$addEvent('click dblclick', function(_event) {
    var _$dom = $(_event.target);
    var _$li = _$dom._$parent('li');
    var _$index = _$li._$dataset('index');
    switch(_$dom._$attr('class')) {
      case 'destroy':
        removeItem(_$index);
        break;
      case 'content':
        if(_event.type === 'dblclick') {
          edit(_$index);
          triggerSave(_$index);
        }
        break;
      case 'toggle':
        toggleCompleted(_$index);
    }
  })
  _$clearBtn._$addEvent('click', function() {
    todoList = todoList.filter(function(item) {
      return !item.isCompleted;
    });
    render();
  })
});

