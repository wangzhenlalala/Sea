function printGreet() {
	console.log(greeting);
}

function greet1() {
	let greeting = "hello 1";
	printGreet();
}

function greet2() {
	var greeting = "hello 2";
	printGreet();
}

greet1();
greet2();

function useState(initialState) {
	let state = initialState;
	let setState = function(newState) {
		state = newState;
	}
	return [state, setState];
}


// 当组件被多此更新的时候，如何让useState没有改变的，不会被多次调用，
function Component(props) {
	let [name, setName] = useState("wangzhen");
	let [age, setAge] = useState('27');

	rener(name, age);
}






