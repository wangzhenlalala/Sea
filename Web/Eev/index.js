let eev = new Eev();
eev.on('hello', function(e, f){
	console.log(e, f);
});

eev.emit('hello', 'first', 'second');
