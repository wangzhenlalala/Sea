
var profileForm = document.forms.namedItem('profile');
let fileInput = document.querySelector("[type=file]");
profileForm.addEventListener('submit', function(e){
    console.log(e.target);
})
fileInput.addEventListener('change', function(e){
    console.log(e.target.value);
})
console.log(profileForm);
console.log(fileInput);