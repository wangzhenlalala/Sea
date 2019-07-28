class Animal {
	bark(){
		console.log('animal bark');
	}
}

class Dog extends Animal {
	constuctor(props){
		super(props);
	}
	bark(){
		console.log('dog bark');
	}
}

let dog = new Dog();
dog.bark();