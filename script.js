const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

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

listContainer.addEventListener('click', function (e) {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('checked');
		saveData();
	} else if (e.target.tagName === 'SPAN') {
		// e.target.parentElement.remove();
		saveData();
	}
});

//TODO - REWORK THIS AREA AS ITS A BIT BUGGY
let draggedItem = null;

//add event listeners for drag and drop events
listContainer.addEventListener('dragstart', handleDragStart);
listContainer.addEventListener('dragover', handleDragOver);
listContainer.addEventListener('drop', handleDrop);

// Drag start event handler
function handleDragStart(event) {
	draggedItem = event.target;
	event.dataTransfer.effectAllowed = 'move';
	event.dataTransfer.setData('text/html', draggedItem.innerHTML);
	event.target.style.opacity = '0.5';
}

// Drag over event handler
function handleDragOver(event) {
	event.preventDefault();
	event.dataTransfer.dropEffect = 'move';
	const targetItem = event.target;
	if (
		targetItem !== draggedItem &&
		targetItem.classList.contains('drag-item')
	) {
		// const boundingRect = targetItem.getBoundingClientRect();
		// const offset = boundingRect.y + boundingRect.height / 2;
		// if (event.clientY - offset > 0) {
		// 	targetItem.style.borderBottom = 'solid 2px #000';
		// 	targetItem.style.borderTop = '';
		// } else {
		// 	targetItem.style.borderTop = 'solid 2px #000';
		// 	targetItem.style.borderBottom = '';
		// }
	}
}

// Drop event handler
function handleDrop(event) {
	event.preventDefault();
	const targetItem = event.target;
	if (
		targetItem !== draggedItem &&
		targetItem.classList.contains('drag-item')
	) {
		if (
			event.clientY >
			targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
		) {
			targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
		} else {
			targetItem.parentNode.insertBefore(draggedItem, targetItem);
		}
	}
	targetItem.style.borderTop = '';
	targetItem.style.borderBottom = '';
	draggedItem.style.opacity = '';
	draggedItem = null;
}

function saveData() {
	localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
	listContainer.innerHTML = localStorage.getItem('data');
}

showTask();
