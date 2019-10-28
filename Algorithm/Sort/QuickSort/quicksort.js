let iList = [];
let fList = [];

for(let i = 0; i < 20; i++) {
	let random = chance.integer({ min: -20, max: 20 });
	let f = chance.floating({min: 1, max: 500});

	iList.push(random);
	fList.push(f);
}
console.log(iList);
console.log(fList);