const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const summaryContainer = document.getElementById('summary-container');

// Add a task
function addTask() {
	if (inputBox.value === '') {
		alert('You must have something to do!');
	} else {
		console.log('Adding task');
		let li = document.createElement('li');
		li.innerHTML = inputBox.value;
		li.className = 'drag-item';
		listContainer.appendChild(li);
		let span = document.createElement('span');
		span.className = 'material-symbols-outlined';
		span.innerHTML = 'Delete';
		li.appendChild(span);

		// Call getTaskCount after adding the task
		getTaskCount();
	}
	inputBox.value = '';
	saveData();
}

// Check or remove tasks
listContainer.addEventListener('click', function (e) {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('checked');
	} else if (e.target.tagName === 'SPAN') {
		e.target.parentElement.remove();
	}
	saveData();
	getTaskCount(); // Call getTaskCount only once after the action (either LI or SPAN)
	getCheckedTasks();
});

// Get number of children elements in list

function getTaskCount() {
	const tasks = listContainer.querySelectorAll(`li:not(.checked)`);
	console.log(tasks);
	const taskCount = tasks.length;
	const div = document.createElement('div');
	div.className = 'tasks-remaining';
	div.innerHTML = `Tasks remaining: ${taskCount}`;

	// Check if a 'tasks-remaining' div already exists
	const existingDiv = summaryContainer.querySelector('.tasks-remaining');

	if (existingDiv) {
		// If it exists, update its content
		console.log(taskCount);
		existingDiv.innerHTML = `Tasks remaining: ${taskCount}`;
	} else {
		// If it doesn't exist, append the new div
		summaryContainer.appendChild(div);
	}
}

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
	const tasks = listContainer.querySelectorAll('li');
	const checkedTasks = listContainer.querySelectorAll('li.checked');

	const data = {
		taskCount: tasks.length,
		checkedTaskCount: checkedTasks.length,
		tasksHTML: listContainer.innerHTML,
	};

	localStorage.setItem('data', JSON.stringify(data));
}

function showTask() {
	const savedData = JSON.parse(localStorage.getItem('data'));

	if (savedData) {
		listContainer.innerHTML = savedData.tasksHTML;
		getTaskCount(); // Update task count
		getCheckedTasks(); // Update checked task count
	}
}

getTaskCount();
getCheckedTasks();
showTask();
