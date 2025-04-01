var dropdownButton = document.getElementById('dropdown-btn');
var dropdown = document.querySelector('.dropdown-wrapper');
var dropdownBody = document.querySelector('.dropdown-wrapper-body');
var dropdownCloseButton = document.querySelector('.dropdown-wrapper .dropdown-btn');

dropdownButton.addEventListener('click', function (e) {
    e.stopPropagation(); 
    dropdown.classList.add('open');
    dropdownBody.classList.add('open');
});

dropdownCloseButton.addEventListener('click', function (e) {
    e.stopPropagation(); 
    dropdown.classList.remove('open');
    dropdownBody.classList.remove('open');
});

dropdownBody.addEventListener('click', function () {
    dropdown.classList.remove('open');
    dropdownBody.classList.remove('open');
});

dropdown.onclick = function(e) {
	e.stopPropagation();
}