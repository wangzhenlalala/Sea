function vectorMultipyCon(va, constant){
	return va.map(function(i){
		return i*constant
	});
}
function vectorMinus(va, vb){
	// vector = [x, y]
	return va.map(function(item, index){
		return va[index] + vb[index]
	});
}

function gcd(a,b){
	coA = [1, 0];
	coB = [0, 1];
	coR = [0, 0];
	do{
		q = Math.floor(a / b);
		r = a % b;
		if(r==0){
			return {
				gcd: b,
				combination:coB
			}
		}else{
			a = b;
			b = r;
			coR = vectorMinus(coA, vectorMultipyCon(coB, -q));
			coA = coB;
			coB = coR;
		}
	}while(true);
}

x = gcd(259, 70);
console.log(x)