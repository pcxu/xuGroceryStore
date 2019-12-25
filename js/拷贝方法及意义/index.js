(function (win) {
    // 立即执行函数

    // 1.拷贝方法的意义：因为对象是引用类型，所以赋值时的操作仅是赋予相同的地址，当对其中一个对象进行操作时，就会影响其他的对象。解决这个问题就需要拷贝了。

    // 2.浅拷贝
    var obj1={
        value: 'a'
    }
    var obj2 = Object.assign({},obj1);
    obj2.value='b';
    console.log(obj1); //{ value: 'a' }

    // 但是如果拷贝的源对象当中包含对象时，OBject.assign()方法只会拷贝对象的引用地址

    var obj1={
        value: 'a',
        obj3:{
            value2: 'c'
        }
    }
    var obj2 = Object.assign({},obj1);
    obj2.obj3.value2='b';
    console.log(obj1); //{ value: 'a', obj3:{ value2: 'b' } }

    // 3.深拷贝
    // 3.1.JSON.parse(JSON.stringify(xxx))
    var obj1={
        value: 'a',
        obj3:{
            value2: 'c'
        },
        arr:[1,2,3]
    }
    var obj2 = JSON.parse(JSON.stringify(obj1));
    obj2.obj3.value2='b';
    obj2.arr[0]= "a";
    console.log(obj2);//{ value: 'a', obj3:{ value2: 'b' }, arr:['a',2,3] }
    console.log(obj1);//{ value: 'a', obj3:{ value2: 'c' }, arr:[1,2,3] } 没有发生改变

    // 3.2.递归方法实现 避免层级过多内存溢出
    function deepCopy(newObj, oldObj) {
        for (var key in oldObj) {
          var item = oldObj[key]
          if (item instanceof Array) {
            newObj[key] = [];
            deepCopy(newObj[key], item);
          }
          else if (item instanceof Object) {
            newObj[key] = {};
            deepCopy(newObj[key], item);
          }
          else {
            newObj[key] = item;
          }
        }
        return newObj;
      }

})(window);