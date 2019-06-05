/*
	以数据为中心的 数据流和控制流 (data flow) (control flow)是极好的
*/
function first(){
	second()
}

function second(){
	third();
}

function third(){
	//do your things
}
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*
	这种对程序流程的控制，让人有一个很好的整体把握，我知道从头到尾，一个流程下来，经历了哪些的操作流程。而不需要查看first的实现，才知道他调用了second,
	去查看second的实现，才知道他调用了third.
	这样one, two, three就可以 对只自己的参数负责，
*/
/*
	但是如果first需要根据情况来决定是否要调用 second，最好如何处理呢???
	对于不确定的情况，如何进行控制流 undeterministic
	Functors like: Maybe Either ???
*/
function one(){
	
}

function two(){
	
}

function three(){
	//do your things
}

Pipe.execute(
	one,
	two,
	three	
)(state)
