NEJ.define([
  'util/chain/chainable',
  'base/element',
  'base/util'
], function($, _e, _u) {
  var todoList = [];
  var _$todoInput = $('#todo-input');
  var _$list = $('#todo-list');
  var _$toggleAllInput = $('#toggle-all');
  var _$toggleAll = $('#toggle-all-label');
  var _$footer = $('#footer');
  var ALL = 0;
  var ACTIVE = 1;
  var COMPLETE = 2;
  var listType = ALL;
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
    //  根据type来渲染列表
    var ulInnerHTML = '';
    var showList = switchList(listType);
    _u._$forEach(showList, function(_item, _index) {
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
    _$footer._$children('strong', true)._$text(leftItems.length);
    _$footer._$style('display', todoList.length ? 'block' : 'none');
  }

  // 切换显示列表
  function switchList(type) {
    var showList = [];
    switch(type) {
      case ALL:
        showList = todoList.slice(0);
        break;
      case ACTIVE:
        showList = todoList.filter(function(item) {
          return !item.isCompleted;
        });
        break;
      case COMPLETE:
        showList = todoList.filter(function(item) {
          return item.isCompleted;
        })
        break;
    }
    return showList
  }

  // 通过index找到todoList对应项的index
  function getIndexByIndex(fakeIndex) {
    var id = switchList(listType)[fakeIndex].id;
    var realIndex = null;
    todoList.forEach(function(item, index) {
      if(item.id === id) {
        realIndex = index;
      }
    })
    return realIndex;
  }

  // 是否所有item都已完成
  function isAllCompleted() {
    return todoList.every(function(item) {
      return item.isCompleted;
    })
  }

  // 增加
  function addItem(value) {
    todoList.push({
      id: _u._$randNumberString(9),
      value: value,
      isEditing: false,
      isCompleted: false
    });
    render();
  }

  // 删除
  function removeItem(index) {
    todoList.splice(getIndexByIndex(index), 1);
    render();
  }

  // 编辑
  function edit(index) {
    var item = todoList[getIndexByIndex(index)];
    if(item.isCompleted) return;
    item.isEditing = true;
    render();
  }

  // 保存
  function save(index, value) {
    var item = todoList[getIndexByIndex(index)]
    if(value === '') {
      removeItem(index);
    } else {
      item.isEditing = false;
      item.value = value;
      render();
    }
  }

  // 触发保存事件之前的准备工作
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

  // 切换单项的完成状态
  function toggleCompleted(index) {
    var item = todoList[getIndexByIndex(index)];
    item.isCompleted = !item.isCompleted;
    isAllCompleted() ? _$toggleAllInput[0].checked = true : _$toggleAllInput[0].checked = false;
    render();
  }

  // 输入框事件
  _$todoInput._$addEvent('keyup', function(_event) {
    var val = $(this)._$val().trim();
    if(_event.keyCode === ENTER && val) {
      addItem(val);
      $(this)._$val('');
    }
  })
  // 全/反选按钮事件
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
  // 清空多项按钮事件
  _$footer._$children('button')._$addEvent('click', function() {
    todoList = todoList.filter(function(item) {
      return !item.isCompleted;
    });
    render();
  })
  // list事件代理
  _$list._$addEvent('click dblclick', function(_event) {
    var _$target = $(_event.target);
    var _$index = _$target._$parent('li')._$dataset('index');
    switch(_$target._$attr('class')) {
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
  // footer事件代理
  _$footer._$children('ul')._$on('click', 'a', function(_event) {
    var _$a = $(this);
    _$footer._$children('a', true)._$forEach(function(_item) {
      $(_item)._$delClassName('selected');
      _$a._$addClassName('selected');
    })
    listType = _$a._$dataset('index') - 0;
    render();
  })
});

