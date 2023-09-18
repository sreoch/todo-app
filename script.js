const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
	if (inputBox.value === '') {
		alert('You must have something to do!');
	} else {
		let li = document.createElement('li');
		li.innerHTML = inputBox.value;
		listContainer.appendChild(li);
		let span = document.createElement('span');
		span.className = 'material-symbols-outlined';
		span.innerHTML = 'Delete';
		li.appendChild(span);
	}
	inputBox.value = '';
}
