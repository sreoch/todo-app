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
		// Add a CSS class to change the background color
		targetItem.classList.add('hovered');
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

	// Remove the CSS class to reset the background color
	targetItem.classList.remove('hovered');
	draggedItem.style.opacity = '';
	draggedItem = null;
}
