NEJ.define([
	'util/chain/chainable',
	'base/element'
], function($, _e) {
	var todoList = [];
	var listType = 'all';

	function render() {
		//  根据type和list来渲染列表
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

		// var newLi = _e._$create('li');
		// var innerHTML = '<div class="view"><input class="toggle" type="checkbox"><label>' + value + '</label><button class="destroy"></button></div><input class="edit" value="' + value + '">';
		// newLi.innerHTML = innerHTML;
		// ulNode._$insert(newLi);
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
				// 删除对应_$li序号
				var index = 1;
				removeItem(index);
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
