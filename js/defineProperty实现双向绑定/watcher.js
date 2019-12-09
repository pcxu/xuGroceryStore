	/**
	 * Watcher 监听
	 * @vm { Object } this
	 * @key { String } 关键词
	 * @callback { Function } 函数
	 */
class Watcher {
	constructor(vm, key, callback){
		// console.log('Watcher constructor', this, vm);
		this.vm = vm;
		this.key = key;
		this.callback = callback;

		this.value = this.gett();  //执行gett函数， 将自己添加到订阅器的操作
	}

	gett(){
		// console.log('Watcher gett', this);
		Dep.target = this;  // 缓存
		let value = this.vm.data[this.key];  // 调用data，触发get方法，出发dep.depend方法。
		Dep.target = null;  // 释放
		return value;
	}

	update(){
		// console.log('Watcher update', this);
		let value = this.vm.data[this.key];
		let oldVal = this.value;
		if (value !== oldVal) {
			this.value = value;
		}
		this.callback.call(this.vm, value, oldVal, (value !== oldVal) );
	}
}