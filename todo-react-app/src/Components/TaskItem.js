import React from 'react';

export const TaskItem = ({ text, onCheck, checked, onDelete }) => {
	const handleDeleteClick = (e) => {
		e.stopPropagation();
		onDelete();
	};

	return (
		<li onClick={onCheck} className={`drag-item ${checked ? 'checked' : ''}`}>
			{text}
			<span className='material-symbols-outlined' onClick={handleDeleteClick}>
				Delete
			</span>
		</li>
	);
};
