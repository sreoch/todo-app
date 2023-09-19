const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const summaryContainer = document.getElementById('summary-container');

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
	getTaskCount();
}

// Get number of children elements in list

function getTaskCount() {
	const tasks = listContainer.querySelectorAll(`:not(.checked)`);
	const taskCount = tasks.length;
	console.log(tasks);
	const div = document.createElement('div');
	div.className = 'tasks-remaining';
	div.innerHTML = `Tasks remaining: ${taskCount}`;

	// Check if a 'tasks-remaining' div already exists
	const existingDiv = summaryContainer.querySelector('.tasks-remaining');

	if (existingDiv) {
		// If it exists, update its content
		existingDiv.innerHTML = `Tasks remaining: ${taskCount}`;
	} else {
		// If it doesn't exist, append the new div
		summaryContainer.appendChild(div);
	}
}

// Check or remove tasks
listContainer.addEventListener('click', function (e) {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('checked');
		saveData();
		getTaskCount();
		getCheckedTasks();
	} else if (e.target.tagName === 'SPAN') {
		e.target.parentElement.remove();
		saveData();
		getTaskCount();
		getCheckedTasks();
	}
});

// Get amount of checked tasks
function getCheckedTasks() {
	const checkedTasks = listContainer.getElementsByClassName('checked');
	const numberOfCheckedTasks = checkedTasks.length;
	const div = document.createElement('div');
	div.className = 'completed-tasks';
	div.innerHTML = `Completed tasks: ${numberOfCheckedTasks}`;

	// Check if a 'tasks-remaining' div already exists
	const existingDiv = summaryContainer.querySelector('.completed-tasks');

	if (existingDiv) {
		// If it exists, update its content
		existingDiv.innerHTML = `Completed tasks: ${numberOfCheckedTasks}`;
	} else {
		// If it doesn't exist, append the new div
		summaryContainer.appendChild(div);
	}
}

// Storing data so it's stored on refresh/restart
function saveData() {
	localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
	listContainer.innerHTML = localStorage.getItem('data');
}
getTaskCount();
getCheckedTasks();
showTask();
