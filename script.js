const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Add a task
function addTask() {
	if (inputBox.value === '') {
		alert('You must have something to do!');
	} else {
		let li = document.createElement('li');
		li.innerHTML = inputBox.value;
		li.className = 'drag-item';
		listContainer.appendChild(li);
		let span = document.createElement('span');
		span.className = 'material-symbols-outlined';
		span.innerHTML = 'Delete';
		li.appendChild(span);
	}
	inputBox.value = '';
	saveData();
}

// Check or remove tasks
listContainer.addEventListener('click', function (e) {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('checked');
		saveData();
	} else if (e.target.tagName === 'SPAN') {
		e.target.parentElement.remove();
		saveData();
	}
});

// Storing data so it's stored on refresh/restart
function saveData() {
	localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
	listContainer.innerHTML = localStorage.getItem('data');
}

showTask();
