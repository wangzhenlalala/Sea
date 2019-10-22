text = document.querySelector('.textarea');



function resizeTextarea() {
	setTimeout(function() {
		if(text.value == "") {
			text.style.cssText = "";
			return ;
		}
		text.style.cssText = `height: auto;`;
		text.offsetHeight;
		console.log(text.scrollHieght);
		text.style.cssText = `height: ${text.scrollHeight+4}px`;
	}, 0);
}

text.addEventListener('keydown', resizeTextarea);

resizeTextarea();
