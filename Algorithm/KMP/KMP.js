const pattern = "abcabcd" // [0,0,0,1,2,3,0]
function getNextArray(pattern) {
	let i = 1;
	let j = 0; // 当前不匹配的p.i 的next值
	let next = new Array(pattern.length);
	next[0] = 0;
	while( i < pattern.length ) {
		while( j > 0 && pattern[j] != pattern[i] ) j = next[j-1];
		if( pattern[j] == pattern[i] ) {
			next[i] = j + 1;
			i++;
			j++;
		} else {
			next[i] = j; //此时j==0;
			i++;
		}
	}
	return next;
}

console.log(getNextArray(pattern));
/**
	1. next[0] = 0; 因为pattern[0...0], 只有一个元素，不存在longest proper prefix, 因为串的proper prefix是不包含自身的 
	2. 当我们知道 p[i], 的next[i]的时候，
		a. 如果p[ next[i] ] == p[i+1], 那么 next[i+1] = next[i] + 1
		b. 如果p[ next[i] ] != p[i+1] 那么我么可以在往回找
			比较p[ next[ next[i] ] ] 和 p[i+1]
		知道next[g] == 0, 说明我们已经不能在往回走了， next[i+1] = 0
**/