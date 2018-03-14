  NEJ.define([
    'base/klass',
    'ui/item/item'
  ], function(_k, _i0, _p, _o, _f, _r) {
    // array2object
    // var arr = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}];
    // var res = _u._$array2object(arr, function(_item) {
    //   if(_item.name === 'a') {
    //     return;
    //   }
    //   return _item.id;
    // })
    // console.log(res);
    // fetch
    // var obj0 = {a: 0, b: 1, c: 2}
    // var obj1 = {a: 'a', b: 'b', c: 'c', d: 'i am d'}
    // var res = _u._$fetch(obj0, obj1)
    // foreach
    // var list = [1,2,3,4,5];
    // _u._$foreach(list, function(_item, _index, _list){
    //   if (_item > 3){
    //     return true;
    //   }
    //   console.log('now => ', _item);
    // })
    // loop
    // var obj = {
    //   a0: {
    //     value: 'a',
    //     b: {
    //       value: 'b',
    //       c: {
    //         value: 'c',
    //       }
    //     }
    //   },
    //   a1: {
    //     value: 'a',
    //     b: {
    //       value: 'b',
    //       c: {
    //         value: 'c',
    //       }
    //     }
    //   }
    // }
    // var res = _u._$loop(obj, function(_item){
    //   return _item.value = 'c'
    // })
    // console.log(res);
    // merge
    // var obj0 = {a: 'a'}
    // var obj1 = {b: 'b'}
    // var obj2 = {c: 'c'}
    // var res = _u._$merge(obj0, obj1, obj2, function(_value, _key) {
    //   return _key === 'b'
    // });
    // jst
    // var _html_seed = _p._$add('<div>${name}</div>');
    // _p._$render('box', _html_seed, {name: '夏凡～'})
    // Item
    var _ = NEJ.P;
    var _p = _('nej.ut');
    var _e = _('nej.e');
    // 第一步：新建一个类，继承自此基类
    console.log(_e);
    var _html_key = _e._$addNodeTemplate('<div>${name}</div>');

    _p._$$MyItem = _k._$klass();
    _proMyItem = _p._$$MyItem._$extend(_i0._$$Item);
    _proMyItem.__reset = function(_options) {
      this.__data = _options.data;
      this.__super(_options);
    }
    _proMyItem.__doRefresh = function() {
      // 刷新一项，设置数据{name: 'apple'}
      this.__body.innerText = this.__data.name;
    }
    _proMyItem.__initXGui = function() {
      this, __seed_html = _html_key;
    }
    return _p;
  });
