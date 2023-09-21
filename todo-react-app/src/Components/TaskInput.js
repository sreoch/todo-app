import { useState } from 'react';

export const TaskInput = ({ addTask, taskText, setTaskText }) => {

	const handleInputChange = (e) => {
		setTaskText(e.target.value);
	};

	const handleAddClick = () => {
		if (taskText.trim() !== '') {
			addTask(taskText);
			setTaskText('');
		} else {
			alert('You must have something to do!');
		}
	};

	return (
		<div className='row'>
			<input
				type='text'
				id='input-box'
				placeholder="What's on your agenda?"
				value={taskText}
				onChange={handleInputChange}
			/>
			<button onClick={handleAddClick}>Add</button>
		</div>
	);
};
