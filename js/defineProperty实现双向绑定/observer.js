	/**
	 * Dep 依赖收集容器 观察者
	 * @param { Array } subs 观察数组
	 */
class Dep {
	constructor(){
		this.subs = []
	}
	//增加订阅
	addSub(sub){
		this.subs.push(sub);
	}
	//判断是否增加订阅
	depend () {
		// console.log( 'Dep depend', Dep.target );
		if (Dep.target) {
			this.addSub(Dep.target)
		}
	}
	//通知订阅者更新
	notify(){
		this.subs.forEach((sub) =>{
			// console.log('Dep notify', sub.update() );
			sub.update();
		});
	}
}
Dep.target = null;

/**
 * 把一个对象的每一项拆开
 * @param { Object } obj 对象
 */
function observable (obj) {
	if (!obj || typeof obj !== 'object') {
		return;
	}

	let keys = Object.keys(obj);
	keys.forEach((key) =>{
		defineReactive(obj, key, obj[key]);
	})

	return obj;
}
/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive (obj, key, val) {
	let dep = new Dep();
	Object.defineProperty(obj, key, {
		get(){
			dep.depend(); // 读取了变量，就可能是将变量赋值或绑定给了某个Dom
			// console.log(`${key}属性被读取了`);
			return val;
		},
		set(newVal){
			val = newVal;
			// console.log(`${key}属性被修改了`);
			dep.notify(); //数据变化通知所有订阅者
		}
	})
}